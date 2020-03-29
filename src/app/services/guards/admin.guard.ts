import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(
    public _usuarioService: UsuarioService,
  ){

  }

  canActivate(){

    if( this._usuarioService.usuario.role === 'ADMIN_ROLE' ){
      return true;
    }else{
      /* console.log('Usuario bloqueado'); */
      this._usuarioService.logOut()
      return false;
    }
  }
  
  
}
