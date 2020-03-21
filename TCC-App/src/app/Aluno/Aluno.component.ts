import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Aluno',
  templateUrl: './Aluno.component.html',
  styleUrls: ['./Aluno.component.css']
})
export class AlunoComponent implements OnInit {

  titulo = 'Portal do aluno';

  constructor() { }

  ngOnInit() {
  }

  abrirSimulacao() {
    console.log('teste');
  }

}
