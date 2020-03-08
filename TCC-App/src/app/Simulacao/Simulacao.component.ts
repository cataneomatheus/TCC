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
  imagemLargura = '770';
  imagemMargem = '100%';
  imgExameEscolhido: string;

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
    const idConsulta = +this.router.snapshot.paramMap.get('id');
    this.consultaService.getConsultaById(idConsulta)
    .subscribe(
      (consulta: Consulta) => {

        this.consulta = Object.assign({}, consulta);
        this.registerForm.patchValue(this.consulta);

        this.consulta.perguntaRespostas.forEach(perguntaResposta => {
          this.perguntaRespostas.push(this.criaPerguntaResposta(perguntaResposta));
        });

        this.consulta.exames.forEach(exame => {
          this.exames.push(this.criaExame(exame));
        });

        this.textoNaTela = "Olá, meu nome é " + this.consulta.nomePaciente;
        

        setTimeout(() => {
          this.textoNaTela = "Eu vim aqui hoje pois estou com " +this.consulta.queixaPrincipal;
        }, 10000);

        setTimeout(() => {
          this.textoNaTela = "E começou " + this.consulta.inicioSintomas;
        }, 20000);

        setTimeout(() => {
          this.textoNaTela = " ";
        }, 30000);
      }

    );
  }

  mostraResposta(index: number) {
    debugger;
    this.textoNaTela = this.consulta.perguntaRespostas[index].resposta;
    setTimeout(() => this.textoNaTela = " " , 10000);
  }

  mostrarExame(template: any, index: number) {
    this.openModal(template);
    this.imgExameEscolhido = `http://localhost:5000/resources/images/${this.consulta.exames[index].imgExame}`;    ;
  }

}
