import { Component, OnInit } from '@angular/core';
import { BusquedasService } from 'src/app/Services/busquedas.service';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';
import { ServicesFormService } from '../../Services/services-form.service';
declare var $: any;
@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  title = 'Counsulta de proyectos de investigación';
  headers = ["agdredproy",
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
  data: any;
  p: number = 1;
  filtersData: any;
  listFillterTipos: Array<String> = [];
  listFillterAlcances: Array<String> = [];
  listFillterAnios: Array<String> = [];
  listFillterMeses: Array<String> = [];
  listFillterInicios: Array<String> = [];
  listFillterFines: Array<String> = [];
  stateSidebar = "show";
  totalOfResults = String;
  banSearch = "false";
  f = new Date();
  meses = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo",
    "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre",
    "Diciembre");
  fecha = this.f.getDate() + " de " + this.meses[this.f.getMonth()] + " de "
    + this.f.getFullYear();
  dataBusqueda = {
    "TITPROYINV": "",
    "TPOPROYINV": "",
    "ANIOPROYINV": "",
    "MESPROYINV": "",
    "ALCPROYINV": "",
    "PERIIN": "",
    "PERIFIN": ""
  };
  listaTipos = ["Artículo",
    "Nota periodistica",
    "Capitulo de libro",
    "Reseña",
    "Resumen"
  ];
  listaAlcances = ["Nacional",
    "Internacional",
    "Continental"
  ];
  listaAnios = ["2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
    "2015"
  ];
  listaMeses = ["Enero",
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
  inicios = ["2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
    "2015"
  ];
  finales = ["2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
    "2015"
  ];
  usuario: any;
  loacalitems;
  shadowCard = '0px 2px 4px rgb(255 0 255 / 50%)!important;'
  constructor(
    private service: BusquedasService,
    private servicesFormService: ServicesFormService

  ) {
    this.loacalitems = localStorage.getItem("nameUser");
    this.myFunction(screen.width);
  }
  ngOnInit() {
    //this.service.getInfo().then(console.log);

    //this.service.getById().then(console.log);

    //this.service.getByTit().then(console.log);
    this.prepareSearch();
    this.usuario = this.loacalitems;
    console.log(typeof this.loacalitems);

  }

  myFunction(ancho: Number) {
    //console.log("ancho1 = "+ancho);
    if (ancho <= 919) {
      this.stateSidebar = this.stateSidebar == "show" ? "hidden" : this.stateSidebar == "hidden" ? "hidden" : this.stateSidebar;
    }
    //console.log("ancho2 = "+ancho);
  }
  createNewRegister() {
    this.service.sendInfo().then(console.log);
  }
  updateRegister() {
    this.service.editInfo().then(console.log);
  }
  generateImage(id: String) {
    console.log(id);
    html2canvas(document.querySelector('#' + id) as HTMLInputElement).then(function (canvas) {

      saveAs(canvas.toDataURL(), 'file-name.png');
    });
  }
  validatePeriod() {
    if (this.dataBusqueda.ANIOPROYINV != "" && this.dataBusqueda.PERIIN != "" && this.dataBusqueda.PERIFIN != "") {
      this.prepareSearch();
    } else if (this.dataBusqueda.PERIIN == "") {
      console.log("seleccione el inicio");
    } else if (this.dataBusqueda.PERIFIN != "") {
      console.log("seleccione el final");
    }
  }
  validateViewMonth() {
    $(document).ready(function () {
      setTimeout(function () {
        $(document).ready(function () {
          var filtro = $(".containerFiltros").find("#fill-Mes label").first().html();
          console.log("validando filtro de mes view:::" + filtro);
          if (filtro == "" || filtro == null) {
            $(".containerFiltros").find("#fill-Mes").attr("style", "display: none !important;");
            $(".containerFiltros").find(".fill-Periodo").attr("style", "display: none !important;");
          } else {
            $(".containerFiltros").find("#fill-Mes").attr("style", "display: block !important;");
            $(".containerFiltros").find(".fill-Periodo").attr("style", "display: block !important;");
          }
        });
      }, 1500);
    });
  }
  prepareSearch() {
    console.log("cadena 1 a buscar:::" + this.dataBusqueda.TITPROYINV + " :: " + this.dataBusqueda.TPOPROYINV);
    this.service.getInfoFilters(this.dataBusqueda).then(res => {
      var str = JSON.stringify(res);
      this.data = JSON.parse(str);
      this.totalOfResults = this.data.length;
      console.log(this.data);
      console.log("total of results::" + this.totalOfResults);
    });
    this.getFilters();
    this.validateViewMonth();
  }

  getFilters() {
    console.log("llamando filtros:::");
    this.service.getFilters(this.dataBusqueda).then(res => {
      var str = JSON.stringify(res);
      this.filtersData = JSON.parse(str);
      console.log(this.filtersData);
    });
  }
  eventHandler(event: any) {
    if (event.keyCode === 13) {
      this.prepareSearch();
      console.log(event, event.keyCode, event.keyIdentifier);
    }
  }
  redimensionarSB() {
    this.stateSidebar = this.stateSidebar == "show" ? "hidden" : this.stateSidebar == "hidden" ? "show" : this.stateSidebar;
  }
  clickListener(e: string, flag: boolean) {
    $(document).ready(function () {
      $(".containerFiltros").find("#" + e).hide();
      var nameSplited = e.split("-");

      if (nameSplited[0] == "menos") {
        $(".containerFiltros").find("button#mas-" + nameSplited[1]).show();
      } else {
        $(".containerFiltros").find("button#menos-" + nameSplited[1]).show();
      }
      if (flag == true) {
        $(".containerFiltros").find("#" + e).parent().children("div.elemento-filtro-hidden").attr("style", "display:block;");

      } else {
        $(".containerFiltros").find("#" + e).parent().children("div.elemento-filtro-hidden").attr("style", "display:none;");
      }
    });
  };
  findWithFilters(data: any) {
    console.log(data);
    var opc = -1;
    if (data.tipo == "Tipo") {
      opc = 0;
    } else if (data.tipo == "Alcance") {
      opc = 1;
    }
    else if (data.tipo == "Año") {
      opc = 2;
    } else if (data.tipo == "Mes") {
      opc = 3;
    }
    else if (data.tipo == "Periodo") {
      opc = 4;
    }
    console.log(opc);
    var sizeTipos = this.listFillterTipos != null ? this.listFillterTipos.length : 0;
    var sizeAlcances = this.listFillterAlcances != null ? this.listFillterAlcances.length : 0;
    var sizeAnios = this.listFillterAnios != null ? this.listFillterAnios.length : 0;
    var sizeMeses = this.listFillterMeses != null ? this.listFillterMeses.length : 0;
    console.log("tamaño de filtro tipos::" + sizeTipos);
    switch (opc) {
      case 0: //Filtro Tipos
        var index = -1;
        if (sizeTipos >= 1) {
          index = this.listFillterTipos.map(function (nombre: String) {
            return nombre;
          }).indexOf(data.nombre);
          console.log("index de la busqueda en array tipos:: " + index);
        }
        if (index != -1) { //Si la incluye se quita
          this.listFillterTipos.splice(index, 1);
          console.log("eliminando de array tipos::" + data.nombre);
        } else { //Si no la incluye se agrega
          this.listFillterTipos.push(data.nombre);
          //console.log("array tipos:::");
          // console.log(this.listFillterTipos)
        }
        this.dataBusqueda.TPOPROYINV = "";
        for (let tp in this.listFillterTipos) {
          console.log("tipo en cadena::" + this.listFillterTipos[tp]);
          this.dataBusqueda.TPOPROYINV += this.dataBusqueda.TPOPROYINV == "" ?
            "" + this.listFillterTipos[tp] :
            "," + this.listFillterTipos[tp];
        }
        break;
      case 1: //Filtro Alcances
        var index = -1;
        if (sizeAlcances >= 1) {
          index = this.listFillterAlcances.map(function (nombre: String) {
            return nombre;
          }).indexOf(data.nombre);
          console.log("index de la busqueda en array alcances:: " + index);
        }
        if (index != -1) { //Si la incluye se quita
          this.listFillterAlcances.splice(index, 1);
          console.log("eliminando de array alcances::" + data.nombre);
        } else { //Si no la incluye se agrega
          this.listFillterAlcances.push(data.nombre);
          console.log("array alcances:::");
          //console.log(this.listFillterAlcances)
        }
        this.dataBusqueda.ALCPROYINV = "";
        for (let alc in this.listFillterAlcances) {
          console.log("alcance en cadena::" + this.listFillterAlcances[alc]);
          this.dataBusqueda.ALCPROYINV += this.dataBusqueda.ALCPROYINV == "" ?
            "" + this.listFillterAlcances[alc] :
            "," + this.listFillterAlcances[alc];
        }
        break;
      case 2: //Filtro Años
        var index = -1;
        if (sizeAnios >= 1) {
          index = this.listFillterAnios.map(function (nombre: String) {
            return nombre;
          }).indexOf(data.nombre);
          console.log("index de la busqueda en array años:: " + index);
        }
        if (index != -1) { //Si la incluye se quita
          this.listFillterAnios.splice(index, 1);
          console.log("eliminando de array años::" + data.nombre);
        } else { //Si no la incluye se agrega
          this.listFillterAnios.push(data.nombre);
          console.log("array años:::");
          //console.log(this.listFillterAnios)
        }
        this.dataBusqueda.ANIOPROYINV = "";
        for (let alc in this.listFillterAnios) {
          console.log("año en cadena::" + this.listFillterAnios[alc]);
          this.dataBusqueda.ANIOPROYINV += this.dataBusqueda.ANIOPROYINV == "" ?
            "" + this.listFillterAnios[alc] :
            "," + this.listFillterAnios[alc];
        }
        if (sizeAnios == 0) {
          this.dataBusqueda.PERIIN = "";
          this.dataBusqueda.PERIFIN = "";
        }
        break;
      case 3: //Filtro Meses
        var index = -1;
        if (sizeMeses >= 1) {
          index = this.listFillterMeses.map(function (nombre: String) {
            return nombre;
          }).indexOf(data.nombre);
          console.log("index de la busqueda en array meses:: " + index);
        }
        if (index != -1) { //Si la incluye se quita
          this.listFillterMeses.splice(index, 1);
          console.log("eliminando de array meses::" + data.nombre);
        } else { //Si no la incluye se agrega
          this.listFillterMeses.push(data.nombre);
          console.log("array meses:::");
          //console.log(this.listFillterMeses)
        }
        this.dataBusqueda.MESPROYINV = "";
        for (let alc in this.listFillterMeses) {
          console.log("mes en cadena::" + this.listFillterMeses[alc]);
          this.dataBusqueda.MESPROYINV += this.dataBusqueda.MESPROYINV == "" ?
            "" + this.listFillterMeses[alc] :
            "," + this.listFillterMeses[alc];
        }
        break;
    }
    //this.prepareSearch();
  }
  campoFiltrado(data: any) {
    //console.log(data);
    var st = false;
    if (data.tipo == "Tipo") {
      var sizeTipos = this.listFillterTipos != null ? this.listFillterTipos.length : 0;
      var index = -1;
      if (sizeTipos >= 1) {
        index = this.listFillterTipos.map(function (nombre: String) {
          return nombre;
        }).indexOf(data.nombre);
        //console.log("index de la busqueda en array tipos:: "+index);
      }
      if (index != -1) {
        st = true;
      } else {
        st = false;
      }
    }
    if (data.tipo == "Alcance") {
      var sizeAlcances = this.listFillterAlcances != null ? this.listFillterAlcances.length : 0;
      var index = -1;
      if (sizeAlcances >= 1) {
        index = this.listFillterAlcances.map(function (nombre: String) {
          return nombre;
        }).indexOf(data.nombre);
        //console.log("index de la busqueda en array tipos:: "+index);
      }
      if (index != -1) {
        st = true;
      } else {
        st = false;
      }
    }
    if (data.tipo == "Año") {
      var sizeAnios = this.listFillterAnios != null ? this.listFillterAnios.length : 0;
      var index = -1;
      if (sizeAnios >= 1) {
        index = this.listFillterAnios.map(function (nombre: String) {
          return nombre;
        }).indexOf(data.nombre);
        //console.log("index de la busqueda en array tipos:: "+index);
      }
      if (index != -1) {
        st = true;
      } else {
        st = false;
      }
    }
    if (data.tipo == "Mes") {
      var sizeMeses = this.listFillterMeses != null ? this.listFillterMeses.length : 0;
      var index = -1;
      if (sizeMeses >= 1) {
        index = this.listFillterMeses.map(function (nombre: String) {
          return nombre;
        }).indexOf(data.nombre);
        //console.log("index de la busqueda en array tipos:: "+index);
      }
      if (index != -1) {
        st = true;
      } else {
        st = false;
      }
    }
    return st;
  }
  citarElement(idCard: String) {
    $(document).ready(function () {
      var aux = document.createElement("input");
      console.log(aux);
      aux.setAttribute("value", $("#" + idCard).text().replace(/&amp;/g, "&"));
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Cita copiada en formato APA\n' + $("#" + idCard).text().replace(/&amp;/g, "&"),
        showConfirmButton: false,
        timer: 2500
      })
    });
  }
  touchSearch() {
    this.banSearch = this.banSearch == "false" ? "true" : this.banSearch;
    $(document).ready(function () {
      $(".box").addClass("is-danger");
    });
  }

  deleteProyecto(id: number) {
    console.log('te voy a borrar ', id);
    Swal.fire({
      title: '¿Estas seguro de borrar el proyecto?',
      text: "Esta acción no se puede revertir!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicesFormService.deleteProjectId(id).subscribe(respuesta => {
          console.log(respuesta);
          if (respuesta.respuesta === "true") {
            Swal.fire(
              'Eliminado!',
              'El proyecto fue eliminado.',
              'success'
            );
            this.prepareSearch();
          } else {
            console.error('Error al elminar el proyecto ', id);
          }
        });
      }
    })
  }


  // getColor(country) { (2)
  //   switch (country) {
  //     case 'Artículo científico':
  //       return 'green';
  //     case 'Capítulo de libro científico':
  //       return 'blue';
  //     case 'Libro científico':
  //       return 'red';
  //     case 'Conferencia especializada':
  //       return 'red';
  //     case 'Artículo de divulgación':
  //       return 'red';
  //     case 'Libro de divulgación':
  //       return 'red';
  //     case 'Otras actividades de divulgación':
  //       return 'red';
  //     case 'Dirección de tesis':
  //       return 'red';
  //     case 'Proyecto de investigación':
  //       return 'red';
  //     case 'Red de investigación':
  //       return 'red';
  //   }
  // }
}
