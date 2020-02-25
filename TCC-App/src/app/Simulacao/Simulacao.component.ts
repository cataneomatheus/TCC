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
      }
    );
  }

}
