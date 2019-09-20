import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private url: string = "assets/css/colors/"
  ajustes: Ajuste = {
    temaUrl: "assets/css/colors/default.css",
    tema: "default"
  }

  constructor( @Inject(DOCUMENT) private _document) {
    this.cargarAjustes()
   }

  guardarAjustes(){
    /* console.log('Guardado en el localStorage'); */
    localStorage.setItem( 'ajustes', JSON.stringify( this.ajustes ))
  }
  cargarAjustes(){
    if( localStorage.getItem( 'ajustes' ) ){
      this.ajustes = JSON.parse( localStorage.getItem( 'ajustes' ) )
      /* console.log('Cargando ajustes'); */
      this.aplicarTema( this.ajustes.tema ) 
    }else{
      this.aplicarTema( this.ajustes.tema ) 
      /* console.log('Cargando ajustes por defecto'); */
    }
  }
  aplicarTema( tema: string ){
    let urlTema = this.url+`${tema}.css`
    this._document.getElementById('theme').setAttribute('href', urlTema)
    
    /* LocalStorage */
    this.ajustes.tema = tema
    this.ajustes.temaUrl = urlTema
    this.guardarAjustes( )
  }
}

interface Ajuste{
  temaUrl: string,
  tema: string
}