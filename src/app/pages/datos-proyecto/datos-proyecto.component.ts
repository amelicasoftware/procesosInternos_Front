import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ServicesFormService } from 'src/app/Services/services-form.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from "rxjs";
import { Router } from '@angular/router';
import { Metodos } from '../../components/metodos';
import * as moment from 'moment';



@Component({
  selector: 'app-datos-proyecto',
  templateUrl: './datos-proyecto.component.html',
  styleUrls: ['./datos-proyecto.component.css']
})
export class DatosProyectoComponent implements OnInit, AfterViewInit {
  cveProyecto: number = 0;
  dataForm: any;
  form!: FormGroup;
  pais = new FormControl('');
  lista: any[] = [];
  // autoresArr:any[]=[];
  charNoAc: string = "[^#/\"?%]+";
  autor: FormControl = this.fb.control('', [Validators.required, Validators.pattern(this.charNoAc)]);
  autorLib: FormControl = this.fb.control('', [Validators.required, Validators.pattern(Metodos.expreg())]);
  institucion: FormControl = this.fb.control('', [Validators.required, Validators.pattern(Metodos.expreg())]);
  selectedCountry: any = [];
  anioAct: number = 2021;
  tipoForm!: string;
  clientesSubscription!: Subscription;
  nombreForm: any;


  constructor(
    private servicesForm: ServicesFormService,
    private rutaActiva: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router

  ) {
    // this.buildForm();

  }

  private buildForm() {
    this.form = this.fb.group({
      TITPROYINV: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.pattern(this.charNoAc)]),
      TPOPROYINV: new FormControl('Artículos científicos'),
      RSMPROYINV: new FormControl('', Validators.maxLength(3900)),
      CVEPAISPRO: new FormControl([], [Validators.required, Validators.min(1)]),
      ANIOPROYINV: new FormControl('', [Validators.required, Validators.min(1980), Validators.max(this.anioAct)]),
      listAutor: this.fb.array([], [Validators.required, Validators.min(1)]),
      listAutorAux: this.fb.array([], [Validators.required, Validators.min(1)]),
      listAutorLib: this.fb.array([], [Validators.required, Validators.min(1)]),
      listIns: this.fb.array([], [Validators.required, Validators.min(1)]),
      URLPROYINV: new FormControl('', [Validators.required, Validators.maxLength(200), Validators.pattern("http[s]?:(\/\/|s-ss-s).+")]),
      VOLPROYINV: new FormControl('', Validators.pattern(this.charNoAc)),
      FTEPROYINV: new FormControl('', [Validators.required, Validators.pattern(this.charNoAc)]),
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
      EDICPROY: new FormControl(''),
      NUMPAGPROY: new FormControl(''),
      INFADCPROY: new FormControl('', Validators.maxLength(3900)),
      AUTPROYINV: new FormControl(''),
      CTDINTPROY: new FormControl('1'),
    });
  }

  ngOnInit(): void {

    this.servicesForm.getPaises().subscribe(paises => {
      // console.log(paises);
      this.lista = paises;
    });

    this.pais.valueChanges.subscribe(valor => {
      console.log(valor);
      this.paisesArr?.setValue(valor);
    });

    this.cveProyecto = this.rutaActiva.snapshot.params.cveProyecto;
    this.tipoForm = this.rutaActiva.snapshot.params.tipoForm;

    console.log(this.tipoForm);

    this.servicesForm.activarUpdate();

  }

  ngAfterViewInit() {
    this.buildForm();
    console.log('me ejecuto');
    this.form = this.servicesForm.form;
    console.log(this.form);

    //obtener datos del formulario y setearlos al form
    this.clientesSubscription = this.servicesForm.getProjectId(this.cveProyecto).subscribe(datos => {
      console.log(datos);
      this.tipoForm = this.form.value['TPOPROYINV'];
      let arrayPaises = [];
      console.log(datos);
      this.dataForm = datos[0];
      for (const prop in this.dataForm) {
        // console.log(`obj.${prop} = ${proyecto2[prop]}`);
        let nameProp = prop.toUpperCase();
        // console.log(nameProp);
        if (nameProp === 'CVEPROYINV') {
          //agregar formcontrol de cveproyecto
          let control = new FormControl(this.dataForm[prop]);
          this.form.addControl('CVEPROYINV', control);
        } else
          if (nameProp === 'NOMENTNAC') {
            let control = new FormControl(this.dataForm[prop]);
            this.form.addControl('NOMENTNAC', control);
          } else
            if (nameProp === 'CVEPAISPRO') {
              arrayPaises = this.dataForm.cvepaispro.split(',');
              // console.log(arrayPaises);
              this.pais.setValue(arrayPaises);
            } else if (nameProp === 'AUTPROYINV' && this.dataForm.autproyinv !== null) {
              let listaAutores = this.dataForm.autproyinv.split(',');
              listaAutores.forEach((autor: any) => this.inicioAutoresAux(autor));
              listaAutores.forEach((autor: any) => {
                autor = autor.replace('||', ' ');
                this.inicioAutores(autor)
              });
            } else if (nameProp === 'AUTPADPROY' && this.dataForm.autpadproy !== null) {
              let listaAutores = this.dataForm.autpadproy.split(',');
              listaAutores.forEach((autor: any) => this.listaAutoresPadre(autor));
            } else if ((nameProp === 'INSPROYINV' && this.dataForm.insproyinv !== null && this.form.get('listIns') !== null)) {
              console.log('control lista institucion-->', )
              let listaInstituciones = this.dataForm.insproyinv.split(',');
              console.log(listaInstituciones.length);
              // if (listaInstituciones.length === 1) {
                // let control = this.form.get('listIns');
                // console.log(control);
                // this.instArr.push(this.fb.control(listaInstituciones[0], Validators.required));
              // } else {
                
                listaInstituciones.forEach((institucion: any) => this.listaInstituciones(institucion));
              // }
            } else if (this.dataForm[prop] === null) {
              this.form.controls[nameProp].setValue('');
            } else {
              this.form.controls[nameProp].setValue(this.dataForm[prop]);
            }
      }
      this.servicesForm.dataFormService(this.form);
      this.servicesForm.dataPaisService(arrayPaises);

    });
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

  get autoresPadre() {
    return this.form.get('listAutorLib') as FormArray;
  }

  get instArr() {
    return this.form.get('listIns') as FormArray;
  }

  addAutor(nombre: String, event?: Event) {
    // event.preventDefault();
    if (nombre !== '') {
      this.autoresArr.push(this.fb.control(this.autor.value, Validators.required));
      console.log(this.autoresArr.length);
      this.autor.reset('');
    } else {

    }
  }

  inicioAutores(nombre: String) {
    this.autoresArr.push(this.fb.control(nombre, Validators.required));
  }

  inicioAutoresAux(nombre: String) {
    this.autoresArrAux.push(this.fb.control(nombre, Validators.required));
  }

  listaAutoresPadre(nombre: String) {
    this.autoresPadre.push(this.fb.control(nombre, Validators.required));
  }

  listaInstituciones(nombre: String) {
    this.instArr.push(this.fb.control(nombre, Validators.required));
  }

  borrar(id: number) {
    this.autoresArr.removeAt(id);
  }

  limpiar() {
    //this.form.reset();
    this.buildForm();
    this.selectedCountry = [];
  }
  fechaActual(): String {
    let fecha = new Date;
    this.anioAct = fecha.getFullYear();
    return moment(fecha).format('DD-MM-YY');
  }

  ngOnDestroy() {
    this.clientesSubscription.unsubscribe();
    this.servicesForm.actualizacion = false;
  }
}
