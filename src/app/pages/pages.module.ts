import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Router pages field */
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

import { PagesComponent } from './pages.component';
import { Grafias1Component } from './grafias1/grafias1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';




@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Grafias1Component
  ],
  imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTES
  ], 
  exports: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Grafias1Component
  ]
})
export class PagesModule { }
