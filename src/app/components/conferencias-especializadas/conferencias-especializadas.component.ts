import { newArray } from '@angular/compiler/src/util';
import { Component, OnInit, NgModule } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicePruebaService } from 'src/app/Services/service-prueba.service';
@Component({
  selector: 'app-conferencias-especializadas',
  templateUrl: './conferencias-especializadas.component.html',
  styleUrls: ['./conferencias-especializadas.component.css']
})
export class ConferenciasEspecializadasComponent implements OnInit {

  valor: number = 0;
  seleccion:any = {id:0,name:''};
  typeForm = new FormControl('Selecciona un formulario');
  autor = new FormControl('');
  paises = new FormControl('');
  form!: FormGroup;
  autores: String [] = [];
  lista:any[]=[];
  tiposForms  = [
        { id: 1, name: 'Artículos científicos' },
        { id: 2, name: 'Capítulos de libro científico'},
        { id: 3, name: 'Conferencias Especializadas' },
        { id: 4, name: 'Ejemplo' }
    ];

    dato: boolean = true;

  constructor(
    private servicePruebaService : ServicePruebaService
  ) {
    this.buildForm();
  }
  onSelect(id:any){
    this.valor = id;
    console.log(this.valor);
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

}
