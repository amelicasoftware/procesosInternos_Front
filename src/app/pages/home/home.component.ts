import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nombreForm: String = '';

  constructor() { }

  ngOnInit(): void {
  }

  form(nombre: String){
    console.log(this.nombreForm);
    this.nombreForm = nombre;
  }

}
