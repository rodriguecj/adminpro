import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioService } from '../services/services.index';

/* Modelo */
import { Usuarios } from '../models/usuario.model';

declare function init_pluging()

import Swal from 'sweetalert2'
/* import SweetAlert from 'sweetalert'; */

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ["./login.component.css"]
})
export class RegisterComponent implements OnInit {

  //Declaracion del formulario reactivo
  public forma: FormGroup


  constructor(
    private _usuarioService: UsuarioService,
    private router: Router
  ) { }

  sonIguales( campo1: string, campo2: string ){
    
    //Esta validacion Fn debe returnar una funcion
    return ( group: FormGroup ) =>{
        let pass1 = group.controls[campo1].value;
        let pass2 = group.controls[campo2].value;
      
        if( pass1 === pass2 ){
          return null;
        }
        
        return {
          //Indica que si existe un error, se crea un objeto y se coloca en true para que asi aparezca en los errores
          noSonIguales: true
        }

    }

  }

  ngOnInit() {
    init_pluging()
    
    //Inicio del formulario
    this.forma = new FormGroup({

    'nombre': new FormControl( '', Validators.required ),
    'correo': new FormControl(  '', [Validators.required, Validators.email] ),
    'password': new FormControl( '', Validators.required ),
    'password2': new FormControl( '', Validators.required ),
    'condiciones': new FormControl( false ),

    }, { validators: this.sonIguales( 'password', 'password2' ) })

    //Aca estamos seteando valores predeterminados al formulario
    this.forma.setValue({
      'nombre': 'test',
      'correo': 'test@gmail.com',
      'password': '123',
      'password2': '123',
      'condiciones': true,
    })

  }

  registrarUsuario(){
    
    if( this.forma.invalid ){
      return;
    }
    if( !this.forma.value.condiciones ){
      console.log('Debe de aceptar las condiciones');
      /* swal("Importante!!!", "Debe de aceptar las condiciones", "warning"); */
      Swal.fire({
        title: 'Importante!',
        text: "Debe de aceptar las condiciones",
        icon: 'warning',
        confirmButtonText: 'Cool'
      })

      return;
    }

    /* console.log('Forma Valida:',this.forma.valid );
    console.log(this.forma); */

    /* Hacer la peticion post en caso que sea valido el formulario */
    //Usuario nuevo
    let usuario = new Usuarios(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    )
    //Envio de datos al post para crear usuario
    this._usuarioService.crearUsuario( usuario )
        .subscribe( res=>{
          console.log( res );
          this.router.navigate( ['/login'] )
        } )

  }
}
