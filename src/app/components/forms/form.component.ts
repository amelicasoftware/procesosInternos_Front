import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit, NgModule } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicePruebaService } from 'src/app/Services/service-prueba.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  typeForm = new FormControl('Selecciona un formulario');
  autor: FormControl = this.fb.control('', Validators.required );
  pais = new FormControl('');
  form!: FormGroup;
  autores: String [] = [];
  lista:any[]=[];
  dato: boolean = true;

  constructor(
    private servicePruebaService : ServicePruebaService,
    private fb: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.typeForm.valueChanges.subscribe( valor => {
      console.log(valor);
    });

    this.pais.valueChanges.subscribe( valor => {
      console.log(valor);
      this.paisesArr?.setValue(valor);
    });

    this.servicePruebaService.getPaises().subscribe( paises => {
      console.log(paises);
      this.lista = paises;
    });
  }

  private buildForm() {
    this.form = this.fb.group({
      TITPROYINV: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      TPOPROYINV: new FormControl(''),
      RSMPROYINV: new FormControl(''),
      CVEPAISPRO: new FormControl([], [Validators.required, Validators.min(1)] ),
      ANIOPROYINV: new FormControl('', [Validators.required, Validators.min(1980), Validators.max(2021)]),
      AUTPROYINV: this.fb.array([], [Validators.required, Validators.min(1)] ),
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
      REAPROYINV: new FormControl(''),
      AGDREDPROY: new FormControl(''),
      TPOACTPROY: new FormControl(''),
      INFADCPROY: new FormControl('')
    });

    // this.form.valueChanges
    //   .subscribe(value => {
    //     console.log(value);
    //   });
  }

  campoEsValido( campo: string ) {
    return this.form.controls[campo].errors 
            && this.form.controls[campo].touched;
  }

  get autoresArr() {
    return this.form.get('AUTPROYINV') as FormArray;
  }

  get paisesArr(){
    return this.form.get('CVEPAISPRO');
  }

  addAutor(nombre: String){
    this.autoresArr.push( this.fb.control(this.autor.value, Validators.required ) );    
    console.log(this.autoresArr.length);
    this.autor.reset();
  }

  borrar( i: number ) {
    this.autoresArr.removeAt(i);
  }

  guardar() {
    
    if ( this.form.invalid ) {
      this.form.markAllAsTouched();
      return;
    }

    // imprimir el valor del formulario, sólo si es válido
    console.log(this.form.value);
  }
}
