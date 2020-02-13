import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Consulta',
  templateUrl: './Consulta.component.html',
  styleUrls: ['./Consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.getEventos()
  }

  getEventos() {
    return console.log()
  }

}
