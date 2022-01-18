import { Component, OnInit, OnDestroy } from '@angular/core';
import { newArray } from '@angular/compiler/src/util';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from "rxjs";
import { ServicesFormService } from 'src/app/Services/services-form.service';
import * as moment from 'moment';
import { Metodos } from '../metodos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proyectos-de-investigacion',
  templateUrl: './proyectos-de-investigacion.component.html',
  styleUrls: ['./proyectos-de-investigacion.component.css']
})
export class ProyectosDeInvestigacionComponent implements OnInit, OnDestroy {
  typeForm = new FormControl('Selecciona un formulario');
  charNoAc: string = "";
  autor: FormControl = this.fb.control('', [Validators.required, Validators.pattern(Metodos.expreg())]);
  apellidoAutor: FormControl = this.fb.control('', [Validators.required, Validators.pattern(Metodos.expreg())]);
  pais = new FormControl('');
  form!: FormGroup;
  autores: String[] = [];
  lista: any[] = [];
  dato: boolean = true;
  institucion: FormControl = this.fb.control('', [Validators.required, Validators.pattern(this.charNoAc)]);
  selectedCountry: any = [];
  signos: string = Metodos.simbolos();
  anio: Date = new Date();
  anioAct: number = this.anio.getFullYear();
  actualizacion = false;

  formSubscription!: Subscription;
  paisesSubscription!: Subscription;

  constructor(
    private servicesForm: ServicesFormService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.buildForm();
  }


  ngOnInit() {
    this.actualizacion = this.servicesForm.actualizacion;

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

    this.formSubscription = this.servicesForm.updateDataForm.subscribe(form => {
      console.log(form);
      this.form = form;
    });
    this.paisesSubscription = this.servicesForm.updatePais.subscribe(paises => {
      // console.log(paises);
      this.pais.setValue(paises);
    });
  }


  private buildForm() {
    this.form = this.fb.group({
      TITPROYINV: new FormControl('', [Validators.required, Validators.pattern(this.charNoAc)]),
      TPOPROYINV: new FormControl('Proyectos de investigación'),
      RSMPROYINV: new FormControl('', Validators.maxLength(3900)),
      CVEPAISPRO: new FormControl([], [Validators.required, Validators.min(1)]),
      ANIOPROYINV: new FormControl('', [Validators.required, Validators.min(1980), Validators.max(2021)]),
      listAutor: this.fb.array([], [Validators.required, Validators.min(1)]),
      listAutorAux: this.fb.array([], [Validators.required, Validators.min(1)]),
      listIns: this.fb.array([], [Validators.required, Validators.min(1)]),
      URLPROYINV: new FormControl('', [Validators.maxLength(200), Validators.pattern("http[s]?:(\/\/|s-ss-s).+")]),
      VOLPROYINV: new FormControl(''),
      FTEPROYINV: new FormControl(''),
      INSPROYINV: new FormControl(''),
      AUTPADPROY: new FormControl(''),
      PARPROYINV: new FormControl(''),
      integrantes: new FormControl(''),
      ALCPROYINV: new FormControl('', [Validators.required]),
      PRDPROYINV: new FormControl('', [Validators.required, Validators.pattern("[A-Z]*[a-z]+[ ]?-[ ]?[A-Z]*[a-z]+")]),
      MESPROYINV: new FormControl(''),
      FECCAPPROY: new FormControl(moment().format('DD-MM-YY')),
      REAPROYINV: new FormControl('', [Validators.required]),
      AGDREDPROY: new FormControl('', [Validators.required]),
      TPOACTPROY: new FormControl(''),
      INFADCPROY: new FormControl('', Validators.maxLength(3900)),
      AUTPROYINV: new FormControl(''),
      NUMPAGPROY: new FormControl(''),
      EDICPROY: new FormControl(''),
      CTDINTPROY: new FormControl('0'),
    });



    // this.form.valueChanges
    //   .subscribe(value => {
    //     console.log(value);
    //   });
    this.servicesForm.updateStrcutureForm(this.form);

  }
  des = true;
  habilitar() {
    this.des = true;
    this.form.controls.AGDREDPROY.setValue('');
  }
  deshabilitar() {
    this.des = false;
    this.form.controls.AGDREDPROY.setValue('no');
  }
  campoEsValido(campo: string) {
    return this.form.controls[campo].errors
      && this.form.controls[campo].touched;
  }

  get autoresArr() {
    return this.form.get('listAutor') as FormArray;
  }

  get autoresArrAux() {
    return this.form.get('listAutorAux') as FormArray;
  }

  get paisesArr() {
    return this.form.get('CVEPAISPRO');
  }
  get instArr() {
    return this.form.get('listIns') as FormArray;
  }

  addAutor(nombre: String, apellido: String, event: Event) {
    // event.preventDefault();
    if (nombre !== '' && apellido) {
      this.autoresArr.push(this.fb.control(`${this.autor.value} ${this.apellidoAutor.value}`, Validators.required));
      this.autoresArrAux.push(this.fb.control(`${this.autor.value}||${this.apellidoAutor.value}`, Validators.required));
      console.log(this.autoresArr.length);
      this.autor.reset('');
      this.apellidoAutor.reset('');
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
    this.autoresArrAux.removeAt(i);
  }
  borrarInst(i: number) {
    this.instArr.removeAt(i);
  }

  guardar() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    
    console.log(this.autoresArr.value);
    console.log(this.paisesArr?.value);
    this.form.controls.AUTPROYINV.setValue('');
    this.form.controls.TITPROYINV.setValue(Metodos.cambioResumen(this.form.controls.TITPROYINV.value));
    this.form.controls.VOLPROYINV.setValue(Metodos.cambioResumen(this.form.controls.VOLPROYINV.value));
    this.form.controls.INSPROYINV.setValue(Metodos.cambioResumen(this.form.controls.INSPROYINV.value));
    this.form.controls.TPOACTPROY.setValue(Metodos.cambioResumen(this.form.controls.TPOACTPROY.value));
    this.form.controls.FTEPROYINV.setValue(Metodos.cambioResumen(this.form.controls.FTEPROYINV.value));
    this.form.controls.INSPROYINV.setValue(Metodos.cambioResumen(this.instArr.value.join(',')));
    this.form.controls.AUTPROYINV.setValue(Metodos.cambioResumen(this.autoresArrAux.value.join(',')));
    this.form.controls.RSMPROYINV.setValue(Metodos.cambioResumen(this.form.controls.RSMPROYINV.value).replace(/(\r\n|\n|\r)/gm, " "));
    this.form.controls.INFADCPROY.setValue(Metodos.cambioResumen(this.form.controls.INFADCPROY.value).replace(/(\r\n|\n|\r)/gm, " "));
    this.form.controls.URLPROYINV.setValue(Metodos.cambioResumen(this.form.controls.URLPROYINV.value));
    this.form.controls.TITPROYINV.setValue(this.formatoTitulo(this.form.controls.TITPROYINV.value));
    console.log(typeof this.paisesArr?.value )
    this.form.controls.CVEPAISPRO.setValue(this.paisesArr?.value.join(','));

    
    this.form.removeControl('listAutorAux');
    // imprimir el valor del formulario, sólo si es válido
    if (!this.actualizacion) {
      this.servicesForm.postDatos(this.form).subscribe(mensaje => {

        console.log(mensaje);
        console.log(this.form.controls.TITPROYINV.value);
        if (mensaje !== null) {
          if (mensaje.respuesta === 'true') {
            this.limpiar();
            Metodos.alertWithSuccess();
          } else {
            this.selectedCountry = [];
            Metodos.erroalert();
          }
        } else {
          this.selectedCountry = [];
          Metodos.erroalert();
        }
      });
    } else {
      this.servicesForm.postUpdateProject(this.form).subscribe(mensaje => {

        console.log(mensaje);
        console.log(this.form.controls.TITPROYINV.value);
        if (mensaje !== null) {
          if (mensaje.respuesta === 'true') {
            this.limpiar();
            Metodos.alertWithSuccess();
          } else {
            this.selectedCountry = [];
            Metodos.erroalert();
          }
        } else {
          this.selectedCountry = [];
          Metodos.erroalert();
        }
      });
    }

    console.log(this.form.value);
    // console.log(mensaje);
    // this.alertWithSuccess();
    // this.erroalert();
  }
  limpiar() {
    //this.autoresArr.clear();
    this.instArr.clear();
    //this.form.reset();
    this.buildForm();
    this.selectedCountry = [];
    if(this.actualizacion)
      this.router.navigate(['busquedas']);
  }
  formatoTitulo(str: String): String {
    var splitted = str.split("/");
    return splitted.join("s-s");
  }

  redirectConsultas() {
    this.router.navigate(['busquedas']);
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe();
    this.paisesSubscription.unsubscribe();
  }

}

