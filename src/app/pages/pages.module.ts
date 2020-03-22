import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { ChartsModule } from 'ng2-charts';
import { PipesModule } from '../pipes/pipes.module';

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
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({   
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Grafias1Component,
    IncrementadorComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent,
    /* GraficoDonaComponent */
  ],
  imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule,
    ComponentsModule,
    PipesModule
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
