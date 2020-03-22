import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuarios'): any {
    
    /* console.log( img, tipo); */

    let url = URL_SERVICIOS + '/img';

    //Valida si img regresa un undefined
    if( !img ){
      //Retornamos la img por defecto
      return url += '/usuarios/xxx';
    }
    
    //Valida si la img posee https, si es asi es una usuario creado por google
    if( img.indexOf( 'https' ) >= 0  ){
      return img;
      //Retornamos la img tal cual la recibimos
    }

    //Validamos el tipo

    switch( tipo ){

      case 'usuarios':
        url += '/usuarios/' + img; 
      break;

      case 'medicos':
        url += '/medicos/' + img;
      break;

      case 'hospitales':
        url += '/hospitales/' + img;
      break;

      default:
        /* console.log('El tipo de img no existe'); */
        url += '/usuarios/xxx';
    }

    return url;
  }

}
