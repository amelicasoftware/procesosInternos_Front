import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicesFormService } from 'src/app/Services/services-form.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
@Component({
  selector: 'app-form-direccion-de-tesis',
  templateUrl: './form-direccion-de-tesis.component.html',
  styleUrls: ['./form-direccion-de-tesis.component.css']
})
export class FormDireccionDeTesisComponent implements OnInit {

  typeForm = new FormControl('Selecciona un formulario');
  charNoAc:string = "[^#/\"?%]+";
  autor: FormControl = this.fb.control('', [Validators.required,Validators.pattern(this.charNoAc)]);
  pais = new FormControl('');
  form!: FormGroup;
  autores: String[] = [];
  lista: any[] = [];
  dato: boolean = true;


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
      TITPROYINV: new FormControl('', [Validators.required,Validators.pattern(this.charNoAc)]),
      TPOPROYINV: new FormControl('Dirección de tesis'),
      RSMPROYINV: new FormControl(''),
      CVEPAISPRO: new FormControl(['']),
      ANIOPROYINV: new FormControl('', [Validators.required, Validators.min(1980), Validators.max(2021)]),
      listAutor: this.fb.array([], [Validators.required, Validators.min(1)]),
      URLPROYINV: new FormControl(''),
      VOLPROYINV: new FormControl(''),
      FTEPROYINV: new FormControl('' , [Validators.required,Validators.pattern(this.charNoAc)]),
      INSPROYINV: new FormControl('', [Validators.required,Validators.pattern(this.charNoAc)]),
      AUTPADPROY: new FormControl(''),
      PARPROYINV: new FormControl(''),
      integrantes: new FormControl(''),
      ALCPROYINV: new FormControl('', [Validators.required]),
      PRDPROYINV: new FormControl(''),
      MESPROYINV: new FormControl(''),
      FECCAPPROY: new FormControl(moment().format('DD-MM-YY')),
      REAPROYINV: new FormControl('', [Validators.required]),
      AGDREDPROY: new FormControl('', [Validators.required]),
      TPOACTPROY: new FormControl(''),
      INFADCPROY: new FormControl('',[Validators.pattern(this.charNoAc)]),
      AUTPROYINV: new FormControl(''),
      CTDINTPROY: new FormControl('0'),
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
    if (nombre !== '' && this.autoresArr.length<1) {
      this.autoresArr.push(this.fb.control(this.autor.value, Validators.required));
      console.log(this.autoresArr.length);
      this.autor.reset('');
    } else {
      
    }
  }

  borrar(i: number) {
    this.autoresArr.removeAt(i);
  }

  guardar() {

    console.log(this.autoresArr.value);
    this.form.controls.TITPROYINV.setValue(this.formatoTitulo(this.form.controls.TITPROYINV.value));
    this.form.controls.RSMPROYINV.setValue(this.cambioResumen(this.form.controls.RSMPROYINV.value));
    this.form.controls.INFADCPROY.setValue(this.cambioResumen(this.form.controls.INFADCPROY.value));
    this.form.controls.AUTPROYINV.setValue(this.autoresArr.value.join(','));
    this.form.controls.CVEPAISPRO.setValue('');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // imprimir el valor del formulario, sólo si es válido
    this.servicesForm.postDatos(this.form).subscribe(mensaje => {
      console.log(mensaje);
      if(mensaje.respuesta == "true"){
        this.limpiar();
        this.alertWithSuccess();
      }else{
        this.erroalert();
      }
    });
    console.log(this.form.value);
    // console.log(mensaje);
    // this.alertWithSuccess();
    // this.erroalert();
  }

  alertWithSuccess(){  
    Swal.fire('', 'guardado correctamente!', 'success')  
  }
  limpiar(){
    this.autoresArr.clear();
    //this.form.reset();
    this.buildForm();
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
  
  formatoTitulo(str:String): String{
    var splitted = str.split("/");
    return splitted.join("s-s");
  }
  cambioUrl(str:String): string{
    var splitted = str.split("/");
    var splitted2 = splitted.join("s-s").split("?");
    var splitted3 = splitted2.join("d-d").split("%");
    return splitted3.join("p-p");
  }
  cambioResumen(str:String): string{
    str = this.cambioUrl(str);
    var splitted = str.split("\'");
    var splitted2 = splitted.join("c-c").split("\"");
    return splitted2.join("b-b");
  }
}

