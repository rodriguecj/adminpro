import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from 'src/app/services/services.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  public imagenSubir: File;
  public imagenTemp: any;
  /* public oculto:any; */ //Esta variable se manejara desde el servicio ModalUploadService
  
  constructor(
    private _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) { 
    /* console.log('Modal Listo'); */
  }

  subirImagen(){
    
    this._subirArchivoService.subirArchivo( this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id )
        .then( res=>{
          /* console.log(res); */
          //Notificacion al servicio para indicar que la imagen fue subida
          this._modalUploadService.notificacion.emit( res );
          //Ocultamos el modal
          this.cerrarModal();

        })
        .catch( err =>{
          console.log('Error en la carga');
        } )

  }  

  cerrarModal(){
    this.imagenTemp = null;
    this.imagenSubir = null;

    this._modalUploadService.ocultarModal();
  }

  //Funcion del input cuando selecciona la imagen
  seleccionImage( archivo: File ){
    //Validando que exista un archivo
    if( !archivo ){
      //De no existe esta variable sera null
      this.imagenSubir = null;
      return;
    }
  
    //Verificacion del tipo de archivo que se sube en el input
    if( archivo.type.indexOf('image') < 0 ){
      //Aviso, no es un archivo permitido
      Swal.fire({
        title: 'Solo imagenes!',
        text: 'El archivo no es una imagen',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
      //Se mantiene en null
      this.imagenSubir = null;
      return;
    }
    /* console.log( archivo ); */
    this.imagenSubir = archivo;

    //Encode Base 64

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = ()=>{
      //Ese encode lo almacenamos en imagenTemp para mostrarlo en el template
      this.imagenTemp = reader.result
      /* console.log( reader.result ); */
    }

  }

  ngOnInit() {
  }

}
