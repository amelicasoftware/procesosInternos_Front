import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit, NgModule } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicesFormService } from 'src/app/Services/services-form.service';
import * as moment from 'moment';
import {Metodos} from '../metodos';
@Component({
  selector: 'app-otras-actividades',
  templateUrl: './otras-actividades.component.html',
  styleUrls: ['./otras-actividades.component.css']
})
export class OtrasActividadesComponent implements OnInit {
  typeForm = new FormControl('Selecciona un formulario');
  autor: FormControl = this.fb.control('', Validators.required);
  pais = new FormControl('');
  form!: FormGroup;
  autores: String[] = [];
  charNoAc:string = "";
  lista: any[] = [];
  dato: boolean = true;
  selectedCountry:any=[];
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
      TPOPROYINV: new FormControl('Otras Actividades'),
      RSMPROYINV: new FormControl(''),
      CVEPAISPRO: new FormControl(''),
      ANIOPROYINV: new FormControl('0'),
      URLPROYINV: new FormControl('',),
      VOLPROYINV: new FormControl(''),
      FTEPROYINV: new FormControl('',),
      INSPROYINV: new FormControl(''),
      AUTPADPROY: new FormControl(''),
      PARPROYINV: new FormControl(''),
      integrantes: new FormControl(''),
      ALCPROYINV: new FormControl(''),
      PRDPROYINV: new FormControl(''),
      MESPROYINV: new FormControl(''),
      FECCAPPROY: new FormControl(this.fechaActual()),
      REAPROYINV: new FormControl('0'),
      AGDREDPROY: new FormControl(''),
      TPOACTPROY: new FormControl('',[Validators.required,Validators.pattern(this.charNoAc)]),
      INFADCPROY: new FormControl(''),
      AUTPROYINV: new FormControl(''),
      CTDINTPROY: new FormControl('1'),
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
    this.form.controls.TITPROYINV.setValue(Metodos.cambioResumen(this.form.controls.TITPROYINV.value));
    this.form.controls.VOLPROYINV.setValue(Metodos.cambioResumen(this.form.controls.VOLPROYINV.value));
    this.form.controls.INSPROYINV.setValue(Metodos.cambioResumen(this.form.controls.INSPROYINV.value));
    this.form.controls.TPOACTPROY.setValue(Metodos.cambioResumen(this.form.controls.TPOACTPROY.value));
    this.form.controls.FTEPROYINV.setValue(Metodos.cambioResumen(this.form.controls.FTEPROYINV.value));
    console.log(this.paisesArr?.value);
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
    // console.log(mensaje);
    // this.alertWithSuccess();
    // this.erroalert();
    return 0;
  }
  limpiar(){
    //console.log(btoa("demo@demo.com"));
    //console.log("ZGVtb0BkZW1vLmNvbQ==");
    //console.log(atob("ZGVtb0BkZW1vLmNvbQ=="));
    this.buildForm();
    this.selectedCountry = [];
  }
  fechaActual(): String{
    let fecha = new Date;
    return moment(fecha).format('DD-MM-YY');
  }
}