import { Component, OnInit } from '@angular/core';
import { BusquedasService } from 'src/app/Services/busquedas.service';
import html2canvas from 'html2canvas';
import  {saveAs}  from 'file-saver';
declare var $: any;
@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  title = 'Systemas internos redalyc';
  headers= [      "agdredproy",
                  "alcproyinv",
                  "anioproyinv",
                  "autpadproy",
                  "autproyinv",
                  "ctdintproy",
                  "cvepaispro",
                  "cveproyinv",
                  "feccapproy",
                  "fteproyinv",
                  "infadcproy",
                  "insproyinv",
                  "mesproyinv",
                  "parproyinv",
                  "prdproyinv",
                  "reaproyinv",
                  "rsmproyinv",
                  "titproyinv",
                  "tpoactproy",
                  "tpoproyinv",
                  "urlproyinv",
                  "volproyinv"
                    ];
  data:any;
  filtersData:any;
  filterTipes:any;
  stateSidebar="show";
  dataBusqueda= {"TITPROYINV":"",
                  "TPOPROYINV":"",
                  "ANIOPROYINV":"",
                  "MESPROYINV":"",
                  "ALCPROYINV":"",
                  "PERIIN":"",
                  "PERIFIN":""
                    };
  listaTipos= [ "Artículo",
                "Nota periodistica",
                "Capitulo de libro",
                "Reseña",
                "Resumen"
              ];
  listaAlcances= [ "Nacional",
                    "Internacional",
                    "Continental"
  ];
  listaAnios= [ "2021",
                "2020",
                "2019",
                "2018",
                "2017",
                "2016",
                "2015"
  ];
  listaMeses= [ "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre"
  ];
  inicios= [ "2021",
                "2020",
                "2019",
                "2018",
                "2017",
                "2016",
                "2015"
  ];
  finales= [ "2021",
                "2020",
                "2019",
                "2018",
                "2017",
                "2016",
                "2015"
  ];
  constructor(
    private service :BusquedasService
  ){
  }
  ngOnInit(){
    //this.service.getInfo().then(console.log);

    //this.service.getById().then(console.log);

    //this.service.getByTit().then(console.log);

    this.prepareSearch();
    this.getFilters();
  }
  createNewRegister(){
    this.service.sendInfo().then(console.log);
  }
  updateRegister(){
    this.service.editInfo().then(console.log);
  }
  generateImage(id:String){
    console.log(id);
    html2canvas(document.querySelector('#'+id) as HTMLInputElement).then(function(canvas) {
        
        saveAs(canvas.toDataURL(), 'file-name.png');
    });
  }
  prepareSearch(){
    console.log("cadena 1 a buscar:::"+this.dataBusqueda.TITPROYINV+"::"+this.dataBusqueda.TPOPROYINV);
    this.service.getInfoFilters(this.dataBusqueda).then(res=>{
      var str=JSON.stringify(res);
      this.data=JSON.parse(str);
      console.log(this.data);
    });
  }
  getFilters(){
    console.log("llamando filtros:::");
    this.service.getFilters().then(res=>{
      var str=JSON.stringify(res);
      this.filtersData=JSON.parse(str);
      console.log(this.filtersData);
    });
  }
  eventHandler(event:any) {
    if(event.keyCode===13){
      this.prepareSearch();
      console.log(event, event.keyCode, event.keyIdentifier);
    }
 } 
 redimensionarSB(){
  this.stateSidebar=this.stateSidebar=="show" ? "hidden" : this.stateSidebar=="hidden" ? "show" : this.stateSidebar;
 }
clickListener(e:string, flag:boolean) {
  console.log(e);
  $("#"+e).attr("display","none");
  var nameSplited = e.split("-");
  if (nameSplited[0] == "menos") {
    $("mas-" + nameSplited[1]).attr("display","block");
  } else {
      $("menos-" + nameSplited[1]).attr("display","block");
  }
  if (flag) {
      for (var i = 0; i < $("#"+e).parent().children().length; i++) {
          if ($("#"+e).parent().children(i).className == 'elemento-filtro-hidden') {
            $("#"+e).parent().children(i).style.display = "block";
          }
      }
  } else {
      for (var i = 0; i < $("#"+e).parent().children().length; i++) {
          if ($("#"+e).parent().children(i).className == 'elemento-filtro-hidden') {
              $("#"+e).parent().children(i).style.display = "none";
          }
      }
  }
};
findWithFilters(data:any){
  console.log(data);
  var nombre=data.nombre;
  var str=JSON.stringify(this.filterTipes);
  var jsonTipos=(str!="" && str!=null) ? JSON.parse(str):null;
  var opc = -1;
        if (data.tipo == "Tipos") {
            opc = 0;
        } else if (data.tipo == "País") {
            opc = 3;
        }
        console.log(opc);
        var length = jsonTipos!=null ? jsonTipos.length : 0; 
        console.log(length);
  switch (opc) {
    case 0: //Filtro Año
    var index=-1;
      if(length>=1){
         index = this.filterTipes.map(function(nombre:String) {
            return nombre;
        }).indexOf(data.nombre);
        console.log(index);
      }
        if (index != -1) { //Si la incluye se quita
            this.filterTipes.splice(index, 1);
        } else { //Si no la incluye se agrega
            this.filterTipes.push({
                "nombre": ""+data.nombre
            });
        }
        break;
  }
}

}
