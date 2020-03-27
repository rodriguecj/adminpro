import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import Swal from 'sweetalert2';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  public totalMedicos: number = 0;

  constructor(
    private http: HttpClient,
    private _usuarioService: UsuarioService
  ) { }

  cargarMedicos(){
    let url = URL_SERVICIOS + '/medico';


    return this.http.get( url )
          .pipe(
            map( (res: any ) =>{
              this.totalMedicos = res.total
              return res.medicos;
            }
            )
          )

  }

  cargarMedico( id: string ){
      let url = URL_SERVICIOS + '/medico/' + id;
      return this.http.get( url )
              .pipe( 
                map( (res: any)=> res.medico )
               )
  }

  buscarMedicos( termino: string ){

    let url = URL_SERVICIOS + '/busqueda/coleccion/medico/' + termino;

    return this.http.get( url )
              .pipe(
                map( ( res: any )=>{
                    return res.medico
                } )
              )

  }

  borrarMedico( id: string ){
    let token = this._usuarioService.token;
    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + token 

    return this.http.delete( url )
                .pipe( 
                  map( ( res: any ) => {

                    Swal.fire('Medico Borrado', 'Medico borrado correctamente', 'success')

                    return res;
                  } )
                 )

  }

  guardarMedico( medico: Medico ){
    let token = this._usuarioService.token;
    let url = URL_SERVICIOS + '/medico';
    

    if( medico._id ){
      //Actualizar
      url += '/' + medico._id;
      url += '?token=' + token;

      return this.http.put( url, medico )
            .pipe(
              map( (res: any)=>{

                Swal.fire( 'Medico actualizado', medico.nombre, 'success' )
                return res.medico
              } )
            )



    }else{
      //creando
      url += '?token=' + token;
      return this.http.post( url, medico )
                .pipe( 
                  map( ( res: any )=>{
                      
                    Swal.fire( 'Medico Creado', medico.nombre, 'success' )
                    return res.medico
                  } )
                  )
    }

    

  }

}
