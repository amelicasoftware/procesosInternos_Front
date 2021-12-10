import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuario;

  sesion = false;

  constructor() {
    this.usuario = localStorage.getItem("nameUser");
   }

  ngOnInit(): void {
    if(this.usuario === 'administrador'){
      this.sesion = true;
    }
  }
cerrar(){
  console.log("cerrar");
  localStorage.removeItem('nameUser');
  location.reload();
}
}
