import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit, NgModule } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicesFormService } from 'src/app/Services/services-form.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
@Component({
  selector: 'app-cap-libro-cientifico',
  templateUrl: './cap-libro-cientifico.component.html',
  styleUrls: ['./cap-libro-cientifico.component.css']
})
export class CapLibroCientificoComponent implements OnInit {
  typeForm = new FormControl('Selecciona un formulario');
  autor: FormControl = this.fb.control('',[Validators.required,Validators.pattern("[^#/\"?]+")]);
  autorLib: FormControl = this.fb.control('',[Validators.required,Validators.pattern("[^#/\"?]+")]);
  pais = new FormControl('');
  form!: FormGroup;
  autores: String[] = [];
  lista: any[] = [];
  dato: boolean = true;
  selectedCountry:any=[];
  anioAct:number=2021;
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
      TITPROYINV: new FormControl('', [Validators.required, Validators.maxLength(100),Validators.pattern("[^#/\"?]+")]),
      TPOPROYINV: new FormControl('Capítulos de libro científico'),
      RSMPROYINV: new FormControl('',[Validators.pattern("[^#/\"?]+")]),
      CVEPAISPRO: new FormControl([], [Validators.required, Validators.min(1)]),
      ANIOPROYINV: new FormControl('', [Validators.required, Validators.min(1980), Validators.max(this.anioAct)]),
      listAutor: this.fb.array([], [Validators.required, Validators.min(1)]),
      listAutorLib: this.fb.array([], [Validators.required, Validators.min(1)]),
      URLPROYINV: new FormControl('', [Validators.required,Validators.pattern("http[s]?:(\/\/|s-ss-s).+")]),
      VOLPROYINV: new FormControl(''),
      FTEPROYINV: new FormControl('', [Validators.required,Validators.pattern("[^#/\"?]+")]),
      INSPROYINV: new FormControl('',[Validators.required,Validators.pattern("[^#/\"?]+")]),
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
      INFADCPROY: new FormControl('',[Validators.pattern("[^#/\"?]+")]),
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
  get autoresLibArr() {
    return this.form.get('listAutorLib') as FormArray;
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

  addAutorLib(nombre: String, event: Event) {
    // event.preventDefault();
    if (nombre !== '') {
      this.autoresLibArr.push(this.fb.control(this.autorLib.value, Validators.required));
      console.log(this.autoresLibArr.length);
      this.autorLib.reset('');
    } else {

    }
  }

  borrar(i: number) {
    this.autoresArr.removeAt(i);
  }
  borrarLib(i: number) {
    this.autoresLibArr.removeAt(i);
  }

  guardar(): number {

    
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return 0;
    }
    console.log(this.autoresArr.value);
    console.log(this.paisesArr?.value);
    this.form.controls.TITPROYINV.setValue(this.cambioUrl(this.form.controls.TITPROYINV.value));
    this.form.controls.FTEPROYINV.setValue(this.cambioUrl(this.form.controls.FTEPROYINV.value));
    this.form.controls.URLPROYINV.setValue(this.cambioUrl(this.form.controls.URLPROYINV.value));
    this.form.controls.AUTPROYINV.setValue(this.autoresArr.value.join(','));
    this.form.controls.AUTPADPROY.setValue(this.autoresLibArr.value.join(','));
    this.form.controls.CVEPAISPRO.setValue(this.paisesArr?.value.join(','));
    delete this.form.value.listAutorLib;

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
    this.autoresLibArr.clear();
    this.form = this.fb.group({
      TITPROYINV: new FormControl('', [Validators.required, Validators.maxLength(100),Validators.pattern("[^#/\"?]+")]),
      TPOPROYINV: new FormControl('Capítulos de libro científico'),
      RSMPROYINV: new FormControl('',[Validators.pattern("[^#/\"?]+")]),
      CVEPAISPRO: new FormControl([], [Validators.required, Validators.min(1)]),
      ANIOPROYINV: new FormControl('', [Validators.required, Validators.min(1980), Validators.max(this.anioAct)]),
      listAutor: this.fb.array([], [Validators.required, Validators.min(1)]),
      listAutorLib: this.fb.array([], [Validators.required, Validators.min(1)]),
      URLPROYINV: new FormControl('', [Validators.required,Validators.pattern("http[s]?:(\/\/|s-ss-s).+")]),
      VOLPROYINV: new FormControl(''),
      FTEPROYINV: new FormControl('', [Validators.required,Validators.pattern("[^#/\"?]+")]),
      INSPROYINV: new FormControl('',[Validators.required,Validators.pattern("[^#/\"?]+")]),
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
      INFADCPROY: new FormControl('',[Validators.pattern("[^#/\"?]+")]),
      AUTPROYINV: new FormControl(''),
      CTDINTPROY: new FormControl('1'),
    });
    this.selectedCountry = [];
  }
  fechaActual(): String{
    let fecha = new Date;
    this.anioAct = fecha.getFullYear();
    return moment(fecha).format('DD-MM-YY');
  }
  
  cambioUrl(str:String): String{
    var splitted = str.split("/");
    return splitted.join("s-s");
  }
}