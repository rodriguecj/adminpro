import { Injectable } from '@angular/core';
import { Usuarios } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario: Usuarios;
  public token: string;

  constructor(
    public http: HttpClient,
    private router: Router
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

}
