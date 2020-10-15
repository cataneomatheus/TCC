import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConsultaService } from '../services/Consulta/consulta.service';
import { Consulta } from '../models/Consulta/Consulta';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Aluno',
  templateUrl: './Aluno.component.html',
  styleUrls: ['./Aluno.component.css']
})
export class AlunoComponent implements OnInit {

  titulo = 'Portal do aluno';
  registerForm: FormGroup;
  consulta: Consulta = new Consulta();

  constructor(
    private consultaService: ConsultaService,
    public router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.validation()
  }

  validation() {
    this.registerForm = this.fb.group({
      coigoConsulta: ['', [Validators.required, Validators.maxLength(10)]]
    });
  }

  iniciarSimulacao() {
    var idConsulta = this.registerForm.controls.coigoConsulta.value;
    
    if(!idConsulta)
      return this.toastr.error('Código da simulação está vazio, preencha o campo.');
    
    this.getConsulta(idConsulta);    
  }

  getConsulta(idConsulta) {
    this.consultaService.getConsultaAlunoById(idConsulta).subscribe(
      (consulta: Consulta) => {
        this.consulta = Object.assign({}, consulta);    
        this.toastr.success('Simulação carregada com sucesso.');
        this.router.navigate(['/simulacao', idConsulta, 'edit']);
      }, error => {
        this.toastr.error(`Erro ao tentar carregar a simulação: ${error.error.Message}`);
      }

    )
  }

}
