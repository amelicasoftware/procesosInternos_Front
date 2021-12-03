import { Component, OnInit } from '@angular/core';
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
export class DatosProyectoComponent implements OnInit {
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


  constructor(
    private servicesForm: ServicesFormService,
    private rutaActiva: ActivatedRoute,
    private fb: FormBuilder,

  ) {
    this.buildForm();
    
  }

  private buildForm() {
    this.form = this.fb.group({});
    // this.form = this.mensajeHijo;
    console.log(this.form);
  }

  addItem(newItem: string) {
    console.log(newItem);
  }

  ngOnInit(): void {
    this.servicesForm.updateForm.subscribe(form => {
      this.form = form;
      console.log('estrcutrura recibida', this.form);
    })

    this.servicesForm.getPaises().subscribe(paises => {
      // console.log(paises);
      this.lista = paises;
    });

    this.pais.valueChanges.subscribe(valor => {
      console.log(valor);
      this.paisesArr?.setValue(valor);
    });

    this.cveProyecto = this.rutaActiva.snapshot.params.cveProyecto;

    //obtener datos del formulario y setearlos al form
    this.servicesForm.getProjectId(this.cveProyecto).subscribe(datos => {
      let arrayPaises= [];
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

  guardar() {
    console.log(this.form.value);
    console.log(this.form.valid);
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
    console.log(this.form.value);
    // console.log(mensaje);
    // this.alertWithSuccess();
    // this.erroalert();
    return 0;
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
}
