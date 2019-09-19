import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { ChartsModule } from 'ng2-charts';

/* Router pages field */
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';
import { Grafias1Component } from './grafias1/grafias1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';

import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { ComponentsModule } from '../components/components.module';


@NgModule({   
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Grafias1Component,
    IncrementadorComponent,
    /* GraficoDonaComponent */
  ],
  imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule,
    ComponentsModule
  ], 
  exports: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Grafias1Component,
    IncrementadorComponent,
    /* GraficoDonaComponent */
  ]
})
export class PagesModule { }
