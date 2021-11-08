import { Component, OnInit } from '@angular/core';
import { newArray } from '@angular/compiler/src/util';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicesFormService } from 'src/app/Services/services-form.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
@Component({
  selector: 'app-proyectos-de-investigacion',
  templateUrl: './proyectos-de-investigacion.component.html',
  styleUrls: ['./proyectos-de-investigacion.component.css']
})
export class ProyectosDeInvestigacionComponent implements OnInit {
  typeForm = new FormControl('Selecciona un formulario');
  autor: FormControl = this.fb.control('', Validators.required);
  pais = new FormControl('');
  form!: FormGroup;
  autores: String[] = [];
  lista: any[] = [];
  dato: boolean = true;
  institucion: FormControl = this.fb.control('', Validators.required);


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
        TITPROYINV: new FormControl('', [Validators.required]),
        TPOPROYINV: new FormControl('Proyectos de Investigación'),
        RSMPROYINV: new FormControl(''),
        CVEPAISPRO: new FormControl([], [Validators.required, Validators.min(1)]),
        ANIOPROYINV: new FormControl(''),
        listAutor: this.fb.array([], []),
        listIns: this.fb.array([], [Validators.required, Validators.min(1)]),
        URLPROYINV: new FormControl(''),
        VOLPROYINV: new FormControl(''),
        FTEPROYINV: new FormControl('' , [Validators.required]),
        INSPROYINV: new FormControl(''),
        AUTPADPROY: new FormControl(''),
        PARPROYINV: new FormControl(''),
        integrantes: new FormControl(''),
        ALCPROYINV: new FormControl('', [Validators.required]),
        PRDPROYINV: new FormControl('',[Validators.pattern("[A-Z]*[a-z]+[ ]?-[ ]?[A-Z]*[a-z]+")]),
        MESPROYINV: new FormControl(''),
        FECCAPPROY: new FormControl(moment().format('DD-MM-YY')),
        REAPROYINV: new FormControl('', [Validators.required]),
        AGDREDPROY: new FormControl('', [Validators.required]),
        TPOACTPROY: new FormControl(''),
        INFADCPROY: new FormControl(''),
        AUTPROYINV: new FormControl(''),
        CTDINTPROY: new FormControl(''),
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
    get instArr() {
      return this.form.get('listIns') as FormArray;
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
  
    guardar() {
  
      console.log(this.autoresArr.value);
      console.log(this.paisesArr?.value);
  
      this.form.controls.AUTPROYINV.setValue(this.autoresArr.value.join(','));
      this.form.controls.CVEPAISPRO.setValue(this.paisesArr?.value.join(','));
  
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }
  
      // imprimir el valor del formulario, sólo si es válido
      this.servicesForm.postDatos(this.form).subscribe(mensaje => {
        console.log(mensaje);
        if(mensaje.respuesta){
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
  
    erroalert()  
    {  
      Swal.fire({  
        icon: 'error',  
        title: 'Oops...',  
        text: 'Something went wrong!',  
        footer: '<a href>Why do I have this issue?</a>'  
      })  
    }  
  }
  
  