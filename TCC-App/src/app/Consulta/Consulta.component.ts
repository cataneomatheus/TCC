import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-Consulta',
  templateUrl: './Consulta.component.html',
  styleUrls: ['./Consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  titulo = 'Consultas';
  registerForm: FormGroup;
  bodyDeletarConsulta: string;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getEventos()
  }

  getEventos() {
    return console.log()
  }

  openModal(template: any) {
      this.registerForm.reset();
      template.show();
    }

  novaConsulta(template: any) {
    this.openModal(template);
  }

  validation() {
      this.registerForm = this.fb.group({
        nomePaciente: ['', [Validators.required, Validators.maxLength(50)]],
        sexo: ['', [Validators.required, Validators.maxLength(20)]],
        dataNascimento: ['', Validators.required],
        tipoAtendimento: ['', [Validators.required, Validators.maxLength(50)]],
        queixaPrincipal: ['', [Validators.required, Validators.maxLength(50)]],
        inicioSintomas: ['', [Validators.required, Validators.maxLength(50)]]
      });
    }

}
