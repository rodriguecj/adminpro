import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from 'src/app/services/services.index';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {

  public medicos: Medico[] = [];

  constructor(
    public _medicosService: MedicoService
  ) {
    this.cargarMedicos();
   }

  buscarMedico( termino: string  ){

    if( termino.length >=0  ){
        this.cargarMedicos();
        return;
    }
    /* console.log( termino); */
      this._medicosService.buscarMedicos( termino )
          .subscribe( medicos => {
                        /* console.log(medicos); */
                        this.medicos = medicos
                      } )
  }

  crearMedico(){

  }

  cargarMedicos(){

    this._medicosService.cargarMedicos()
        .subscribe( medicos => {
          this.medicos = medicos
          /* console.log( this.medicos ); */
        } )

  }



  editarMedico( medico ){

  }

  borrarMedico( medico: Medico){
      
      this._medicosService.borrarMedico( medico._id )
            .subscribe( ()=> this.cargarMedicos()   )
  }  

  ngOnInit( ) {
    
  }

}
