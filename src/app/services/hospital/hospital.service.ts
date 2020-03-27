import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';
import { Hospital } from '../../models/hospital.model';


@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  
  totalHospitales: number = 0;

  constructor(
    private _http: HttpClient,
    private _usuarioService: UsuarioService
  ) { 
    /* console.log('Servicio hospitales'); */
  }

  cargarHospitales(){
    let url = URL_SERVICIOS;
    url += '/hospital'

    return this._http.get( url )
      .pipe(
        map( 
          (res: any)=>{
            this.totalHospitales = res.total;
            return res.hospitales;
          }
         )
      );

  }

  obtenerHospital( id: string ){
    let url = URL_SERVICIOS;
    url += '/hospital/' + id

    return this._http.get( url )
        .pipe(
          map( (res: any)=> res.hospital )
        );
  }

  borrarHospital( id: string ){
    let token = this._usuarioService.token
    let url = URL_SERVICIOS;
    url += '/hospital/' + id + '?token=' + token;

    return this._http.delete( url )
          .pipe(
            map( res => {
              Swal.fire({
                title: 'Hospital eliminado!',
                text: 'Hospital eliminado correctamente',
                icon: 'success',
                confirmButtonText: 'Cool'
              })
            } )
          )

  }

  crarHospital( nombre: string ){
    let token = this._usuarioService.token
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + token;

    return this._http.post( url, { nombre } )
          .pipe(
            map( ( res: any )=> res.hospital )
          )
  }

  buscarHospital( termino: string ){
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospital/' + termino;
    return this._http.get( url )
    .pipe(
      map( ( res: any )=> res.hospital )
    );
  }

  actualizarHospital( hospital: Hospital ){
    let token = this._usuarioService.token
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + token
      
    return this._http.put( url, hospital )
                .pipe(
                  map( ( res: any )=> {
                    Swal.fire({
                      title: 'Hospital actualizado!',
                      text: 'Hospital actualizado correctamente',
                      icon: 'success',
                      confirmButtonText: 'Cool'
                    })
                    return res.hospital
                  } )
                );
  }

}
