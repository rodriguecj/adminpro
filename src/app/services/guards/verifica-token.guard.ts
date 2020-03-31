import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {
  
  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ){}
    

  canActivate():
     Promise<boolean | UrlTree> | boolean | UrlTree {

       console.log('Inicio de TokenGuard');

       let token = this._usuarioService.token;
  
       let payload = JSON.parse( atob( token.split('.')[1] ) );
      
       let expirado = this.expirado( payload.exp ); //Devuelve el valor booleano de la funcion

       if( expirado ){//Si es true no permitimos acceder a la pagina
          this.router.navigate(['/login']);
          return false;
       }



      console.log(payload);

      /* this.verificaRenueva( payload.exp ) */
    return this.verificaRenueva( payload.exp );
  }

  verificaRenueva( fechaExp: number ): Promise<boolean>{

    return new Promise( ( resolve, reject )=>{

      let tokenExp = new Date( fechaExp * 1000 );
      let ahora = new Date();

      ahora.setTime( ahora.getTime() + ( 1 * 60 *60 *1000 ) );
      
      /* console.log( ahora.getTime() );
      console.log( tokenExp.getTime() ); */

      if( tokenExp.getTime() > ahora.getTime() ){
        resolve( true );
      }else{

        this._usuarioService.renuevaToken()
              .subscribe( ()=>{
                resolve(true);
              }, ()=>{
                this.router.navigate(['/login']);
                reject( false );
              }
              )
      }
    } )

  }

  expirado( fechaExp: number ){

    let ahora = new Date().getTime() / 1000;
  
    if( fechaExp < ahora ){//Esto quiere decir que ya el token no sirve
        return true;
    }else{
      return false;
    }

  }
  
}
