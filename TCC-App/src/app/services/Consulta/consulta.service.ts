import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consulta } from 'src/app/models/Consulta/Consulta';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  baseUrl = 'http://localhost:5000/api/consulta';  

constructor(private http: HttpClient) { }

getAllConsultas(): Observable<Consulta[]> {
  return this.http.get<Consulta[]>(this.baseUrl);
}

getConsultaById(id: number): Observable<Consulta> {
  return this.http.get<Consulta>(`${this.baseUrl}/${id}`);
}

postUpload(file: File, nome: string) {
  const fileToUpload = <File>file[0];
  const formData = new FormData();
  formData.append('file', fileToUpload, nome);

  return this.http.post(`${this.baseUrl}/upload`, formData);
}

postConsulta(consulta: Consulta){
  return this.http.post(this.baseUrl, consulta);
}

putConsulta(consulta: Consulta){
  return this.http.put(`${this.baseUrl}/${consulta.id}`, consulta);
}

deleteConsulta(id: number){
  return this.http.delete(`${this.baseUrl}/${id}`);
}
}
