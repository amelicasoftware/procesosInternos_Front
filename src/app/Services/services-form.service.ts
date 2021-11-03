import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesFormService {

  urlService = environment.urlServices;


  constructor(
    private http: HttpClient
  ) { }


  getPaises(): Observable<any> {
    return this.http.get(`http://148.215.24.22:9084/boardInvestigacion/service/ds/getDataPais`);
  }

  postDatos(form: any): Observable<any>{
    delete form.value.listAutor;
    console.log(`${this.urlService}sendRegisterOfProy/${JSON.stringify(form.value)}`);
    return this.http.post(`${this.urlService}sendRegisterOfProy/${JSON.stringify(form.value)}`, (mensaje: String) =>{
      console.log(mensaje);
    });
  }
}
