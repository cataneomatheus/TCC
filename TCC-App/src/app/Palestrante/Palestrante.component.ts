import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Palestrante',
  templateUrl: './Palestrante.component.html',
  styleUrls: ['./Palestrante.component.css']
})
export class PalestranteComponent implements OnInit {
  
  titulo = 'Palestrantes';

  constructor() { }

  ngOnInit() {
  }

}
