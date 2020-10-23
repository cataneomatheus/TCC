import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resultado } from 'src/app/models/Resultado/Resultado';

@Injectable({
  providedIn: 'root'
})
export class ResultadoService {

  baseUrl = 'http://52.249.194.7/apiconsulta/api/resultado';

  constructor(private http: HttpClient) { }


  iniciaResultado(dto: Object): Observable<Resultado> {
    return this.http.post<Resultado>(`${this.baseUrl}`, dto);
  }

  setaPerguntaFeita(dto: Object) {
    return this.http.put(`${this.baseUrl}/SetaPerguntaFeita`, dto);
  }

  setaExameVisto(dto: Object) {
    return this.http.put(`${this.baseUrl}/SetaExameVisto`, dto);
  }

  finalizar(id: number) {
    return this.http.put(`${this.baseUrl}/${id}/Finalizar`, null);
  }

  getResultados(): Observable<Resultado[]> {
    return this.http.get<Resultado[]>(this.baseUrl);
  }

  getResultadoPorId(id: number): Observable<Resultado> {
    return this.http.get<Resultado>(`${this.baseUrl}/${id}`);
  }

}
