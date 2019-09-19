import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* Modulos */
import { ChartsModule } from 'ng2-charts';

import { GraficoDonaComponent } from './grafico-dona/grafico-dona.component';



@NgModule({
  declarations: [
    GraficoDonaComponent
  ],
  imports: [
    CommonModule,
    ChartsModule
  ],
  exports: [
    GraficoDonaComponent
  ]
})
export class ComponentsModule { }
