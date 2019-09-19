import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild( 'txtProgress', {static: false} ) txtProgress: ElementRef;

  @Input( "nombre" ) leyenda: string = "Leyenda"
  @Input(  )  porcentaje: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  onChanges( event: number ){
     /* console.log( this.txtProgress);  */
    if( event >= 100 ){
       this.porcentaje = 100
    }else if( event <= 0 ){
       this.porcentaje = 0
    }else{
       this.porcentaje = event
    }
    /* console.log(this.txtProgress) */
    this.txtProgress.nativeElement.value = this.porcentaje
    this.cambioValor.emit( this.porcentaje )
    console.log( event )
  }

  cambiarValor( valor ){
    if( this.porcentaje >= 100 && valor > 0){
      this.porcentaje = 100
      return;
    }
    if( this.porcentaje <= 0 && valor < 0){
      this.porcentaje = 0
      return;
    }
    this.porcentaje = this.porcentaje + valor;
    this.cambioValor.emit( this.porcentaje )
    this.txtProgress.nativeElement.focus() //Enfoca el elemento
  }
}
