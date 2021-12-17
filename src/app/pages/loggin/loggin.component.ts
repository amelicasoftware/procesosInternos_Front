import { Component, OnInit } from '@angular/core';
import { LogginService } from 'src/app/Services/loggin.service';
import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.component.html',
  styleUrls: ['./loggin.component.css']
})
export class LogginComponent implements OnInit {
  user= {"name":"",
                "password":"",
    };
    data:any;
    respuesta="";
    banLoggin="false";
    nameUser=(localStorage["nameUser"]=="usuario" || localStorage["nameUser"]=="administrador") ? localStorage["nameUser"] : "";
  constructor(private service :LogginService) { 
  }

  ngOnInit(): void {
    if(this.nameUser!=""){
      Swal.fire({  
        position: 'center',  
        icon: 'success',  
        title: 'Se ha realizado una autenticación con éxito, Bienvenido '+this.nameUser,  
        showConfirmButton: false,  
        timer: 2500  
      });
    $(document).ready(function(){
      setTimeout(function(){
            window.location.href = "http://127.0.0.1:4200/#/home";
          },700);
    });
    }
  }
  prepareSearch(){
    console.log("para iniciar session:::"+this.user.name+" :: "+this.user.password);
    this.service.getDataSession(this.user).then(res=>{
      var str=JSON.stringify(res);
      
      this.data=JSON.parse(str);
      this.respuesta=this.data.tipo;
      var tipoUser=this.respuesta=="normal" ? "usuario" : this.respuesta=="admin" ? "administrador" : "error";
      console.log(this.data);
      console.log("respuesta al entrar::"+this.respuesta);
      if(tipoUser=="usuario"){
          Swal.fire({  
          position: 'center',  
          icon: 'success',  
          title: 'Se ha realizado con éxito una autenticación de usuario estandar',  
          showConfirmButton: false,  
          timer: 2500  
        });
      }
      else if(tipoUser=="administrador"){
          Swal.fire({  
          position: 'center',  
          icon: 'success',  
          title: 'Se ha realizado una autenticación con éxito, Bienvenido '+tipoUser,  
          showConfirmButton: false,  
          timer: 2500  
        });
      }
      else if(tipoUser=="error"){
        Swal.fire({  
        position: 'center',  
        icon: 'error',  
        title: 'no se pudo realizar la autenticación, verifica los datos de inicio de sesion',  
        showConfirmButton: false,  
        timer: 2500  
      });
    }
    var NGinstance=this;
    $(document).ready(function(){
      setTimeout(function(){
          localStorage.setItem("nameUser",tipoUser);
          if(NGinstance.respuesta=="normal"){
            window.location.href = "http://127.0.0.1:4200/#/home";
          }else if(NGinstance.respuesta=="admin"){
            window.location.href = "http://127.0.0.1:4200/#/home";
          }
        },3000);
      });
    });
  }
  eventHandler(event:any) {
    if(event.keyCode===13){
      this.prepareSearch();
      console.log(event, event.keyCode, event.keyIdentifier);
    }
    
  }
  touchSearch(){
    this.banLoggin=this.banLoggin=="false" ? "true" : this.banLoggin=="true" ? "false" : this.banLoggin;
    var NGinstance=this;
    $(document).ready(function(){
      /*if(NGinstance.banLoggin=="true"){
        $(".box").addClass("is-danger");
      }else{ 
        $(".box").removeClass("is-danger");
      }*/
    });
  }
}
