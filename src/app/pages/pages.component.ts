import { Component, OnInit } from '@angular/core';

declare function init_pluging()
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { 
    /* console.log('Se activa el pluging desde el constructor'); */
    init_pluging()
  }

  ngOnInit() {
   /*  init_pluging() */
    /* console.log('Se activaron los pluging'); */
  }

}
