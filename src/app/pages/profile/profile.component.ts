import { Component, OnInit } from '@angular/core';
import { Usuarios } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/services.index';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  public usuario: Usuarios;
  public imagenSubir: File;
  public imagenTemp: any;

  constructor(
    public _usuarioService: UsuarioService
  ) { 
    this.usuario = this._usuarioService.usuario;
  }

  guardar( usuario: Usuarios ){
    this.usuario.nombre = usuario.nombre;
    if( !this.usuario.google ){
      this.usuario.email = usuario.email;
    }

    this._usuarioService.actualizarUsuario( this.usuario )
                .subscribe( resp =>{
                  console.log( resp );
                } )
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

  cambiarImagen(){
    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id )
  }

  ngOnInit() {
  }

}
