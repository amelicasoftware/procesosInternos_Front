import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit, NgModule } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicePruebaService } from 'src/app/Services/service-prueba.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  typeForm = new FormControl('Selecciona un formulario');
  autor = new FormControl('');
  paises = new FormControl('');
  form!: FormGroup;
  autores: String [] = [];
  lista:any[]=[];
  selectedCars = [3];
    cars = [
        { id: 1, name: 'Volvo' },
        { id: 2, name: 'Saab', disabled: true },
        { id: 3, name: 'Opel' },
        { id: 4, name: 'Audi' },
    ];

    dato: boolean = true;

  constructor(
    private servicePruebaService : ServicePruebaService
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.typeForm.valueChanges.subscribe( valor => {
      console.log(valor);
    });

    this.paises.valueChanges.subscribe( valor => {
      console.log(valor);
    });

    this.servicePruebaService.getPaises().subscribe( paises => {
      console.log(paises);
      this.lista = paises;
    })
  }

  private buildForm() {
    this.form = new FormGroup({
      titulo: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      tipoproinv: new FormControl('', [Validators.required]),
      resumen: new FormControl('', [Validators.required]),
      cvepais: new FormControl('', [Validators.required]),
      anio: new FormControl('', [Validators.required]),
      enlace: new FormControl('', [Validators.required]),
      volumen: new FormControl('', [Validators.required]),
      fuente: new FormControl('', [Validators.required]),
      institucion: new FormControl(''),
      autores_Padre: new FormControl(''),
      tipoparticipacion: new FormControl(''),
      integrantes: new FormControl(''),
      alcance: new FormControl('', [Validators.required]),
      periodo: new FormControl(''),
      fechaCaptura: new FormControl(''),
      realizado: new FormControl(''),
      agenda: new FormControl(''),
      tipoActividad: new FormControl(''),
      infoAdicional: new FormControl(''),
    });

    this.form.valueChanges
      .subscribe(value => {
        console.log(value);
      });
  }

  addAutor(nombre: String){
    this.autores.push(nombre);
    console.log(this.autores);
    this.autor.reset();
  }

  toggleDisabled() {
    const car: any = this.cars[1];
    car.disabled = !car.disabled;
}

}
