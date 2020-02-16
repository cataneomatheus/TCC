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
  acao = 'post';

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
      this.acao = 'post';
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
    
    editarConsulta(consulta: Consulta, template: any) {
      this.acao = 'put';
      this.openModal(template);
      this.consulta = Object.assign({}, consulta);
      this.registerForm.patchValue(this.consulta);
    }

    excluirConsulta(consulta: Consulta, template: any) {
      this.openModal(template);
      this.consulta = consulta;
      this.bodyDeletarConsulta = `Tem certeza que deseja EXCLUIR a consulta: ${consulta.nomePaciente}, do atendimento: ${consulta.tipoAtendimento}, código: ${consulta.id}`;
    }

    confirmeDelete(template: any) {
      this.consultaService.deleteConsulta(this.consulta.id).subscribe(
        () => {
          template.hide();
          this.getConsultas();
          this.toastr.success('Deletado consulta  com sucesso');
        }, error => {
          this.toastr.error('Erro ao excluir.');
        }
      );
    }

    salvar(template: any) {
      if(this.registerForm.valid) {
        if(this.acao === 'post') {
          this.consulta = Object.assign({}, this.registerForm.value);

          this.consultaService.postConsulta(this.consulta).subscribe(
            (response: Consulta) => {
              template.hide();
              this.getConsultas();
              this.toastr.success('Inserida consulta com sucesso.');
            }, error => {
              this.toastr.error('Erro ao inserir');
            }
          );
        } else {
          this.consulta = Object.assign({id: this.consulta.id}, this.registerForm.value);

          this.consultaService.putConsulta(this.consulta).subscribe(
            (response: Consulta) => {
              template.hide();
              this.getConsultas();
              this.toastr.success('Editado consulta com sucesso.');
            }, error => {
              this.toastr.error('Erro ao editar');
            }
          );
        }
      }
    }
    
  }
