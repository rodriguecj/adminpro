import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/services.index';
import { Usuarios } from '../models/usuario.model';

declare function init_pluging()
//google api
declare const gapi: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  public recuerdame: boolean = false;
  public email: string;
  public auth2: any; //Variable para google
  constructor( 
    private router: Router,
    private _usuarioService: UsuarioService,
    public _ngZone: NgZone
    ) { }

  ngOnInit() {
    init_pluging();

    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if( this.email.length > 1 ){
      this.recuerdame = true
    }
  }

  googleInit(){

    gapi.load( 'auth2', ()=>{
      this.auth2 = gapi.auth2.init({
        client_id: '880049540704-uu0brg4vr0t4nq5iar4i3j82b2o086k4.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      })
      //Estamos enlazando la funcion al boton mediante el ID
      this.attachSignin( document.getElementById( 'btnGoogle' ) );
    } );
  }

  attachSignin( element ){
    
    let token

    this.auth2.attachClickHandler( element, {}, (googleUser)=>{
        //Datos basicos del usuario
        /* let profile = googleUser.getBasicProfile(); */

        token = googleUser.getAuthResponse().id_token;

        //Enviar una peticion post al backend

        this._usuarioService.loginGoogle( token )
            /*
            *Hacerlo de esta manera activaba el navigate fuera de la zona de angular, warning
            .subscribe( correcto=> this.router.navigate( ['/dashboard'] )) 
            *Tambien se puede solventar con vanilla js, window.location.href = '/dashboard'
            */
            .subscribe( () => this._ngZone.run(() => this.router.navigate(['/dashboard'])) )
        /* console.log( token ); */
    } )

  }

  ingresar( form: NgForm ){

    //Si el formulario no es valido no hacer mas nada
    if( form.invalid ){
      return;
    }

    //Usuario
    let usuario = new Usuarios( null, form.value.email, form.value.password)

    //Peticion http para hacer login de usuario
    this._usuarioService.login( usuario, form.value.recuerdame )
        .subscribe( correcto=> this.router.navigate( ['/dashboard'] ) )

    /* console.log('Form Valido: ', form.valid);
    console.log("Ingresando", form); */
    /* this.router.navigate(['/dashboard']) */
  }
}
