import { Injectable } from '@angular/core';
import { Usuarios } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuarios;
  public token: string;

  constructor(
    public http: HttpClient,
    private router: Router,
    public _subirArchivoService: SubirArchivoService
  ) { 
    this.cargarStorage();
  }

  estaLogueado(){
    return ( this.token.length > 5 ) ? true : false;
  }


  cargarStorage(){
    if( localStorage.getItem( 'token' ) ){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage( id: string, token: string, usuario: Usuarios ){

    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify(usuario) );
    
    this.usuario = usuario;
    this.token = token;

  }


  logOut(){
    this.usuario = null;
    this.token = ''; 
    localStorage.removeItem('token')
    localStorage.removeItem('usuario');
    this.router.navigate(['/login'])
  }

  loginGoogle( token ){

    let url = URL_SERVICIOS + '/login/google';
      
    return this.http.post( url, { token } )
            .pipe(
              map( (res: any)=>{
                this.guardarStorage( res.id, res.token, res.usuario )
                return true
              } )
            )

  }


  login( usuario: Usuarios, recordar: boolean = false ){

    if( recordar ){
      localStorage.setItem('email', usuario.email);
    }else{
      localStorage.removeItem('email')
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post( url, usuario )
              .pipe(
                map( (res: any)=>{

                  this.guardarStorage( res.id, res.token, res.usuario )
                  /* localStorage.setItem( 'id', res.id );
                  localStorage.setItem( 'token', res.token );
                  localStorage.setItem( 'usuario', JSON.stringify(res.usuario) ); */

                  return true
                } )
              )
  }


  crearUsuario( usuario: Usuarios ){

    let url = URL_SERVICIOS + '/usuario';
    
    //Esta es la peticion post
    return this.http.post( url, usuario )
            .pipe(
              map(
                ( res: any ) => {
                  
                  Swal.fire({
                    title: 'Usuario creado!',
                    text: res.email,
                    icon: 'success',
                    confirmButtonText: 'Cool'
                  })
         
                  return res.usuario;
                }
              )

            )

  }

  actualizarUsuario( usuario: Usuarios ){
    
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    //Hay que mandar el token
    url += '?token=' + this.token;

    /* console.log(url); */

    return this.http.put( url, usuario )
                .pipe(
                  map( (res: any)=>{
                    
                    if( usuario._id  === this.usuario._id ){
                      
                      let usuarioDB: Usuarios = res.usuario;
                      this.guardarStorage( usuarioDB._id, this.token, usuarioDB )

                    }

                    Swal.fire({
                      title: 'Usuario Actualizado!',
                      text: res.nombre,
                      icon: 'success',
                      confirmButtonText: 'Cool'
                    })
                    return true
                  } )
                )


  }

  cambiarImagen( archivo: File, id: string ){
      //llamamos al servicio que cambia la img
    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
        .then( (res: any)=>{
          //Recibimos la respuesta y almacenamos la img en el objeto usuario
          this.usuario.img = res.usuario.img;

          //Enviamos una notificacion al usuario de que se guardo la img
          Swal.fire({
            title: 'Imagen Actualizado!',
            text: res.usuario.nombre,
            icon: 'success',
            confirmButtonText: 'Cool'
          })
          //Actualizar localStorage
          this.guardarStorage( id, this.token, this.usuario )
          console.log( res );
        } )
        .catch( res=>{
          console.log( res );
        } )

  }

  cargarUsuarios( desde: number = 0){
    
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get( url ); 

  }

  buscarUsuario( termino: string ){

    let url = URL_SERVICIOS + '/busqueda/coleccion/usuario/' + termino;
    return this.http.get( url );

  }

  borrarUsuario( id: string ){
    
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete( url );

  }

}
