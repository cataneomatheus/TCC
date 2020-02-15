import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Consulta } from '../models/Consulta/Consulta';
import { BsLocaleService } from 'ngx-bootstrap';
import { ConsultaService } from '../services/Consulta/consulta.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-Consulta',
  templateUrl: './Consulta.component.html',
  styleUrls: ['./Consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  
  titulo = 'Consultas';
  consultas: Consulta[] = [];
  consultasFiltradas: Consulta[] = [];
  consulta: Consulta;
  registerForm: FormGroup;
  bodyDeletarConsulta: string;

  _filtroLista: string;
  
  constructor(
    private consultaService: ConsultaService,
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private toastr: ToastrService
    ) {
      this.localeService.use('pt-br')
    }
    
    ngOnInit() {
      this.validation(),
      this.getConsultas()
    }

    filtrarEvento(filtrarPor: string): Consulta[] {
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.consultas.filter(
        consulta => consulta.tipoAtendimento.toLocaleLowerCase().indexOf(filtrarPor) !== -1
      );
    }

    get filtroLista(): string {
      return this._filtroLista;
    }

    set filtroLista(value: string) {
      this._filtroLista = value;
      this.consultasFiltradas = this.filtroLista ? this.filtrarEvento(this.filtroLista) : this.consultas;
    }
    
    getConsultas() {
      this.consultaService.getAllConsultas().subscribe(
        (_consultas: Consulta[]) => {
          this.consultas = _consultas;
          this.consultasFiltradas = this.consultas;          
        }, error => {
          this.toastr.error(`Erro ao tentar carregar consultas: ${error}`);
        }
        
      )
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
    
    editarConsulta() {
      console.log('Nao implementado');
    }

    excluirConsulta() {
      console.log('Nao implementado');
    }

    salvarAlteracao() {
      console.log('Nao implementado');
    }
    
  }
