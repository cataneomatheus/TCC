import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Resultado } from '../models/Resultado/Resultado';
import { ResultadoService } from '../services/Resultado/resultado.service';

@Component({
  selector: 'app-Resultado',
  templateUrl: './Resultado.component.html',
  styleUrls: ['./Resultado.component.css']
})
export class ResultadoComponent implements OnInit {

  titulo = 'Resultados';
  resultados: Resultado[] = [];
  resultadosFiltrados: Resultado[] = [];
  resultado: Resultado;

  _filtroLista: string;

  constructor(
    private resultadoService: ResultadoService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getResultados()
  }

  getResultados() {
    this.resultadoService.getResultados().subscribe(
      (response: Resultado[]) => {
        this.resultados = response;
        this.resultadosFiltrados = this.resultados;
      }, error => {
        this.toastr.error(`Erro ao tentar carregar os resultados: ${error}`);
      }

    )
  }

  filtrarEvento(filtrarPor: string): Resultado[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.resultados.filter(
      resultado => resultado.hashLib.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  get filtroLista(): string {
    return this._filtroLista;
  }

  set filtroLista(value: string) {
    this._filtroLista = value;
    this.resultadosFiltrados = this.filtroLista ? this.filtrarEvento(this.filtroLista) : this.resultados;
  }

}
