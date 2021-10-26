import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ServicePruebaService {

  constructor(
    private http: HttpClient
  ) { }

  getArticles(): Observable<any> {
    // search = normalize(search);
    console.log(`http://148.215.24.22:9084/boardInvestigacion/service/ds/getDataPrueba`);
    return this.http.get(`http://148.215.24.22:9084/boardInvestigacion/service/ds/getDataPrueba`);
  }

  getPaises(): Observable<any> {
    return this.http.get(`http://148.215.24.22:9084/boardInvestigacion/service/ds/getDataPais`);
  }

}
