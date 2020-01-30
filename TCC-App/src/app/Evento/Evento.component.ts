import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-Evento',
  templateUrl: './Evento.component.html',
  styleUrls: ['./Evento.component.css']
})
export class EventoComponent implements OnInit {

  eventosFiltrados: any = [];
  evento: any = [];
  _filtroLista: string;

  get filtroLista(): string {
    return this._filtroLista;
  }

  set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this._filtroLista ? this.filtrarEvento(this.filtroLista) : this.evento
  }

  filtrarEvento(filtrarPor: string): any {
    return this.evento.filter(
      eventos => this.evento.toLocaleString().indexOf(filtrarPor) !== -1
    );
  }

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.getEventos()
  }


  getEventos() {
    this.http.get('http://localhost:5000/api/evento').subscribe(
      response => {
        this.evento = response
      }, error => {
        console.log(error);
      }
    )
  }

}
