import { Component, OnInit } from '@angular/core';
import { Consulta } from '../models/Consulta/Consulta';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ConsultaService } from '../services/Consulta/consulta.service';
import { BsLocaleService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-Simulacao',
  templateUrl: './Simulacao.component.html',
  styleUrls: ['./Simulacao.component.css']
})
export class SimulacaoComponent implements OnInit {

  titulo = 'Simulação';
  consulta: Consulta = new Consulta();
  registerForm: FormGroup;
  textoNaTela: string;
  dialogos: Array<{ texto: string }> = [];
  indiceDialogoAtual: number;
  imgExameEscolhido: string;
  qtdePerguntasFeitas: number;
  qtdeMaxPerguntas: number;
  qtdeMaxExames: number;
  qtdeExamesVistos: number;
  idsExamesVistos: Array<{ id: number }> = [];
  idsPerguntasFeitas: Array<{ id: number }> = [];

  get perguntaRespostas(): FormArray {
    return <FormArray>this.registerForm.get('perguntaRespostas');
  }

  get exames(): FormArray {
    return <FormArray>this.registerForm.get('exames');
  }

  constructor(
    private consultaService: ConsultaService,
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private toastr: ToastrService,
    private router: ActivatedRoute
  ) {
    this.localeService.use('pt-br')
  }

  ngOnInit() {
    this.validation(),
      this.carregarConsulta()
  }

  openModal(template: any) {
    template.show();
  }

  validation() {
    this.registerForm = this.fb.group({
      nomePaciente: ['', [Validators.required, Validators.maxLength(50)]],
      sexo: ['', [Validators.required, Validators.maxLength(20)]],
      dataNascimento: ['', Validators.required],
      tipoAtendimento: ['', [Validators.required, Validators.maxLength(50)]],
      queixaPrincipal: ['', [Validators.required, Validators.maxLength(50)]],
      inicioSintomas: ['', [Validators.required, Validators.maxLength(50)]],
      qtdMaxPergunta: [''],
      qtdMaxExame: [''],
      perguntaRespostas: this.fb.array([]),
      exames: this.fb.array([])
    });
  }

  criaExame(exame: any): FormGroup {
    return this.fb.group({
      id: [exame.id],
      nome: [exame.nome, Validators.required],
      imgExame: [exame.imgExame, Validators.required]
    });
  }

  criaPerguntaResposta(perguntaResposta: any): FormGroup {
    return this.fb.group({
      id: [perguntaResposta.id],
      pergunta: [perguntaResposta.pergunta, Validators.required],
      resposta: [perguntaResposta.resposta, Validators.required]
    });
  }

  carregarConsulta() {
    this.consultaService.getConsultaAlunoById(this.router.snapshot.params.id)
      .subscribe(
        (consulta: Consulta) => {
          this.consulta = Object.assign({}, consulta);
          this.registerForm.patchValue(this.consulta);
          this.qtdePerguntasFeitas = 0;
          this.qtdeExamesVistos = 0;
          this.indiceDialogoAtual = 0;
          this.qtdeMaxPerguntas = consulta.qtdMaxPergunta;
          this.qtdeMaxExames = consulta.qtdMaxExame;

          this.consulta.perguntaRespostas.forEach(perguntaResposta => {
            this.perguntaRespostas.push(this.criaPerguntaResposta(perguntaResposta));
          });

          this.consulta.exames.forEach(exame => {
            this.exames.push(this.criaExame(exame));
          });

          this.textoNaTela = "Olá, meu nome é " + this.consulta.nomePaciente;
          this.dialogos.push(
            { texto: "Olá, meu nome é " + this.consulta.nomePaciente },
            { texto: "Eu vim aqui hoje pois estou com " + this.consulta.queixaPrincipal },
            { texto: "E começou " + this.consulta.inicioSintomas }
          )
        }

      );
  }

  dialogoAnt() {
    var indice = (this.indiceDialogoAtual = this.indiceDialogoAtual - 1);
    if (indice < 0) {
      indice = 0;
      this.indiceDialogoAtual = 0;
    }

    this.textoNaTela = this.dialogos[indice].texto
  }

  proxDialogo() {
    var indice = (this.indiceDialogoAtual = this.indiceDialogoAtual + 1);
    if (indice > 2) {
      indice = 2;
      this.indiceDialogoAtual = 2;
    }

    this.textoNaTela = this.dialogos[indice].texto
  }

  mostraResposta(idPergunta: number) {
    var me = this,
      qtdMaxPergunta = me.consulta.qtdMaxPergunta,
      qtdPertuntasFeitas = (me.qtdePerguntasFeitas = me.qtdePerguntasFeitas + 1);

    let encontrado = me.idsPerguntasFeitas.find(p => p.id == idPergunta);
    if (encontrado)
      return me.toastr.error("Essa pergunta já foi solicitada anteriormente.");

    if (qtdMaxPergunta >= qtdPertuntasFeitas) {
      var pergunteSelecionada = me.consulta.perguntaRespostas.find(p => p.id == idPergunta);
      me.consulta.perguntaRespostas.filter(p => p.id == idPergunta).map(x => x.isSelected = true);
      me.idsPerguntasFeitas.push({ id: idPergunta });

      me.qtdeMaxPerguntas = me.qtdeMaxPerguntas - 1;
      me.textoNaTela = pergunteSelecionada.resposta;
    }
  }

  mostrarExame(template: any, idExame: number) {
    var qtdMaxExame = this.consulta.qtdMaxExame;
    var qtdExamesVistos = (this.qtdeExamesVistos = this.qtdeExamesVistos + 1);

    let encontrado = this.idsExamesVistos.find(p => p.id == idExame);
    if (encontrado)
      return this.toastr.error("Esse exame já foi solicitado anteriormente.");

    if (qtdMaxExame >= qtdExamesVistos) {
      var exameSelecionado = this.consulta.exames.find(p => p.id == idExame);
      this.consulta.exames.filter(p => p.id == idExame).map(x => x.isSelected = true);
      this.idsExamesVistos.push({ id: idExame });
      this.qtdeMaxExames = this.qtdeMaxExames - 1;
      this.openModal(template);
      this.imgExameEscolhido = `http://localhost:5000/resources/images/${exameSelecionado.imgExame}`;
    }
  }
}
