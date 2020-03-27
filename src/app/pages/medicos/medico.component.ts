import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService, MedicoService } from 'src/app/services/services.index';
import { Medico } from '../../models/medico.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {


  public hospitales: Hospital[] = [];
  public medico: Medico = new Medico( '', '', '', '', '');
  public hospital: Hospital = new Hospital( '')

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {

    activatedRoute.params.subscribe( params => {

      /* console.log( params ); */
      let id = params['id']

      if( id !== 'nuevo' ){
        this.cargarMedico( id )
      }
    } )

   }

  ngOnInit() {
    this._hospitalService.cargarHospitales()
        .subscribe( hospitales => this.hospitales = hospitales );

    this._modalUploadService.notificacion
        .subscribe( res => {
          /* console.log( res ); */
          this.medico.img = res.medico.img;
        } )
  }

  cargarMedico( id: string ){
    this._medicoService.cargarMedico( id )
          .subscribe( medico=> {
            this.medico = medico
            this.medico.hospital = medico.hospital._id;
            this.cambioHospital( this.medico.hospital )
          })
  }

  cambioHospital( id ){
    this._hospitalService.obtenerHospital( id )
    .subscribe( hospital=> this.hospital = hospital )

  }

  guardarMedico( f: NgForm ){

   /*  console.log( f.value);

    console.log( f.valid ); */

    if( !f.valid ){
        return;
    }

    this._medicoService.guardarMedico( this.medico )
        .subscribe( medico =>{
          this.medico = medico
          /* console.log( medico ); */
          this.router.navigate(['/medico', medico._id])
        } )


  }

  cambiarFoto(){
    
    this._modalUploadService.mostrarModal( 'medicos', this.medico._id );

  }

}
