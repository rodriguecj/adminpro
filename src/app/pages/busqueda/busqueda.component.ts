import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuarios } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  public usuarios: Usuarios[] = [];
  public medicos: Medico[] = [];
  public hospitales: Hospital[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) { 
    activatedRoute.params.subscribe( params=> {
      let termino = params['termino'];
      this.buscar( termino );
      /* console.log(params.termino); */
    } )
  }

  buscar( termino: string ) {
    //localhost:3000/busqueda/todo/a
    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this.http.get( url )
      .subscribe( (res: any) =>{
        console.log( res );
        this.usuarios = res.usuarios;
        this.medicos = res.medicos;
        this.hospitales = res.hospitales
      } )
  }

  ngOnInit() {
  }

}
