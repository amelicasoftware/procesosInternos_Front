import { Component, OnInit } from '@angular/core';
import { ServicesFormService } from 'src/app/Services/services-form.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';



@Component({
  selector: 'app-datos-proyecto',
  templateUrl: './datos-proyecto.component.html',
  styleUrls: ['./datos-proyecto.component.css']
})
export class DatosProyectoComponent implements OnInit {
  cveProyecto: number = 0;
  proyecto: any;
  form!: FormGroup;
  pais = new FormControl('');
  lista:any[]=[];
  // autoresArr:any[]=[];
  charNoAc:string = "[^#/\"?%]+";
  autor: FormControl = this.fb.control('', [Validators.required,Validators.pattern(this.charNoAc)]);
  
  constructor(
    private servicesForm: ServicesFormService,
    private rutaActiva: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.fb.group({
      TITPROYINV: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      TPOPROYINV: new FormControl(''),
      RSMPROYINV: new FormControl(''),
      CVEPAISPRO: new FormControl([], [Validators.required, Validators.min(1)]),
      ANIOPROYINV: new FormControl('', [Validators.required, Validators.min(1980), Validators.max(2021)]),
      listAutor: this.fb.array(['prueba1', 'prueba2'], [Validators.required, Validators.min(1)]),
      URLPROYINV: new FormControl('', [Validators.required]),
      VOLPROYINV: new FormControl(''),
      FTEPROYINV: new FormControl('', [Validators.required]),
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
      INFADCPROY: new FormControl(''),
      AUTPROYINV: new FormControl(''),
      CTDINTPROY: new FormControl('1'),
    });
  }

  ngOnInit(): void {
    this.servicesForm.getPaises().subscribe(paises => {
      console.log(paises);
      this.lista = paises;
    });

    this.cveProyecto = this.rutaActiva.snapshot.params.cveProyecto;
    this.servicesForm.getProjectId(this.cveProyecto).subscribe(datos => {
      console.log(datos);
      this.proyecto = datos;
      this.form.controls.TITPROYINV.setValue(this.proyecto[0].titproyinv);
      this.form.controls.TPOPROYINV.setValue(this.proyecto[0].tpoproyinv);
      this.form.controls.RSMPROYINV.setValue(this.proyecto[0].rsmproyinv);
      console.log('paises', this.proyecto[0].cvepaispro);
      const arrayPaises = this.proyecto[0].cvepaispro.split(',');
      console.log(arrayPaises);
      this.pais.setValue(arrayPaises);
      this.form.controls.CVEPAISPRO.setValue(this.proyecto[0].cvepaispro);
      this.form.controls.ANIOPROYINV.setValue(this.proyecto[0].anioproyinv);
      this.form.controls.URLPROYINV.setValue(this.proyecto[0].urlproyinv);
      // this.form.controls.listAutor.setValue(this.proyecto[0].autproyinv);
      this.form.controls.FTEPROYINV.setValue(this.proyecto[0].fteproyinv);
      this.form.controls.VOLPROYINV.setValue(this.proyecto[0].volproyinv);
      this.form.controls.INSPROYINV.setValue(this.proyecto[0].insproyinv);
      
      this.form.controls.ALCPROYINV.setValue(this.proyecto[0].alcproyinv);
      
      this.form.controls.REAPROYINV.setValue(this.proyecto[0].reaproyinv);
      this.form.controls.AGDREDPROY.setValue(this.proyecto[0].agdredproy);

      
      this.form.controls.TPOACTPROY.setValue(this.proyecto[0].tpoactproy);
      this.form.controls.INFADCPROY.setValue(this.proyecto[0].infadcproy);

      let listaAutores = this.proyecto[0].autproyinv.split(',');

      console.log(listaAutores);

      let prueba = ['prueba1', 'prueba2'];

      this.form.controls.listAutor.setValue(prueba);
      
    });

  }

  campoEsValido(campo: string) {
    return this.form.controls[campo].errors
      && this.form.controls[campo].touched;
  }

  get autoresArr() {
    return this.form.get('listAutor') as FormArray;
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

  guardar(){
    console.log(this.form.value);
    console.log(this.form.valid);
  }

  borrar(id: number){

  };
}
