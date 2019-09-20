import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingService } from '../../services/services.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {
  /* private url: string = "assets/css/colors/" */
  constructor( 
        @Inject(DOCUMENT) private _document, 
        private _ajustes: SettingService
  ) { }
  
  ngOnInit() {
    this.colocarCheck()
  }

  cambiarColor( tema, link ){
    /* console.log(tema); */
    /* console.log(link); */
    this.aplicarCheck( link )
    this._ajustes.aplicarTema( tema )

/*     let urlTema = this.url+`${tema}.css`
    this._document.getElementById('theme').setAttribute('href', urlTema)
    
    // LocalStorage 
    this._ajustes.ajustes.tema = tema
    this._ajustes.ajustes.temaUrl = urlTema
    this._ajustes.guardarAjustes( ) */

  }
  aplicarCheck( link: any ){
    /* console.log( link ); */
    let selectores = document.getElementsByClassName('selector');
    /* console.log(selectores); */
    for( let ref of selectores ){
        /* console.log(ref); */
        ref.classList.remove("working") 
    }
    link.classList.add("working")
  }
  colocarCheck(){
    let selectores = document.getElementsByClassName('selector');

    let tema = this._ajustes.ajustes.tema
    /* console.log(tema); */
    for( let ref of selectores ){
      /* console.log(ref); */
      if( ref.getAttribute( 'data-theme' ) === tema )
        return ref.classList.add('working');
    }
  }
}
