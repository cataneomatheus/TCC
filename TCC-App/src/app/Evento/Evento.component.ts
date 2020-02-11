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
  dataEvento: string;
  eventosFiltrados: Evento[] = [];
  eventos: Evento[] = [];
  evento: Evento;
  acao = 'post';
  imagemLargura = 50;
  imagemMargem = 30;
  mostrarImagem = false;
  registerForm: FormGroup;
  bodyDeletarEvento: string;
  file: File;
  fileNameToUpdate: string;
  dataAtual: string;

  _filtroLista: string;

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private toastr: ToastrService
    ) {
      this.localeService.use('pt-br')
    }

    get filtroLista(): string {
      return this._filtroLista;
    }

    set filtroLista(value: string) {
      this._filtroLista = value;
      this.eventosFiltrados = this.filtroLista ? this.filtrarEvento(this.filtroLista) : this.eventos;
    }

    novoEvento(template: any) {
      this.acao = 'post';
      this.openModal(template);
    }

    editarEvento(evento: Evento, template: any){
      this.acao = 'put';
      this.openModal(template);
      this.evento = Object.assign({}, evento);
      this.fileNameToUpdate = evento.imagemURL.toString();
      this.evento.imagemURL = '';
      this.registerForm.patchValue(this.evento);
    }

    openModal(template: any) {
      this.registerForm.reset();
      template.show();
    }

    ngOnInit() {
      this.validation(),
      this.getEventos()
    }

    filtrarEvento(filtrarPor: string): Evento[] {
      filtrarPor = filtrarPor.toLocaleLowerCase();
      return this.eventos.filter(
        evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
      );
    }

    excluirEvento(evento: Evento, template: any) {
      this.openModal(template);
      this.evento = evento;
      this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.tema}, Código: ${evento.id}`;
    }

    confirmeDelete(template: any) {
      this.eventoService.deleteEvento(this.evento.id).subscribe(
        () => {
          template.hide();
          this.getEventos();
          this.toastr.success('Deletado com sucesso.');
        }, error => {
          this.toastr.error('Erro ao excluir.');
        }
      );
    }

    uploadImagem() {
      if(this.acao === 'post'){
        const nomeArquivo = this.evento.imagemURL.split('\\', 3);
        this.evento.imagemURL = nomeArquivo[2];

        this.eventoService.postUpload(this.file, nomeArquivo[2]).
        subscribe(
          () => {
            this.dataAtual = new Date().getMilliseconds().toString();
            this.getEventos();
          }
        );
      } else {
        const nomeArquivo = this.evento.imagemURL.split('\\', 3);
        this.evento.imagemURL = this.fileNameToUpdate;

        this.eventoService.postUpload(this.file, this.fileNameToUpdate).
        subscribe(
          () => {
            this.dataAtual = new Date().getMilliseconds().toString();
            this.getEventos();
          }
        );
      }
    }

    salvarAlteracao(template: any) {
      if(this.registerForm.valid) {
        if(this.acao === 'post'){
          this.evento = Object.assign({}, this.registerForm.value);

          this.uploadImagem();

          this.eventoService.postEvento(this.evento).subscribe(
            (response: Evento) => {
              template.hide();
              this.getEventos();
              this.toastr.success('Inserido com sucesso.');
            }, error => {
              this.toastr.error('Erro ao inserir.');
            }
          );
        } else {
            this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);

            this.uploadImagem();

            this.eventoService.putEvento(this.evento).subscribe(
              (response: Evento) => {
                template.hide();
                this.getEventos();
                this.toastr.success('Editado com sucesso.');
              }, error => {
                this.toastr.error('Erro ao editar.');
              }
            )
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

    getEventos() {
      this.dataAtual = new Date().getMilliseconds().toString();
      this.eventoService.getAllEvento().subscribe(
        (_eventos: Evento[]) => {
          this.eventos = _eventos;
          this.eventosFiltrados = this.eventos;
        }, error => {
          this.toastr.error(`Erro ao tentar carregar Eventos: ${error}`);
      });
    }

    onFileChange(event) {
      const reader = new FileReader();

      if(event.target.files && event.target.files.length) {
        this.file = event.target.files;
      }
    }

    }
