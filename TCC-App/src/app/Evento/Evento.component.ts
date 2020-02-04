import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '../services/evento.service';
import { Evento } from '../models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { defineLocale, BsLocaleService, ptBrLocale } from 'ngx-bootstrap';
defineLocale('pt-br', ptBrLocale);
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-Evento',
  templateUrl: './Evento.component.html',
  styleUrls: ['./Evento.component.css']
})
export class EventoComponent implements OnInit {

  titulo = 'Eventos';

  eventosFiltrados: Evento[];
  evento: Evento[];
  novoEvento: Evento;
  _filtroLista;
  imagemLargura = 50;
  imagemMargem = 25;
  mostrarImagem = false;
  registerForm: FormGroup;
  modoSalvar = '';
  bodyDeletarEvento = '';

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private toastr: ToastrService
  ) {
    this.localeService.use('pt-br')
   }

  openModal(template: any) {
    this.registerForm.reset();
    template.show();
  }

  editarEvento(evento: Evento, template: any){
    this.modoSalvar = 'put';
    this.openModal(template);
    this.novoEvento = evento;
    this.registerForm.patchValue(evento);
  }

  excluirEvento(evento: Evento, template: any) {
    this.openModal(template);
    this.novoEvento = evento;
    this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.tema}, Código: ${evento.id}`;
  }

  confirmeDelete(template: any) {
    this.eventoService.deleteEvento(this.novoEvento.id).subscribe(
      () => {
          template.hide();
          this.getEventos();
          this.toastr.success('Deletado com sucesso.');
        }, error => {
          this.toastr.error('Erro ao excluir.');
        }
    );
  }

  salvarAlteracao(template: any) {
    if(this.registerForm.valid){
      if(this.modoSalvar != 'put'){
        this.novoEvento = Object.assign({}, this.registerForm.value);
        this.eventoService.postEvento(this.novoEvento).subscribe(
          (response: Evento) => {
            template.hide();
            this.getEventos();
            this.toastr.success('Inserido com sucesso.');
          }, error => {
            this.toastr.error('Erro ao inserir.');
          }
        );
      } else {
        this.novoEvento = Object.assign({id: this.novoEvento.id}, this.registerForm.value);
        this.eventoService.putEvento(this.novoEvento).subscribe(
          (response: Evento) => {
            template.hide();
            this.getEventos();
            this.toastr.success('Editado com sucesso.');
          }, error => {
            this.toastr.error('Erro ao editar.');
          }
        );
      }
    }
  }

  validation() {
    this.registerForm = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.minLength(1)]],
      imagemURL: ['', Validators.required],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  alternarImagem() {
    this.mostrarImagem = !this.mostrarImagem;
  }

  get filtroLista(): string {
    return this._filtroLista;
  }

  set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this._filtroLista ? this.filtrarEvento(this.filtroLista) : this.evento
  }

  filtrarEvento(filtrarPor: string): Evento[] {
    return this.evento.filter(
      eventos => this.evento.toLocaleString().indexOf(filtrarPor) !== -1
    );
  }

  ngOnInit() {
    this.validation(),
    this.getEventos()
  }


  getEventos() {
    this.eventoService.getAllEvento().subscribe(
      (_evento: Evento[]) => {
        this.evento = _evento
      }, error => {
        console.log(error);
      }
    )
  }

  onFileChange(event) {
    console.log(event);
  }

}
