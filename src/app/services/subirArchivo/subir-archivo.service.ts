import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo( archivo: File, tipo: string, id: string ){
      
    return new Promise( (resolve, reject) =>{

      //============================================================
      //Inicio del metodo de envio de archivo por vanilla javascript
      //============================================================
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
  
      formData.append( 'nombre', archivo, archivo.name )
      
      xhr.onreadystatechange = function(){
  
        if( xhr.readyState === 4 ){
  
          if( xhr.status === 200 ){
              console.log('Imagen subida');
              resolve( JSON.parse(xhr.response ));
          } else{
            reject( xhr.response )
          }
   
        }
  
      }


      let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

      xhr.open( 'PUT', url, true );
      xhr.send( formData );
      //============================================================
      //Fin del metodo de envio de archivo por vanilla javascript
      //============================================================
        
    });



  }
}
