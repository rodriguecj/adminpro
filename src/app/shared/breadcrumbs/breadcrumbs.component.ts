import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  public titulo = "";
  constructor( private route: Router, private _title: Title, private meta: Meta ) { 
    
    this.getDataRoute().subscribe( event => {
      /* console.log( event, "Este es el evento de la ruta" ); */
      this.titulo = event.titulo
      console.log(this.titulo)
      this._title.setTitle( this.titulo );
      const metaTag: MetaDefinition = {
        name: "description",
        content: this.titulo
      }
      this.meta.updateTag( metaTag )
    } );
  }

  ngOnInit() {
  }
  getDataRoute(){
    return this.route.events
    .pipe(
      filter( evento => evento instanceof ActivationEnd ),
      filter( (evento: ActivationEnd) => evento.snapshot.firstChild == null ),
      map( (event: ActivationEnd) => {
         return event.snapshot.data
      } )
    )
  }
}
