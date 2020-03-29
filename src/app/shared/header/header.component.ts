import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/services.index';
import { Usuarios } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
    
  public usuario: Usuarios

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  buscar( termino: string){
    /* console.log( termino ); */
    this.router.navigate([ '/busqueda', termino ])
  }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

}
