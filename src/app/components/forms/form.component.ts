import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit, NgModule } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicesFormService } from 'src/app/Services/services-form.service';
import Swal from 'sweetalert2';

@Component({
  selector:'app-form',
  templateUrl:'./form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  valor: number = 0;
  seleccion:any = {id:0,name:''};
  typeForm = new FormControl('Selecciona un formulario');
  charNoAc:string = "[^#/\"?%]+";
  autor: FormControl = this.fb.control('', [Validators.required,Validators.pattern(this.charNoAc)]);
  pais = new FormControl('');
  form!: FormGroup;
  autores: String [] = [];
  lista:any[]=[];
  tiposForms  = [
        { id: 1, name: 'Libros científicos' },
        { id: 2, name: 'Capítulos de libro científico'},
        { id: 3, name: 'Conferencias Especializadas' },
        { id: 4, name: 'Artículos de divulgación' },
        { id: 5, name: 'Libros de divulgación' },
        { id: 6, name: 'Otras actividades' },
        { id: 7, name: 'Redes de investigación' },
        { id: 8, name: 'Ejemplo' }
    ];

    dato: boolean = true;

  constructor(
    private servicesForm: ServicesFormService,
    private fb: FormBuilder
  ) {
    this.buildForm();
  }
  onSelect(id:any){
    this.valor = id;
    console.log(this.valor);
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
  campoEsValido( campo: string ) {
    return this.form.controls[campo].errors 
            && this.form.controls[campo].touched;
  }
  
  private buildForm() {
    this.form = this.fb.group({
      TITPROYINV: new FormControl('prueba', [Validators.required, Validators.maxLength(100),Validators.pattern(this.charNoAc)]),
      TPOPROYINV: new FormControl('Artículos científicos'),
      RSMPROYINV: new FormControl('',Validators.pattern(this.charNoAc)),
      CVEPAISPRO: new FormControl([], [Validators.required, Validators.min(1)]),
      ANIOPROYINV: new FormControl('', [Validators.required, Validators.min(1980), Validators.max(2021)]),
      listAutor: this.fb.array([], [Validators.required, Validators.min(1)]),
      URLPROYINV: new FormControl('', [Validators.required, Validators.maxLength(200),Validators.pattern("http[s]?:(\/\/|s-ss-s).+")]),
      VOLPROYINV: new FormControl('',Validators.pattern(this.charNoAc)),
      FTEPROYINV: new FormControl('', [Validators.required,Validators.pattern(this.charNoAc)]),
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
      INFADCPROY: new FormControl('',Validators.pattern(this.charNoAc)),
      AUTPROYINV: new FormControl(''),
      CTDINTPROY: new FormControl('1'),
    });

    // this.form.valueChanges
    //   .subscribe(value => {
    //     console.log(value);
    //   });
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

  borrar(i: number) {
    this.autoresArr.removeAt(i);
  }

  guardar() {

    console.log(this.autoresArr.value);
    console.log(this.paisesArr?.value);
    this.form.controls.URLPROYINV.setValue(this.cambioUrl(this.form.controls.URLPROYINV.value));
    this.form.controls.AUTPROYINV.setValue(this.autoresArr.value.join(','));
    this.form.controls.CVEPAISPRO.setValue(this.paisesArr?.value.join(','));

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // imprimir el valor del formulario, sólo si es válido
    this.servicesForm.postDatos(this.form).subscribe(mensaje => {
      console.log(mensaje);
      if(mensaje !== null){
        if(mensaje.respuesta === 'true'){
          this.limpiar();
          this.alertWithSuccess();
        }else{
          this.erroalert();
        }
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
  cambioUrl(str:String): string{
    var splitted = str.split("/");
    var splitted2 = splitted.join("s-s").split("?");
    var splitted3 = splitted2.join("d-d").split("%");
    return splitted3.join("p-p");
  }
  limpiar(){
    //this.form.reset();
    this.buildForm();
  }
}
