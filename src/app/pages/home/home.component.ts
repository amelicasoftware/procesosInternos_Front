import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nombreForm: String = 'Artículo científico';
  url = environment.url;

  constructor() { }

  ngOnInit(): void {
    let loacalitems = localStorage.getItem("nameUser");
    if (loacalitems === 'administrador') {
      console.log('eres admin');
    } else {
      window.location.href = this.url + "loggin";
      localStorage.removeItem('nameUser');
      console.log('no eres admin');
    }

  }

  form(nombre: String){
    console.log(this.nombreForm);
    this.nombreForm = nombre;
  }

}
