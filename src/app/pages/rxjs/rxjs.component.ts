import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';

import { retry, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscripcion: Subscription
  
  constructor() { 
  
    this.subscripcion = this.regresaObservable()/* .pipe(
      retry( 2 )
    ) */
    .subscribe( 
      numero => console.log( 'Subs: ', numero ),
      error => console.error( 'Error en el obs', error ),
      () =>  console.log( 'El Observador termino' )
   )

  }

  ngOnInit() {
  }
  ngOnDestroy(){
    this.subscripcion.unsubscribe()
    console.log( 'La pagina se va a cerrar' )
  }

  regresaObservable(): Observable<any> {
    return new Observable( (observer: Subscriber<any>) => {
      let contador = 0
      let intervalo = setInterval( () =>{
        contador += 1

        let salida = {
          valor: contador
        }

        observer.next( salida );

        /* if( contador === 3 ){
          clearInterval( intervalo );
          observer.complete();  //Se completa el observer
        } */
        /* if( contador === 2 ){ 
          clearInterval( intervalo );
          observer.error( 'Auxilio' )
        } */
      }, 1000 )
    }).pipe(
      map( data => {
        return data.valor
      } ),
      filter( ( data )=>{
        if( data % 2 ){
          return true
        }else{
          return false
        }
      })
    )
  }
}
