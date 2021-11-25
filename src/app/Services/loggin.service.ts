import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LogginService {

  constructor(
    private http :HttpClient
  ) { }
  getDataSession(data:any) { 
    var str=JSON.stringify(data);
    var dataBusqueda=JSON.parse(str);
        var json=   "{\"nombre\":\""+dataBusqueda.name+"\","+
            "\"password\":\""+dataBusqueda.password+"\","+
          "}";
        var url='http://148.215.24.22:9084/boardInvestigacion/service/ds/getDataSession/'+json;
        return this.http.get<any>(url).toPromise()
      }
}
