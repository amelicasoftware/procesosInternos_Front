import { Component, OnInit } from '@angular/core';
import { ServicesFormService } from 'src/app/Services/services-form.service';

@Component({
  selector: 'app-validacion',
  templateUrl: './validacion.component.html',
  styleUrls: ['./validacion.component.css']
})
export class ValidacionComponent implements OnInit {

  lista: any[] = [];

  constructor(
    private servicesForm: ServicesFormService,
  ) { }

  ngOnInit(): void {
    this.servicesForm.getAllProjects().subscribe(paises => {
      console.log(paises);
      this.lista = paises;
    });
  }

}
