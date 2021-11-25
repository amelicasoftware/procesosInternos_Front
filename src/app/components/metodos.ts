
import Swal from 'sweetalert2';
import * as moment from 'moment';

export class Metodos{
    charNoAc:string = "";
    autores: String[] = [];
    lista: any[] = [];
    dato: boolean = true;
    fecha: string = '';
    selectedCountry:any=[];
    anioAct:number=2021;
    
        
    constructor(){

    }
     static alertWithSuccess(){  
        Swal.fire('', 'guardado correctamente!', 'success')  
      }
    
      static erroalert()  
      {  
        Swal.fire({  
          icon: 'error',  
          title: 'Oops...',  
          text: 'Something went wrong!',  
          footer: '<a href>Why do I have this issue?</a>'  
        })  
      }  
      static cambioUrl(str:String): string{
        var splitted = str.split("/");
        var splitted2 = splitted.join("s-s").split("?");
        var splitted3 = splitted2.join("d-d").split("%");
        return splitted3.join("p-p");
      }
      static cambioResumen(str:String): string{
        
        let caracteres=[
            {   'signo':'/',
                'cambio':'s-s'
            },
            {   'signo':'?',
                'cambio':'d-d'
            }
        ]
        for(let x of caracteres){
            str = this.cambio(str,x.signo,x.cambio);
            
        }
        console.log(str);
        str = this.cambioUrl(str);
        var splitted = str.split("\'");
        var splitted2 = splitted.join("c-c").split("\"");
        console.log(splitted2.join("b-b"));
        return splitted2.join("b-b");
      }
      static codificar(from: string):string{
        var splitted = btoa(from).split("/");
        console.log(splitted);
        return splitted.join("s-s");
      }
      static descodificar(str:string){
        var splitted = str.split("s-s");
        str = atob(splitted.join("/"));
        return str;
      }
      static cambio(str: String, signo:string, cambio:string){
            var splitted = str.split(signo);
            return splitted.join(cambio);
      }
}