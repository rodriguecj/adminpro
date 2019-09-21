import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafias1Component } from './grafias1/grafias1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const pagesRoutes: Routes = [
     { 
        path: '',
        component: PagesComponent,
        children: [
          { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'} },
          { path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'} },
          { path: 'graficas1', component: Grafias1Component, data: {titulo: 'Graficas'} },
          { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'} },
          { path: 'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs'} },
          { path: 'account-setting', component: AccountSettingsComponent, data: {titulo: 'Ajustes de Tema'} },
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
      } 
]

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})
/* export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes) */
export class PAGES_ROUTES {}