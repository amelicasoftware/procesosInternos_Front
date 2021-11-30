import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit, NgModule } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicesFormService } from 'src/app/Services/services-form.service';
import * as moment from 'moment';
import {Metodos} from '../metodos';
@Component({
  selector:'app-form',
  templateUrl:'./form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  valor: number = 0;
  seleccion:any = {id:0,name:''};
  typeForm = new FormControl('Selecciona un formulario');
  charNoAc:string = "";
  autor: FormControl = this.fb.control('', [Validators.required,Validators.pattern(Metodos.expreg())]);
  pais = new FormControl('');
  form!: FormGroup;
  anioAct:number = 2021;
  selectedCountry:any=[];
  autores: String [] = [];
  lista:any[]=[];
  signos:string = Metodos.simbolos();
  tiposForms  = [
        { id: 1, name: 'Libros científicos' },
        { id: 2, name: 'Capítulos de libro científico'},
        { id: 3, name: 'Conferencias Especializadas' },
        { id: 4, name: 'Artículos de divulgación' },
        { id: 5, name: 'Libros de divulgación' },
        { id: 6, name: 'Otras actividades' },
        { id: 7, name: 'Redes de investigación' },
        { id: 8, name: 'Ejemplo' }
    ];

    dato: boolean = true;

  constructor(
    private servicesForm: ServicesFormService,
    private fb: FormBuilder
  ) {
    this.buildForm();
  }
  onSelect(id:any){
    this.valor = id;
    console.log(this.valor);
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
  campoEsValido( campo: string ) {
    return this.form.controls[campo].errors 
            && this.form.controls[campo].touched;
  }
  
  private buildForm() {
    this.form = this.fb.group({
      TITPROYINV: new FormControl('', [Validators.required, Validators.maxLength(100),Validators.pattern(this.charNoAc)]),
      TPOPROYINV: new FormControl('Artículos científicos'),
      RSMPROYINV: new FormControl('',Validators.maxLength(3900)),
      CVEPAISPRO: new FormControl([], [Validators.required, Validators.min(1)]),
      ANIOPROYINV: new FormControl('', [Validators.required, Validators.min(1980), Validators.max(this.anioAct)]),
      listAutor: this.fb.array([], [Validators.required, Validators.min(1)]),
      URLPROYINV: new FormControl('', [Validators.required, Validators.maxLength(200),Validators.pattern("http[s]?:(\/\/|s-ss-s).+")]),
      VOLPROYINV: new FormControl('',Validators.pattern(this.charNoAc)),
      FTEPROYINV: new FormControl('', [Validators.required,Validators.pattern(this.charNoAc)]),
      INSPROYINV: new FormControl(''),
      AUTPADPROY: new FormControl(''),
      PARPROYINV: new FormControl(''),
      integrantes: new FormControl(''),
      ALCPROYINV: new FormControl('', [Validators.required]),
      PRDPROYINV: new FormControl(''),
      MESPROYINV: new FormControl(''),
      FECCAPPROY: new FormControl(''),
      REAPROYINV: new FormControl('', [Validators.required]),
      AGDREDPROY: new FormControl('', [Validators.required]),
      TPOACTPROY: new FormControl(''),
      INFADCPROY: new FormControl('',Validators.maxLength(3900)),
      AUTPROYINV: new FormControl(''),
      CTDINTPROY: new FormControl('1'),
    });

    // this.form.valueChanges
    //   .subscribe(value => {
    //     console.log(value);
    //   });
  }

  get autoresArr() {
    return this.form.get('listAutor') as FormArray;
  }

  get paisesArr() {
    return this.form.get('CVEPAISPRO');
  }
  des = true;
  habilitar(){
    this.des = true;
    this.form.controls.AGDREDPROY.setValue('');
  }
  deshabilitar(){
    this.des = false;
    this.form.controls.AGDREDPROY.setValue('no');
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
    this.form.controls.AUTPROYINV.setValue(Metodos.cambioResumen(this.autoresArr.value.join(',')));
    this.form.controls.RSMPROYINV.setValue(Metodos.cambioResumen(this.form.controls.RSMPROYINV.value).replace(/(\r\n|\n|\r)/gm, " "));
    this.form.controls.INFADCPROY.setValue(Metodos.cambioResumen(this.form.controls.INFADCPROY.value).replace(/(\r\n|\n|\r)/gm, " "));
    this.form.controls.URLPROYINV.setValue(Metodos.cambioResumen(this.form.controls.URLPROYINV.value));
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
    // console.log(mensaje);
    // this.alertWithSuccess();
    // this.erroalert();
    return 0;
  }
  limpiar(){
    //this.form.reset();
    this.buildForm();
    this.selectedCountry = [];
  }
  fechaActual(): String{
    let fecha = new Date;
    this.anioAct = fecha.getFullYear();
    return moment(fecha).format('DD-MM-YY');
  }
}
