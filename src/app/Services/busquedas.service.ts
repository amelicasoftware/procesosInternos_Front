import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

  constructor(
    private http :HttpClient
  ){
  }
  getInfo() { 
    return this.http.get<any>('http://148.215.24.22:9084/boardInvestigacion/service/ds/getDataPrueba').toPromise()
  }
  getInfoFilters(data:any) { 
var str=JSON.stringify(data);
var dataBusqueda=JSON.parse(str);
    var json=   "{\"TITPROYINV\":\""+dataBusqueda.TITPROYINV+"\","+
        "\"TPOPROYINV\":\""+dataBusqueda.TPOPROYINV+"\","+
        "\"ANIOPROYINV\":\""+dataBusqueda.ANIOPROYINV+"\","+
        "\"MESPROYINV\":\""+dataBusqueda.MESPROYINV+"\","+
        "\"ALCPROYINV\":\""+dataBusqueda.ALCPROYINV+"\","+
        "\"PERIIN\":\""+dataBusqueda.PERIIN+"\","+
        "\"PERIFIN\":\""+dataBusqueda.PERIFIN+"\""+
      "}";
    var url='http://148.215.24.22:9084/boardInvestigacion/service/ds/getDataByFilters/'+json;
    return this.http.get<any>(url).toPromise()
  }
  getById(){
    return this.http.get<any>('http://148.215.24.22:9084/boardInvestigacion/service/ds/getDataProyById/34').toPromise()
  }
  getByTit(){
    var url='http://148.215.24.22:9084/boardInvestigacion/service/ds/getDataProyByTitle/'+
    '{"titulo":"solo politica nacional"}'
    return this.http.get<any>(url).toPromise()
  }
  sendInfo() { 
    var jsonInsert='{"TITPROYINV":"relaciones nuevas",'+
        '"TPOPROYINV":"Capitulo",'+
        '"ANIOPROYINV":2021,'+
        '"MESPROYINV":"Octubre",'+
        '"RSMPROYINV":"en este articulo se abordan distintas formas de hacer politica con un enfoque responsable y practico",'+
        '"AUTPROYINV":"jesus",'+
        '"URLPROYINV":"articulo.oa",'+
        '"VOLPROYINV":"01",'+
        '"FTEPROYINV":"Libros",'+
        '"INSPROYINV":"UAEM",'+
        '"AUTPADPROY":"jesus",'+
        '"PARPROYINV":"ninguna",'+
        '"CTDINTPROY":"1",'+
        '"ALCPROYINV":"nacional",'+
        '"PRDPROYINV":"Marzo - Agosto",'+
        '"FECCAPPROY":"03-11-21",'+
        '"REAPROYINV":"1",'+
        '"AGDREDPROY":"si",'+
        '"TPOACTPROY":"comunicación",'+
        '"INFADCPROY":"Este articulo es una prueba",'+
        '"CVEPAISPRO":"73,30,10,5"'+
        '}';
        var url='http://148.215.24.22:9084/boardInvestigacion/service/ds/sendRegisterOfProy/'+jsonInsert
    return this.http.post<any>(url,"").toPromise()
  }
  editInfo() { 
    var jsonUpdate='{"CVEPROYINV":"84",'+
        '"TITPROYINV":"política social en america latina",'+
        '"TPOPROYINV":"Nota periodistica",'+
        '"ANIOPROYINV":2019,'+
        '"MESPROYINV":"Octubre",'+
        '"RSMPROYINV":"en este articulo se abordan distintas formas de hacer politica con un enfoque responsable y practico",'+
        '"AUTPROYINV":"jesus",'+
        '"URLPROYINV":"articulo.oa",'+
        '"VOLPROYINV":"01",'+
        '"FTEPROYINV":"Libros",'+
        '"INSPROYINV":"UAEM",'+
        '"AUTPADPROY":"jesus",'+
        '"PARPROYINV":"ninguna",'+
        '"CTDINTPROY":"1",'+
        '"ALCPROYINV":"nacional",'+
        '"PRDPROYINV":"Marzo - Agosto",'+
        '"FECCAPPROY":"03-11-21",'+
        '"REAPROYINV":"1",'+
        '"AGDREDPROY":"si",'+
        '"TPOACTPROY":"comunicación",'+
        '"INFADCPROY":"Este articulo es una prueba",'+
        '"CVEPAISPRO":"73"'+
        '}';
        var url='http://148.215.24.22:9084/boardInvestigacion/service/ds/sendUpdateOfProy/'+jsonUpdate
    return this.http.post<any>(url,"").toPromise()
  }
  getFilters(){
    return this.http.get<any>('http://148.215.24.22:9084/boardInvestigacion/service/ds/getDataProyFilters').toPromise()
  }
}
