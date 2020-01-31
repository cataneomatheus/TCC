import { Component, OnInit } from '@angular/core';
import { EventoService } from '../services/evento.service';
import { Evento } from '../models/Evento';

@Component({
  selector: 'app-Evento',
  templateUrl: './Evento.component.html',
  styleUrls: ['./Evento.component.css']
})
export class EventoComponent implements OnInit {

  eventosFiltrados: Evento[];
  evento: Evento[];
  _filtroLista: string;
  imagemLargura = 50;
  imagemMargem = 25;
  mostrarImagem = false;

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

  constructor(private eventoService: EventoService ) { }

  ngOnInit() {
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

}
