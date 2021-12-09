import { Component, OnInit, NgModule, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicesFormService } from 'src/app/Services/services-form.service';
import { Subscription } from "rxjs";
import * as moment from 'moment';
import { Metodos } from '../metodos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redes',
  templateUrl: './redes.component.html',
  styleUrls: ['./redes.component.css']
})
export class RedesComponent implements OnInit, OnDestroy {
  typeForm = new FormControl('Selecciona un formulario');
  charNoAc: string = "";
  autor: FormControl = this.fb.control('', [Validators.required, Validators.pattern(Metodos.expreg())]);
  institucion: FormControl = this.fb.control('', [Validators.required, Validators.pattern(Metodos.expreg())]);
  pais = new FormControl('');
  form!: FormGroup;
  autores: String[] = [];
  lista: any[] = [];
  dato: boolean = true;
  fecha: string = '';
  selectedCountry: any = [];
  anioAct: number = 2021;
  signos: string = Metodos.simbolos();
  expreg: String = "(Enero|enero|Febrero|febrero|marzo|Marzo|Abril|abril|mayo|Mayo|junio|Junio|julio|Julio|Agosto|agosto|Septiembre|septiembre|octubre|Octubre|Noviembre|noviembre|Diciembre|diciembre)" +
    "[ ]?-[ ]?(Enero|enero|Febrero|febrero|marzo|Marzo|Abril|abril|mayo|Mayo|junio|Junio|julio|Julio|Agosto|agosto|Septiembre|septiembre|octubre|Octubre|Noviembre|noviembre|Diciembre|diciembre)";

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
      TITPROYINV: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.pattern(this.charNoAc)]),
      TPOPROYINV: new FormControl('Redes de investigación'),
      RSMPROYINV: new FormControl('', Validators.maxLength(3900)),
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
      PRDPROYINV: new FormControl('', [Validators.pattern("" + this.expreg)]),
      MESPROYINV: new FormControl(''),
      FECCAPPROY: new FormControl(this.fechaActual()),
      REAPROYINV: new FormControl('', [Validators.required]),
      AGDREDPROY: new FormControl('', [Validators.required]),
      TPOACTPROY: new FormControl(''),
      INFADCPROY: new FormControl('', Validators.maxLength(3900)),
      AUTPROYINV: new FormControl(''),
      CTDINTPROY: new FormControl('1', [Validators.pattern("[1-9]+[0-9]*"), Validators.min(1), Validators.max(10000)]),
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

  get instArr() {
    return this.form.get('listIns') as FormArray;
  }

  get paisesArr() {
    return this.form.get('CVEPAISPRO');
  }

  addAutor(nombre: String, event: Event) {
    //console.log(Metodos.codificar(JSON.stringify(this.form.value)));
    //console.log(Metodos.descodificar(Metodos.codificar(JSON.stringify(this.form.value))));
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
  borrarInst(i: number) {
    this.instArr.removeAt(i);
  }
  guardar(): number {
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
    this.form.controls.INSPROYINV.setValue(Metodos.cambioResumen(this.instArr.value.join(',')));

    this.form.controls.CVEPAISPRO.setValue(this.paisesArr?.value.join(','));

    delete this.form.value.listIns;


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
    this.autoresArr.clear();
    this.instArr.clear();
    this.buildForm();
    this.selectedCountry = [];
  }
  fechaActual(): String {
    let fecha = new Date;
    this.anioAct = fecha.getFullYear();
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