import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from 'src/app/services/services.index';
import { Usuarios } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  public usuario: Usuarios
  constructor( 
    public _sidebar: SidebarService,
    public _usuarioService: UsuarioService
    ) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this._sidebar.cargarMenu();
  }

}
