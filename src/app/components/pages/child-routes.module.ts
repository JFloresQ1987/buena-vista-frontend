import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorizationGuard } from '../../guards/authorization.guard';

import { DashboardComponent } from './inicio/dashboard/dashboard.component';
import { UsuarioComponent } from './seguridad/gestion/usuario/usuario.component';
import { RolComponent } from './seguridad/gestion/rol/rol.component';
import { OperacionFinancieraComponent } from './registro/operacion-financiera/operacion-financiera.component';
import { SocioComponent } from './registro/socio/socio.component';
import { DashboardSocioComponent } from './inicio/dashboard-socio/dashboard-socio.component';

const childRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { modulo: 'Buenavista', menu: 'Home', item: 'Dashboard' }
  },
  {
    path: 'dashboard/socio',
    component: DashboardSocioComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Buenavista', menu: 'Home', item: 'Perfil del Socio', roles: ["Administrador"] }
  },
  {
    path: 'seguridad/gestion/usuario',
    component: UsuarioComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Seguridad', menu: 'Gestión', item: 'Usuarios', roles: ["Cajero"] }
  },
  {
    path: 'seguridad/gestion/rol',
    component: RolComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Seguridad', menu: 'Gestión', item: 'Roles', roles: ["Administrador"] }
  },
  {
    path: 'registro/gestion/socio',
    component: SocioComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Registro', menu: 'Gestión', item: 'Socios', roles: ["Administrador", "Analista"] }
  },
  {
    path: 'registro/gestion/credito',
    component: OperacionFinancieraComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Registro', menu: 'Gestión', item: 'Créditos', roles: ["Administrador", "Analista"] }
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
  declarations: []
})
export class ChildRoutesModule { }
