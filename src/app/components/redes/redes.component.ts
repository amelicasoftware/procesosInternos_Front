import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit, NgModule } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicesFormService } from 'src/app/Services/services-form.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
@Component({
  selector: 'app-redes',
  templateUrl: './redes.component.html',
  styleUrls: ['./redes.component.css']
})
export class RedesComponent implements OnInit {
  typeForm = new FormControl('Selecciona un formulario');
  charNoAc:string = /*"[^#/\"?%]+"*/"";
  autor: FormControl = this.fb.control('', [Validators.required,Validators.pattern(this.charNoAc)]);
  institucion: FormControl = this.fb.control('', [Validators.required,Validators.pattern(this.charNoAc)]);
  pais = new FormControl('');
  form!: FormGroup;
  autores: String[] = [];
  lista: any[] = [];
  dato: boolean = true;
  fecha: string = '';
  selectedCountry:any=[];
  anioAct:number=2021;
  expreg:String ="(Enero|enero|Febrero|febrero|marzo|Marzo|Abril|abril|mayo|Mayo|junio|Junio|julio|Julio|Agosto|agosto|Septiembre|septiembre|octubre|Octubre|Noviembre|noviembre|Diciembre|diciembre)"+
                 "[ ]?-[ ]?(Enero|enero|Febrero|febrero|marzo|Marzo|Abril|abril|mayo|Mayo|junio|Junio|julio|Julio|Agosto|agosto|Septiembre|septiembre|octubre|Octubre|Noviembre|noviembre|Diciembre|diciembre)";
  constructor(
    private servicesForm: ServicesFormService,
    private fb: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit() {

    this.typeForm.valueChanges.subscribe(valor => {
      console.log(valor);
    });

    this.pais.valueChanges.subscribe(valor => {
      console.log(valor);
      this.paisesArr?.setValue(valor);
    });

    this.servicesForm.getPaises().subscribe(paises => {
      console.log(paises);
      this.lista = paises;
    });
  }

  private buildForm() {
    this.form = this.fb.group({
      TITPROYINV: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100),Validators.pattern(this.charNoAc)]),
      TPOPROYINV: new FormControl('Redes de Investigación'),
      RSMPROYINV: new FormControl('',[Validators.pattern(this.charNoAc)]),
      CVEPAISPRO: new FormControl([], [Validators.required, Validators.min(1)]),
      ANIOPROYINV: new FormControl('', [Validators.required, Validators.min(1980), Validators.max(this.anioAct)]),
      listAutor: this.fb.array([], [Validators.required, Validators.min(1)]),
      listIns: this.fb.array([], [Validators.required, Validators.min(1)]),
      URLPROYINV: new FormControl(''),
      VOLPROYINV: new FormControl(''),
      FTEPROYINV: new FormControl(''),
      INSPROYINV: new FormControl(''),
      AUTPADPROY: new FormControl(''),
      PARPROYINV: new FormControl(''),
      integrantes: new FormControl(''),
      ALCPROYINV: new FormControl('', [Validators.required]),
      PRDPROYINV: new FormControl('',[Validators.pattern(""+this.expreg)]),
      MESPROYINV: new FormControl(''),
      FECCAPPROY: new FormControl(this.fechaActual()),
      REAPROYINV: new FormControl('', [Validators.required]),
      AGDREDPROY: new FormControl('', [Validators.required]),
      TPOACTPROY: new FormControl(''),
      INFADCPROY: new FormControl('',[Validators.pattern(this.charNoAc)]),
      AUTPROYINV: new FormControl(''),
      CTDINTPROY: new FormControl('1',[Validators.pattern("[1-9]+[0-9]*"),Validators.min(1),Validators.max(10000)]),
    });

    // this.form.valueChanges
    //   .subscribe(value => {
    //     console.log(value);
    //   });
  }

  campoEsValido(campo: string) {
    return this.form.controls[campo].errors
      && this.form.controls[campo].touched;
  }

  get autoresArr() {
    return this.form.get('listAutor') as FormArray;
  }

  get instArr() {
    return this.form.get('listIns') as FormArray;
  }

  get paisesArr() {
    return this.form.get('CVEPAISPRO');
  }

  addAutor(nombre: String, event: Event) {
    console.log(this.codificar(JSON.stringify(this.form.value)));
    console.log(this.descodificar(this.codificar(JSON.stringify(this.form.value))));
    if (nombre !== '') {
      this.autoresArr.push(this.fb.control(this.autor.value, Validators.required));
      console.log(this.autoresArr.length);
      this.autor.reset('');
    } else {

    }
  }
  addIns(nombre: String, event: Event) {
    // event.preventDefault();
    if (nombre !== '') {
      this.instArr.push(this.fb.control(this.institucion.value, Validators.required));
      console.log(this.instArr.length);
      this.institucion.reset('');
    } else {

    }
  }

  borrar(i: number) {
    this.autoresArr.removeAt(i);
  }
  borrarInst(i: number) {
    this.instArr.removeAt(i);
  }
  guardar():number {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return 0;
    }
    console.log(this.autoresArr.value);
    console.log(this.paisesArr?.value);
    this.form.controls.AUTPROYINV.setValue(this.autoresArr.value.join(','));
    this.form.controls.RSMPROYINV.setValue(this.cambioResumen(this.form.controls.RSMPROYINV.value));
    this.form.controls.INFADCPROY.setValue(this.cambioResumen(this.form.controls.INFADCPROY.value));
    this.form.controls.INSPROYINV.setValue(this.instArr.value.join(','));

    this.form.controls.CVEPAISPRO.setValue(this.paisesArr?.value.join(','));

    delete this.form.value.listIns;
 

    // imprimir el valor del formulario, sólo si es válido
    this.servicesForm.postDatos(this.form).subscribe(mensaje => {
      console.log(mensaje);
      if(mensaje !== null){
        if(mensaje.respuesta === 'true'){
          this.limpiar();
          this.alertWithSuccess();
        }else{
          this.selectedCountry = [];
          this.erroalert();
        }
      }else{
        this.selectedCountry = [];
        this.erroalert();
      }
    });
    console.log(this.form.value);
    // console.log(mensaje);
    // this.alertWithSuccess();
    // this.erroalert();
    return 0;
  }

  alertWithSuccess(){  
    Swal.fire('', 'guardado correctamente!', 'success')  
  }

  erroalert()  
  {  
    Swal.fire({  
      icon: 'error',  
      title: 'Oops...',  
      text: 'Something went wrong!',  
      footer: '<a href>Why do I have this issue?</a>'  
    })  
  }  
  limpiar(){
    this.autoresArr.clear();
    this.instArr.clear();
    this.form = this.fb.group({
      TITPROYINV: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100),Validators.pattern(this.charNoAc)]),
      TPOPROYINV: new FormControl('Redes de Investigación'),
      RSMPROYINV: new FormControl('',[Validators.pattern(this.charNoAc)]),
      CVEPAISPRO: new FormControl([], [Validators.required, Validators.min(1)]),
      ANIOPROYINV: new FormControl('', [Validators.required, Validators.min(1980), Validators.max(this.anioAct)]),
      listAutor: this.fb.array([], [Validators.required, Validators.min(1)]),
      listIns: this.fb.array([], [Validators.required, Validators.min(1)]),
      URLPROYINV: new FormControl(''),
      VOLPROYINV: new FormControl(''),
      FTEPROYINV: new FormControl(''),
      INSPROYINV: new FormControl(''),
      AUTPADPROY: new FormControl(''),
      PARPROYINV: new FormControl(''),
      integrantes: new FormControl(''),
      ALCPROYINV: new FormControl('', [Validators.required]),
      PRDPROYINV: new FormControl('',[Validators.pattern(""+this.expreg)]),
      MESPROYINV: new FormControl(''),
      FECCAPPROY: new FormControl(this.fechaActual()),
      REAPROYINV: new FormControl('', [Validators.required]),
      AGDREDPROY: new FormControl('', [Validators.required]),
      TPOACTPROY: new FormControl(''),
      INFADCPROY: new FormControl('',[Validators.pattern(this.charNoAc)]),
      AUTPROYINV: new FormControl(''),
      CTDINTPROY: new FormControl('1',[Validators.pattern("[1-9]+[0-9]*"),Validators.min(1),Validators.max(10000)]),
    });
    this.selectedCountry = [];
  }
  fechaActual(): String{
    let fecha = new Date;
    this.anioAct = fecha.getFullYear();
    return moment(fecha).format('DD-MM-YY');
  }
  cambioUrl(str:String): string{
    var splitted = str.split("/");
    var splitted2 = splitted.join("s-s").split("?");
    var splitted3 = splitted2.join("d-d").split("%");
    return splitted3.join("p-p");
  }
  cambioResumen(str:String): string{
    var splitted = str.split("\'");
    var splitted2 = splitted.join("c-c").split("\"");
    return splitted2.join("b-b");
  }
  codificar(from: string):string{
    var splitted = btoa(from).split("/");
    console.log(splitted);
    return splitted.join("s-s");
  }
  descodificar(str:string){
    var splitted = str.split("s-s");
    str = atob(splitted.join("/"));
    return str;
  }
}