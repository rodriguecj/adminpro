import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  
  public hospitales: Hospital[] = [];

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarHospitales();

    //Observable que esta a la escucha si se cargo la imagen
    this._modalUploadService.notificacion
        .subscribe( ()=> this.cargarHospitales() )
  }

  buscarHospital( termino: string ){

    if( termino.length <= 0 ){
      this.cargarHospitales();
      return;
    }

    this._hospitalService.buscarHospital( termino )
        .subscribe( hospitales => this.hospitales = hospitales )

  }

  cargarHospitales(){
    this._hospitalService.cargarHospitales().subscribe(
      res=>{
        /* console.log( res ); */
        this.hospitales = res;
      }
    )
  }

  guardarHospital( hospital: Hospital ){
    this._hospitalService.actualizarHospital( hospital )
          .subscribe( )
  }

  borrarHospital( hospital: Hospital ){
    
    this._hospitalService.borrarHospital( hospital._id )
        .subscribe( ()=> this.cargarHospitales() );
  }

  crearHospital(){

    Swal.fire({
      title: 'Crear hospital!',
      input: 'text',
      icon: 'info',
      confirmButtonText: 'Crear',
      showCancelButton: true
    }).then( valor=>{
      if( !valor.value || valor.value.length === 0 ){
        return;
      }
      console.log(valor)
      this._hospitalService.crarHospital( valor.value )
        .subscribe( () => this.cargarHospitales() )
    } )

  }

  actualizarImagen( hospital: Hospital ){

    this._modalUploadService.mostrarModal( 'hospitales', hospital._id )

  }

}
