import { Component } from '@angular/core';
import { SettingService } from './services/services.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adminpro';
  constructor( private _ajustes: SettingService ){
    
  }
}
