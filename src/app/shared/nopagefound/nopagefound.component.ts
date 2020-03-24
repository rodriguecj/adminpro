import { Component, OnInit } from '@angular/core';

declare function init_pluging()
@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: []
})
export class NopagefoundComponent implements OnInit {

  constructor() { 
    init_pluging()
  }

  ngOnInit() {
  }

}
