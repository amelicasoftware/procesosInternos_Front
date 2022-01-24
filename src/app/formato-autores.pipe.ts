import { Pipe, PipeTransform } from '@angular/core';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';

@Pipe({
  name: 'formatoAutores'
})
export class FormatoAutoresPipe implements PipeTransform {
  i: number = 0;
  resultado: String = "";
  transform(value: any, args?: any): any {
    console.log("value = "+value+"  1.- "+this.resultado);
    if(value != null && value.includes('|'))
    {
      value = value.split(',');
      for(this.i=0; this.i<value.length; this.i++)
      {
        this.resultado += (value[this.i].split('-').reverse()).toString().replace(',',' ');
        if(this.i<value.length-1)
          this.resultado += ', ';
        console.log("2.- "+this.resultado);
      }
    }else{
      this.resultado = value;
    }
      return this.resultado;
  }

}
