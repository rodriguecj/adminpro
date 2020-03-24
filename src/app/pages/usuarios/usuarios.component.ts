import { Component, OnInit } from '@angular/core';
import { Usuarios } from '../../models/usuario.model';
import { UsuarioService } from '../../services/services.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public usuarios: Usuarios[] = [];
  public desde: number = 0;

  public totalRegistros: number = 0;
  public cargando: boolean = true;

  constructor( 
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
     ) { }

  ngOnInit() {
    this.cargarUsuarios();

    //Esta funcion se mantiene suscrita a los cambios de emisor
    this._modalUploadService.notificacion.subscribe( res =>{
      this.cargarUsuarios();
    } )
  }

  mostrarModal( id: string ){

    this._modalUploadService.mostrarModal( 'usuarios', id )

  }

  cargarUsuarios(){
    this.cargando = true;
    this._usuarioService.cargarUsuarios( this.desde )
        .subscribe( ( res:any ) => {
          /* console.log( res ); */

          this.totalRegistros = res.total;
          this.usuarios = res.usuarios;
          this.cargando = false;
        } )

  }

  cambiarDesde( valor: number ){
    
    let desde = this.desde + valor;
    /* console.log(desde); */
  
    if( desde >= this.totalRegistros ){
      return;
    }
    if( desde < 0 ){
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }

  buscarUsuario( termino: string ){
      console.log( termino );

      //Valida si existe algo en termino, para que no de undefined
      if( termino.length <= 0 ){
          this.cargarUsuarios();
          return;
      }

      this.cargando = true;
      this._usuarioService.buscarUsuario( termino )
          .subscribe( (res: any) =>{
            console.log( res );
            this.usuarios = res.usuario
            this.cargando = false;
          } )
  }


  borrarUsuario( usuario: Usuarios ){
    console.log(usuario);

    if( usuario._id === this._usuarioService.usuario._id ){
      Swal.fire({
        title: 'No se puede borrar usuario!',
        text: 'No se puede borrar asi mismo',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
      return;
    }

    Swal.fire({
      title: 'Esta seguro?',
      text: "Esta a punto de borrar a "+ usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar!'
    }).then((result) => {
      if (result.value) {

        this._usuarioService.borrarUsuario( usuario._id )
          .subscribe( res=>{
            console.log( res );

            Swal.fire(
              'Borrado!',
              'El usuario ha sido borrado.',
              'success'
            )

            this.cargarUsuarios();

          } )
      
      
      }
    })

  }

  guardarUsuario( usuario: Usuarios ){
    
    this._usuarioService.actualizarUsuario( usuario )
        .subscribe();
  }

}
