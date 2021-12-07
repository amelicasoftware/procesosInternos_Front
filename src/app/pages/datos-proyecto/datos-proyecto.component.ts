import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ServicesFormService } from 'src/app/Services/services-form.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  selectedCountry: any = [];
  anioAct: number = 2021;
  tipoForm!: string;


  constructor(
    private servicesForm: ServicesFormService,
    private rutaActiva: ActivatedRoute,
    private fb: FormBuilder

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
      INFADCPROY: new FormControl('', Validators.maxLength(3900)),
      AUTPROYINV: new FormControl(''),
      CTDINTPROY: new FormControl('1'),
    });
    // this.form = this.mensajeHijo;
    // console.log(this.form);
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

    // this.servicesForm.updateForm.subscribe(form => {
    //   this.form = form;
    //   console.log('estrcutrura recibida', this.form);
    // })

  }

  ngAfterViewInit() {
    this.buildForm();
    console.log('me ejecuto');
    this.form = this.servicesForm.form;
    console.log(this.form);

    // this.servicesForm.updateForm.subscribe(form => {
    //   this.form = form;
    //   console.log('estrcutrura recibida', this.form);
    // })

    //obtener datos del formulario y setearlos al form
    this.servicesForm.getProjectId(this.cveProyecto).subscribe(datos => {
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
            } else if (nameProp === 'AUTPROYINV') {
              let listaAutores = this.dataForm.autproyinv.split(',');
              listaAutores.forEach((autor: any) => this.inicioAutores(autor));
            } else
              if (this.dataForm[prop] === null) {
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

  get paisesArr() {
    return this.form.get('CVEPAISPRO');
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

  // guardar() {
  //   console.log(this.form.value);
  //   console.log(this.form.valid);
  //   if (this.form.invalid) {
  //     this.form.markAllAsTouched();
  //     return 0;
  //   }

  //   console.log(this.autoresArr.value);
  //   console.log(this.paisesArr?.value);


  //   this.form.controls.TITPROYINV.setValue(Metodos.cambioResumen(this.form.controls.TITPROYINV.value));
  //   this.form.controls.VOLPROYINV.setValue(Metodos.cambioResumen(this.form.controls.VOLPROYINV.value));
  //   this.form.controls.INSPROYINV.setValue(Metodos.cambioResumen(this.form.controls.INSPROYINV.value));
  //   this.form.controls.TPOACTPROY.setValue(Metodos.cambioResumen(this.form.controls.TPOACTPROY.value));
  //   this.form.controls.FTEPROYINV.setValue(Metodos.cambioResumen(this.form.controls.FTEPROYINV.value));
  //   this.form.controls.AUTPROYINV.setValue(Metodos.cambioResumen(this.autoresArr.value.join(',')));
  //   this.form.controls.RSMPROYINV.setValue(Metodos.cambioResumen(this.form.controls.RSMPROYINV.value).replace(/(\r\n|\n|\r)/gm, " "));
  //   this.form.controls.INFADCPROY.setValue(Metodos.cambioResumen(this.form.controls.INFADCPROY.value).replace(/(\r\n|\n|\r)/gm, " "));
  //   this.form.controls.URLPROYINV.setValue(Metodos.cambioResumen(this.form.controls.URLPROYINV.value));
  //   this.form.controls.CVEPAISPRO.setValue(this.paisesArr?.value.join(','));
  //   // imprimir el valor del formulario, sólo si es válido
  //   this.servicesForm.postUpdateProject(this.form).subscribe(mensaje => {
  //     console.log(mensaje);
  //     if (mensaje !== null) {
  //       if (mensaje.respuesta === 'true') {
  //         this.limpiar();
  //         Metodos.alertWithSuccess();
  //       } else {
  //         this.selectedCountry = [];
  //         Metodos.erroalert();
  //       }
  //     } else {
  //       this.selectedCountry = [];
  //       Metodos.erroalert();
  //     }
  //   });
  //   console.log(this.form.value);
  //   // console.log(mensaje);
  //   // this.alertWithSuccess();
  //   // this.erroalert();
  //   return 0;
  // }

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

  // ngOnDestroy() {
  //   this.servicesForm.dataForm.destroy();
  // }
}
