import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {

  loginFiltrados: any = [];
  login: any = [];
  _filtroLista: string;

  get filtroLista(): string {
    return this._filtroLista;
  }

  set filtroLista(value: string) {
    this._filtroLista = value;
    this.loginFiltrados = this._filtroLista ? this.filtrarLogin(this.filtroLista) : this.login
  }

  filtrarLogin(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.login.filter(
      login => this.login.email.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.getLogins()
  }


  getLogins() {
    this.http.get('http://localhost:5000/api/values').subscribe(
      response => {
        this.login = response
      }, error => {
        console.log(error);
      }
    )
  }

}
