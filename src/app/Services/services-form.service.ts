import { Injectable, Output, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesFormService {

  urlService = environment.urlServices;
  dataForm: any;
  @Output() cambioFiltros: EventEmitter<any> = new EventEmitter();

  constructor(
    private http: HttpClient
  ) { }


  getPaises(): Observable<any> {
    return this.http.get(`${this.urlService}getDataPais`);
  }

  postDatos(form: any): Observable<any>{
    delete form.value.listAutor;
    console.log(`${this.urlService}sendRegisterOfProy/${JSON.stringify(form.value)}`);
    return this.http.post(`${this.urlService}sendRegisterOfProy/${JSON.stringify(form.value)}`, (mensaje: String) =>{
      console.log(mensaje);
    });
  }

  getAllProjects(): Observable<any>{
    console.log(`${this.urlService}getAllData`)
    return this.http.get(`${this.urlService}getAllData`);
  }

  getProjectId(id: number): Observable<any>{
    console.log(`${this.urlService}getDataProyById/${id}`)
    return this.http.get(`${this.urlService}getDataProyById/${id}`);
  }

  deleteProjectId(id: number): Observable<any>{
    console.log(`${this.urlService}sendDataToDelete/${id}`)
    return this.http.post(`${this.urlService}sendDataToDelete/${id}`, "");
  }

  postUpdateProject(form: any): Observable<any>{
    delete form.value.listAutor;
    console.log(`${this.urlService}sendUpdateOfProy/${JSON.stringify(form.value)}`);
    return this.http.post(`${this.urlService}sendUpdateOfProy/${JSON.stringify(form.value)}`, (mensaje: String) =>{
      console.log(mensaje);
    });
  }

  dataFormService(dataFomr: any){
    console.log(dataFomr);
    this.dataForm = dataFomr;
    console.log(this.dataForm);
    this.cambioFiltros.emit(this.dataForm);
  }
}
