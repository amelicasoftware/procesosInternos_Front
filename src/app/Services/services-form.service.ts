import { Injectable, Output, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { environment } from '../../environments/environment';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ServicesFormService {

  urlService = environment.urlServices;
  dataForm: any;
  // pais = new FormControl('');
  form: any;
  listaPaises = [];
  actualizacion = false;
  @Output() updateDataForm: EventEmitter<any> = new EventEmitter();
  @Output() updatePais: EventEmitter<any> = new EventEmitter();
  @Output() updateForm: EventEmitter<any> = new EventEmitter();
  @Output() estado: EventEmitter<any> = new EventEmitter();


  constructor(
    private http: HttpClient
  ) { }


  getPaises(): Observable<any> {
    return this.http.get(`${this.urlService}getDataPais`);
  }

  postDatos(form: any): Observable<any>{
    const options = {
      headers: new HttpHeaders().append('key', 'value'),
      params: new HttpParams().append('key', 'value')
    }
    delete form.value.listAutor;
    delete form.value.listAutorLib;
    delete form.value.listIns;
    console.log('hasta aqui 2');

    console.log(`${this.urlService}sendRegisterOfProy/${JSON.stringify(form.value)}`);
    return this.http.post(`${this.urlService}sendRegisterOfProy/${JSON.stringify(form.value)}`, (mensaje: String) =>{
      console.log('si la mando');
      console.log(mensaje);
    }, options);xdxdx
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
    delete form.value.listAutorLib;
    delete form.value.listIns;
    console.log(`${this.urlService}sendUpdateOfProy/${JSON.stringify(form.value)}`);
    return this.http.post(`${this.urlService}sendUpdateOfProy/${JSON.stringify(form.value)}`, (mensaje: String) =>{
      console.log(mensaje);
    });
  }

  dataFormService(dataFomr: any){
    // console.log(dataFomr);
    this.dataForm = dataFomr;
    // console.log(this.dataForm);
    this.updateDataForm.emit(this.dataForm);
  }

  dataPaisService(paises: any){
    // console.log(paises);
    this.listaPaises = paises;
    // console.log(this.listaPaises);
    this.updatePais.emit(this.listaPaises);
  }

  updateStrcutureForm(form: any){
    // console.log('estrcutrua form',form);
    this.form = form;
    this.updateForm.emit(this.form);
    // console.log('despues del emiit form',this.form);
  }

  activarUpdate(){
    this.actualizacion = true;
    this.estado.emit(this.actualizacion);
    console.log('emito estado', this.actualizacion);
  }
}
