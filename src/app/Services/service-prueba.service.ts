import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ServicePruebaService {

  urlService = environment.urlServices;

  constructor(
    private http: HttpClient
  ) { }

  getPaises(): Observable<any> {
    console.log(`${this.urlService}getDataPais`);
    return this.http.get(`${this.urlService}getDataPais`);
  }

  guardarDatos(form: any): Observable<any>{
    delete form.value.listAutor;
    console.log(`${this.urlService}sendRegisterOfProy/${JSON.stringify(form.value)}`);
    return this.http.post(`${this.urlService}sendRegisterOfProy/${JSON.stringify(form.value)}`, (mensaje: String) =>{
      console.log(mensaje);
    });
  }
}
