import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit, NgModule } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicesFormService } from 'src/app/Services/services-form.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import {Metodos} from '../metodos';
@Component({
  selector: 'app-articulos-de-divulgacion',
  templateUrl: './articulos-de-divulgacion.component.html',
  styleUrls: ['./articulos-de-divulgacion.component.css']
})
export class ArticulosDeDivulgacionComponent implements OnInit {
  typeForm = new FormControl('Selecciona un formulario');
  /*charNoAc:string = "[^#/\"?%]+";*/
  charNoAc:string = "";
  autor: FormControl = this.fb.control('', [Validators.required,Validators.pattern("[^#/\"?%']+")]);
  pais = new FormControl('');
  form!: FormGroup;
  formBack!: FormGroup;
  autores: String[] = [];
  lista: any[] = [];
  dato: boolean = true;
  selectedCountry:any=[];
  anioAct:number = 2021;
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
      TITPROYINV: new FormControl('', [Validators.required, Validators.maxLength(100),Validators.pattern(this.charNoAc)]),
      TPOPROYINV: new FormControl('Artículos de divulgación'),
      RSMPROYINV: new FormControl(''),
      CVEPAISPRO: new FormControl([], [Validators.required, Validators.min(1)]),
      ANIOPROYINV: new FormControl('', [Validators.required, Validators.min(1980), Validators.max(this.anioAct)]),
      listAutor: this.fb.array([], [Validators.required, Validators.min(1)]),
      URLPROYINV: new FormControl('', [Validators.required, Validators.maxLength(200),Validators.pattern("http[s]?:(\/\/|s-ss-s).+")]),
      VOLPROYINV: new FormControl(''),
      FTEPROYINV: new FormControl('', [Validators.required,Validators.maxLength(100),Validators.pattern(this.charNoAc)]),
      INSPROYINV: new FormControl(''),
      AUTPADPROY: new FormControl(''),
      PARPROYINV: new FormControl(''),
      integrantes: new FormControl(''),
      ALCPROYINV: new FormControl('', [Validators.required]),
      PRDPROYINV: new FormControl(''),
      MESPROYINV: new FormControl(''),
      FECCAPPROY: new FormControl(this.fechaActual()),
      REAPROYINV: new FormControl('', [Validators.required]),
      AGDREDPROY: new FormControl('', [Validators.required]),
      TPOACTPROY: new FormControl(''),
      INFADCPROY: new FormControl('',[Validators.pattern(this.charNoAc)]),
      AUTPROYINV: new FormControl(''),
      CTDINTPROY: new FormControl('1'),
    });
    this.formBack = this.form;
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

  get paisesArr() {
    return this.form.get('CVEPAISPRO');
  }

  addAutor(nombre: String, event: Event) {
    // event.preventDefault();
    if (nombre !== '') {
      this.autoresArr.push(this.fb.control(this.autor.value, Validators.required));
      console.log(this.autoresArr.length);
      this.autor.reset('');
      
    } else {

    }
  }

  borrar(i: number) {
    this.autoresArr.removeAt(i);
  }

  guardar():number {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return 0;
    }
    console.log(this.autoresArr.value);
    console.log(this.paisesArr?.value);
    this.form.controls.TITPROYINV.setValue(Metodos.cambioResumen(this.form.controls.TITPROYINV.value));
    this.form.controls.VOLPROYINV.setValue(Metodos.cambioResumen(this.form.controls.VOLPROYINV.value));
    this.form.controls.INSPROYINV.setValue(Metodos.cambioResumen(this.form.controls.INSPROYINV.value));
    this.form.controls.TPOACTPROY.setValue(Metodos.cambioResumen(this.form.controls.TPOACTPROY.value));
    this.form.controls.FTEPROYINV.setValue(Metodos.cambioResumen(this.form.controls.FTEPROYINV.value));
    this.form.controls.AUTPROYINV.setValue(this.autoresArr.value.join(','));
    this.form.controls.URLPROYINV.setValue(Metodos.cambioResumen(this.form.controls.URLPROYINV.value));
    this.form.controls.RSMPROYINV.setValue(Metodos.cambioResumen(this.form.controls.RSMPROYINV.value));
    this.form.controls.INFADCPROY.setValue(Metodos.cambioResumen(this.form.controls.INFADCPROY.value));
    
    this.form.controls.CVEPAISPRO.setValue(this.paisesArr?.value.join(','));

    // imprimir el valor del formulario, sólo si es válido
    this.servicesForm.postDatos(this.form).subscribe(mensaje => {
      console.log(mensaje);
      if(mensaje !== null){
        if(mensaje.respuesta === 'true'){
          this.limpiar();
          Metodos.alertWithSuccess();
        }else{
          this.selectedCountry = [];
          Metodos.erroalert();
        }
      }else{
        this.selectedCountry = [];
        Metodos.erroalert();
      }
    });
    console.log(this.form.value);
    return 0;
    // console.log(mensaje);
    // this.alertWithSuccess();
    // this.erroalert();
  }

  limpiar(){
    this.autoresArr.clear();
    this.buildForm();
    this.selectedCountry = [];
  }
  fechaActual(): String{
    let fecha = new Date;
    this.anioAct = fecha.getFullYear();
    return moment(fecha).format('DD-MM-YY');
  }
}