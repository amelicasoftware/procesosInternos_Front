import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit, NgModule, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from "rxjs";
import { Router } from '@angular/router';
import { ServicesFormService } from 'src/app/Services/services-form.service';
import * as moment from 'moment';
import { Metodos } from '../metodos';
@Component({
  selector: 'app-otras-actividades',
  templateUrl: './otras-actividades.component.html',
  styleUrls: ['./otras-actividades.component.css']
})
export class OtrasActividadesComponent implements OnInit, OnDestroy {
  typeForm = new FormControl('Selecciona un formulario');
  autor: FormControl = this.fb.control('', Validators.required);
  pais = new FormControl('');
  form!: FormGroup;
  autores: String[] = [];
  charNoAc: string = "";
  lista: any[] = [];
  dato: boolean = true;
  selectedCountry: any = [];
  institucion: FormControl = this.fb.control('', [Validators.required, Validators.pattern(this.charNoAc)]);
  signos: string = Metodos.simbolos();

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
      TITPROYINV: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.pattern(this.charNoAc)]),
      TPOPROYINV: new FormControl('Otras Actividades'),
      RSMPROYINV: new FormControl('', Validators.maxLength(3900)),
      CVEPAISPRO: new FormControl(''),
      ANIOPROYINV: new FormControl('', [Validators.required, Validators.min(1980), Validators.max(2021)]),
      URLPROYINV: new FormControl('',),
      VOLPROYINV: new FormControl(''),
      FTEPROYINV: new FormControl('',),
      INSPROYINV: new FormControl('', [Validators.required]),
      AUTPADPROY: new FormControl(''),
      PARPROYINV: new FormControl(''),
      integrantes: new FormControl(''),
      ALCPROYINV: new FormControl(''),
      PRDPROYINV: new FormControl(''),
      MESPROYINV: new FormControl(''),
      FECCAPPROY: new FormControl(this.fechaActual()),
      REAPROYINV: new FormControl('', [Validators.required]),
      AGDREDPROY: new FormControl('', [Validators.required]),
      TPOACTPROY: new FormControl('', [Validators.required, Validators.pattern(this.charNoAc)]),
      INFADCPROY: new FormControl('', Validators.maxLength(3900)),
      AUTPROYINV: new FormControl(''),
      CTDINTPROY: new FormControl('1'),
    });

    // this.form.valueChanges
    //   .subscribe(value => {
    //     console.log(value);
    //   });
    this.servicesForm.updateStrcutureForm(this.form);
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

  des = true;
  habilitar() {
    this.des = true;
    this.form.controls.AGDREDPROY.setValue('');
  }
  deshabilitar() {
    this.des = false;
    this.form.controls.AGDREDPROY.setValue('no');
  }
  borrar(i: number) {
    this.autoresArr.removeAt(i);
  }


  guardar(): number {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return 0;
    }
    this.form.controls.TITPROYINV.setValue(Metodos.cambioResumen(this.form.controls.TITPROYINV.value));
    this.form.controls.VOLPROYINV.setValue(Metodos.cambioResumen(this.form.controls.VOLPROYINV.value));
    this.form.controls.INSPROYINV.setValue(Metodos.cambioResumen(this.form.controls.INSPROYINV.value));
    this.form.controls.TPOACTPROY.setValue(Metodos.cambioResumen(this.form.controls.TPOACTPROY.value));
    this.form.controls.FTEPROYINV.setValue(Metodos.cambioResumen(this.form.controls.FTEPROYINV.value));
    this.form.controls.CVEPAISPRO.setValue('96');

    console.log(this.paisesArr?.value);
    // imprimir el valor del formulario, sólo si es válido
    if (!this.actualizacion) {
      this.servicesForm.postDatos(this.form).subscribe(mensaje => {
        console.log(mensaje);
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
    return 0;
  }
  limpiar() {
    //console.log(btoa("demo@demo.com"));
    //console.log("ZGVtb0BkZW1vLmNvbQ==");
    //console.log(atob("ZGVtb0BkZW1vLmNvbQ=="));
    this.buildForm();
    this.selectedCountry = [];
    if(this.actualizacion)
      this.router.navigate(['busquedas']);
  }
  fechaActual(): String {
    let fecha = new Date;
    return moment(fecha).format('DD-MM-YY');
  }

  redirectConsultas() {
    this.router.navigate(['busquedas']);
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe();
    this.paisesSubscription.unsubscribe();
  }
}