import { RouterModule, Routes } from '@angular/router'

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafias1Component } from './grafias1/grafias1.component';
import { NgModule } from '@angular/core';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

const pagesRoutes: Routes = [
     { 
        path: '',
        component: PagesComponent,
        children: [
          { path: 'dashboard', component: DashboardComponent},
          { path: 'progress', component: ProgressComponent },
          { path: 'graficas1', component: Grafias1Component },
          { path: 'account-setting', component: AccountSettingsComponent },
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