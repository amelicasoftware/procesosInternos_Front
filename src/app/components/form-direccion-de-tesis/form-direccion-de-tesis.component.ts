import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from "rxjs";
import { Router } from '@angular/router';
import { ServicesFormService } from 'src/app/Services/services-form.service';
import * as moment from 'moment';
import { Metodos } from '../metodos';
@Component({
  selector: 'app-form-direccion-de-tesis',
  templateUrl: './form-direccion-de-tesis.component.html',
  styleUrls: ['./form-direccion-de-tesis.component.css']
})
export class FormDireccionDeTesisComponent implements OnInit, OnDestroy {

  typeForm = new FormControl('Selecciona un formulario');
  charNoAc: string = "";
  /*charNoAc:string = "[^#/\"?%]+";*/
  autor: FormControl = this.fb.control('', [Validators.required, Validators.pattern(Metodos.expreg())]);
  pais = new FormControl('');
  form!: FormGroup;
  autores: String[] = [];
  lista: any[] = [];
  dato: boolean = true;
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
      TITPROYINV: new FormControl('', [Validators.required, Validators.pattern(this.charNoAc)]),
      TPOPROYINV: new FormControl('Dirección de tesis'),
      RSMPROYINV: new FormControl('', Validators.maxLength(3900)),
      CVEPAISPRO: new FormControl(['96']),
      ANIOPROYINV: new FormControl('', [Validators.required, Validators.min(1980), Validators.max(2021)]),
      listAutor: this.fb.array([], [Validators.required, Validators.min(1)]),
      URLPROYINV: new FormControl(''),
      VOLPROYINV: new FormControl(''),
      FTEPROYINV: new FormControl('', [Validators.required, Validators.pattern(this.charNoAc)]),
      INSPROYINV: new FormControl('', [Validators.required, Validators.pattern(this.charNoAc)]),
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
  des = true;
  habilitar() {
    this.des = true;
    this.form.controls.AGDREDPROY.setValue('');
  }
  deshabilitar() {
    this.des = false;
    this.form.controls.AGDREDPROY.setValue('no');
  }
  addAutor(nombre: String, event: Event) {
    // event.preventDefault();
    if (nombre !== '' && this.autoresArr.length < 1) {
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
    this.form.controls.TITPROYINV.setValue(Metodos.cambioResumen(this.form.controls.TITPROYINV.value));
    this.form.controls.VOLPROYINV.setValue(Metodos.cambioResumen(this.form.controls.VOLPROYINV.value));
    this.form.controls.INSPROYINV.setValue(Metodos.cambioResumen(this.form.controls.INSPROYINV.value));
    this.form.controls.TPOACTPROY.setValue(Metodos.cambioResumen(this.form.controls.TPOACTPROY.value));
    this.form.controls.FTEPROYINV.setValue(Metodos.cambioResumen(this.form.controls.FTEPROYINV.value));
    this.form.controls.AUTPROYINV.setValue(Metodos.cambioResumen(this.autoresArr.value.join(',')));
    this.form.controls.RSMPROYINV.setValue(Metodos.cambioResumen(this.form.controls.RSMPROYINV.value).replace(/(\r\n|\n|\r)/gm, " "));
    this.form.controls.INFADCPROY.setValue(Metodos.cambioResumen(this.form.controls.INFADCPROY.value).replace(/(\r\n|\n|\r)/gm, " "));
    this.form.controls.CVEPAISPRO.setValue('');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // imprimir el valor del formulario, sólo si es válido
    if (!this.actualizacion) {
      this.servicesForm.postDatos(this.form).subscribe(mensaje => {
        console.log(mensaje);
        if (mensaje.respuesta == "true") {
          this.limpiar();
          Metodos.alertWithSuccess();
        } else {
          Metodos.erroalert();
        }
      });
    } else {
      this.servicesForm.postUpdateProject(this.form).subscribe(mensaje => {
        console.log(mensaje);
        if (mensaje.respuesta == "true") {
          this.limpiar();
          Metodos.alertWithSuccess();
        } else {
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
    this.autoresArr.clear();
    //this.form.reset();
    this.buildForm();
    if(this.actualizacion)
    this.router.navigate(['busquedas']);
  }

  redirectConsultas() {
    this.router.navigate(['busquedas']);
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe();
    this.paisesSubscription.unsubscribe();
  }

}

