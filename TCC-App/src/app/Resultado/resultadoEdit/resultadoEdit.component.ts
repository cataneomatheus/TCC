import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap';
import { Resultado } from 'src/app/models/Resultado/Resultado';
import { ResultadoService } from 'src/app/services/Resultado/resultado.service';

@Component({
  selector: 'app-resultadoEdit',
  templateUrl: './resultadoEdit.component.html',
  styleUrls: ['./resultadoEdit.component.css']
})
export class ResultadoEditComponent implements OnInit {

  titulo = 'Detalhes da simulação';
  resultado: Resultado = new Resultado();
  registerForm: FormGroup;

  get perguntaRespostasResultados(): FormArray {
    return <FormArray>this.registerForm.get('perguntaRespostasResultados');
  }

  get exameResultados(): FormArray {
    return <FormArray>this.registerForm.get('exameResultados');
  }

  constructor(
    private resultadoService: ResultadoService,
    private fb: FormBuilder,
    private localeService: BsLocaleService,    
    private router: ActivatedRoute
  ) {
    this.localeService.use('pt-br')
   }

  ngOnInit() {
    this.validation(),
    this.carregarResultado()
  }

  validation() {
    this.registerForm = this.fb.group({
      nomeAluno: [''],
      nomeProfessor: [''],
      hashLib: [''],
      percAcertPergunta: [''],
      percAcertExame: [''],
      finalizado: [''],
      nomePaciente: [''],
      dataNascimento: [''],
      sexo: [''],
      tipoAtendimento: [''],
      queixaPrincipal: [''],
      inicioSintomas: [''],
      qtdMaxPergunta: [''],
      qtdMaxExame: [''],
      perguntaRespostasResultados: this.fb.array([]),
      exameResultados: this.fb.array([])
    });
  }

  carregarResultado() {
    var me = this;

    const idResultado = +this.router.snapshot.paramMap.get('id');
    me.resultadoService.getResultadoPorId(idResultado)
      .subscribe(
        (resultado: Resultado) => {
          me.resultado = Object.assign({}, resultado);
          
          me.registerForm.patchValue(me.resultado);

          me.resultado.perguntaRespostasResultados.forEach(perguntaResposta => {
            me.perguntaRespostasResultados.push(me.criaPerguntaRespostaResultado(perguntaResposta));
          });

          me.resultado.exameResultados.forEach(exame => {
            me.exameResultados.push(me.criaExameResultado(exame));
          });

          me.registerForm.patchValue(me.resultado);
        }
      );
  }

  criaExameResultado(exame: any): FormGroup {
    return this.fb.group({
      id: [exame.id],
      nome: [exame.nome, Validators.required],
      imgExame: [exame.imgExame, Validators.required],
      certa: [exame.certa, Validators.required],
      selecionada: [exame.selecionada]
    });
  }

  criaPerguntaRespostaResultado(perguntaRespostasResultados: any): FormGroup {
    return this.fb.group({
      id: [perguntaRespostasResultados.id],
      pergunta: [perguntaRespostasResultados.pergunta, Validators.required],
      resposta: [perguntaRespostasResultados.resposta, Validators.required],
      certa: [perguntaRespostasResultados.certa, Validators.required],
      selecionada: [perguntaRespostasResultados.selecionada]
    });
  }

}
