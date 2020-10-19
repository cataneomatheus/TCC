import { Component, OnInit } from '@angular/core';
import { Consulta } from '../models/Consulta/Consulta';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ConsultaService } from '../services/Consulta/consulta.service';
import { BsLocaleService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Resultado } from '../models/Resultado/Resultado';
import { ResultadoService } from '../services/Resultado/resultado.service';
import { PerguntaRespostaResultado } from '../models/Resultado/PerguntaRespostaResultado';
import { ExameResultado } from '../models/Resultado/ExameResultado';

@Component({
  selector: 'app-Simulacao',
  templateUrl: './Simulacao.component.html',
  styleUrls: ['./Simulacao.component.css']
})
export class SimulacaoComponent implements OnInit {

  titulo = 'Simulação';
  resultado: Resultado = new Resultado();
  registerForm: FormGroup;
  textoNaTela: string;
  dialogos: Array<{ texto: string }> = [];
  indiceDialogoAtual: number;
  imgExameEscolhido: string;
  qtdeMaxPerguntas: number;
  qtdeMaxExames: number;
  bodyConfirmarFinalizacao: string;

  get perguntaRespostas(): FormArray {
    return <FormArray>this.registerForm.get('perguntaRespostas');
  }

  get exames(): FormArray {
    return <FormArray>this.registerForm.get('exames');
  }

  constructor(
    private resultadoService: ResultadoService,
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private toastr: ToastrService,
    private router: ActivatedRoute,
    private rota: Router
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
    var me = this,
      dto = {
        AlunoId: parseInt(sessionStorage.id),
        hashSimulacao: this.router.snapshot.params.id
      };

    me.resultadoService.iniciaResultado(dto)
      .subscribe(
        (resultado: Resultado) => {
          me.resultado = Object.assign({}, resultado);
          me.registerForm.patchValue(me.resultado);
          me.indiceDialogoAtual = 0;


          me.resultado.perguntaRespostasResultados.forEach(perguntaResposta => {
            me.perguntaRespostas.push(me.criaPerguntaResposta(perguntaResposta));
          });

          me.resultado.exameResultados.forEach(exame => {
            me.exames.push(me.criaExame(exame));
          });

          me.textoNaTela = "Olá, meu nome é " + me.resultado.nomePaciente;
          me.dialogos.push(
            { texto: "Olá, meu nome é " + me.resultado.nomePaciente },
            { texto: "Eu vim aqui hoje pois estou com " + me.resultado.queixaPrincipal },
            { texto: "E começou " + me.resultado.inicioSintomas }
          )

          me.qtdeMaxPerguntas = resultado.qtdMaxPergunta - me.resultado.perguntaRespostasResultados.filter(p => p.selecionada).length;
          me.qtdeMaxExames = resultado.qtdMaxExame - me.resultado.exameResultados.filter(p => p.selecionada).length;
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
      qtdMaxPergunta = me.resultado.qtdMaxPergunta,
      qtdPertuntasFeitas = me.resultado.perguntaRespostasResultados.filter(p => p.selecionada),
      dto = {
        AlunoId: parseInt(sessionStorage.id),
        hashSimulacao: this.router.snapshot.params.id,
        PerguntaId: idPergunta
      };

    if (qtdMaxPergunta > qtdPertuntasFeitas.length) {
      var pergunteSelecionada = me.resultado.perguntaRespostasResultados.find(p => p.id == idPergunta);
      if (pergunteSelecionada.selecionada)
        return me.toastr.error("Pergunta já foi selecionada anteriormente");

      me.qtdeMaxPerguntas = me.qtdeMaxPerguntas - 1;

      me.resultadoService.setaPerguntaFeita(dto).subscribe(
        (pergunta: PerguntaRespostaResultado) => {
          me.registerForm.patchValue(me.resultado.perguntaRespostasResultados);
          me.textoNaTela = pergunta.resposta;
          me.resultado.perguntaRespostasResultados.find(p => p.id == pergunta.id).selecionada = true;
        }
      );
    }
  }

  mostrarExame(template: any, idExame: number) {
    var me = this,
      qtdMaxExame = me.resultado.qtdMaxExame,
      qtdExamesVistos = me.resultado.exameResultados.filter(p => p.selecionada),
      dto = {
        AlunoId: parseInt(sessionStorage.id),
        hashSimulacao: this.router.snapshot.params.id,
        ExameId: idExame
      };

    if (qtdMaxExame > qtdExamesVistos.length) {
      var exameSelecionado = me.resultado.exameResultados.find(p => p.id == idExame);

      if (exameSelecionado.selecionada)
        return me.toastr.error("Exame já foi solicitado anteriormente");

      me.qtdeMaxExames = me.qtdeMaxExames - 1;

      me.resultadoService.setaExameVisto(dto).subscribe(
        (exame: ExameResultado) => {
          me.registerForm.patchValue(me.resultado.exameResultados);
          me.resultado.exameResultados.find(p => p.id == exame.id).selecionada = true;
          me.openModal(template);
          me.imgExameEscolhido = `http://localhost:5000/resources/images/${exame.imgExame}`;
        }
      );
    }
  }

  finalizar(template: any) {
    this.openModal(template);
    this.bodyConfirmarFinalizacao = `Tem certeza que deseja FINALIZAR a simulação, ao confirmar você não conseguirá alterar essa simulação.`;
  }

  confirmFinalizar(template: any) {
    this.resultadoService.finalizar(this.resultado.id).subscribe(
      () => {
        template.hide();
        this.toastr.success('Finalizado simulação com sucesso');
        this.rota.navigate([`/resultado/${ this.resultado.id}/edit`]);
      }, error => {
        this.toastr.error('Erro ao finalizar.', error);
      }
    );
  }
}
