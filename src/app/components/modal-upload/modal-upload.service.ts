import { Injectable, EventEmitter,  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;
  public oculto: string = 'oculto';
  //Este emisor se encarga de dar un aviso de que la imagen se subio por ejemplo
  public notificacion = new EventEmitter<any>();

  constructor() { 
    /* console.log('Servicio del modal listo'); */
  }

  ocultarModal(){

    this.oculto = 'oculto';
    this.tipo = null;
    this.id = null;

  }

  mostrarModal( tipo:string, id: string ){
    this.oculto = '';
    this.id = id;
    this.tipo = tipo;
  }
}
