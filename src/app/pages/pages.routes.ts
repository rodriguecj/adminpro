import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafias1Component } from './grafias1/grafias1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../services/guards/admin.guard';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';

const pagesRoutes: Routes = [
     /* { 
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
          { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'} },
          { path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'} },
          { path: 'graficas1', component: Grafias1Component, data: {titulo: 'Graficas'} },
          { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'} },
          { path: 'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs'} },
          { path: 'account-setting', component: AccountSettingsComponent, data: {titulo: 'Ajustes de Tema'} },
          { path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil de usuario'} },
          { path: 'busqueda/:termino', component: BusquedaComponent, data: {titulo: 'Buscador'} },
          //Mantenimientos
          { 
            path: 'usuarios', 
            component: UsuariosComponent, 
            data: {titulo: 'Mantenimientos de usuarios'}, 
            canActivate: [ AdminGuard ]
          },
          { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimientos de hospitales'} },
          { path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimientos de Medicos'} },
          { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Actualizacion de Medico'} },
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
        ]
      }  */
  { path: 'dashboard', canActivate: [ VerificaTokenGuard ], component: DashboardComponent, data: {titulo: 'Dashboard'} },
  { path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'} },
  { path: 'graficas1', component: Grafias1Component, data: {titulo: 'Graficas'} },
  { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'} },
  { path: 'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs'} },
  { path: 'account-setting', component: AccountSettingsComponent, data: {titulo: 'Ajustes de Tema'} },
  { path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil de usuario'} },
  { path: 'busqueda/:termino', component: BusquedaComponent, data: {titulo: 'Buscador'} },
  //Mantenimientos
  { 
    path: 'usuarios', 
    component: UsuariosComponent, 
    data: {titulo: 'Mantenimientos de usuarios'}, 
    canActivate: [ AdminGuard ]
  },
  { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimientos de hospitales'} },
  { path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimientos de Medicos'} },
  { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Actualizacion de Medico'} },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forChild(pagesRoutes)],
  exports: [RouterModule]
})
/*  export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes)  */
export class PAGES_ROUTES {}