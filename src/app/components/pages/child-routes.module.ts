import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorizationGuard } from '../../guards/authorization.guard';

import { DashboardComponent } from './inicio/dashboard/dashboard.component';
import { UsuarioComponent } from './seguridad/gestion/usuario/usuario.component';
import { CrearComponent } from './seguridad/gestion/usuario/crear/crear.component';
import { RolComponent } from './seguridad/gestion/rol/rol.component';
import { OperacionFinancieraComponent } from './registro/operacion-financiera/operacion-financiera.component';
import { SocioComponent } from './registro/socio/socio.component';
import { DashboardSocioComponent } from './inicio/dashboard-socio/dashboard-socio.component';
import { ProductoComponent } from './operaciones/producto/producto.component';
import { ProductoDetalleComponent } from './operaciones/producto-detalle/producto-detalle.component';
import { AnalistaComponent } from './seguridad/gestion/analista/analista.component'
import { FormComponent } from './seguridad/gestion/analista/form.component';


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
    data: { modulo: 'Buenavista', menu: 'Home', item: 'Perfil del Socio', roles: ["Administrador", "Analista", "Cajero"] }
  },
  {
    path: 'seguridad/gestion/usuario',
    component: UsuarioComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Seguridad', menu: 'Gestión', item: 'Usuarios', roles: ["Administrador"] },
  },
  {
    path: 'seguridad/gestion/usuario/:id',
    component: CrearComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Seguridad', menu: 'Gestión', item: 'Usuario Registro', roles: ["Administrador"] },
  },
  {
    path: 'seguridad/gestion/rol',
    component: RolComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Seguridad', menu: 'Gestión', item: 'Roles', roles: ["Administrador"] }
  },
  {
    path: 'seguridad/gestion/analista',
    component: AnalistaComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Seguridad', menu: 'Gestión', item: 'Analistas', roles: ["Administrador"] }
  },
  {
    path: 'seguridad/gestion/analista/:id',
    component: FormComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Seguridad', menu: 'Gestión', item: 'Informacion Analista', roles: ["Administrador"] }
  },
  {
    path: 'registro/gestion/socio',
    component: SocioComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Registro', menu: 'Gestión', item: 'Socios', roles: ["Administrador", "Analista"] }
  },
  {
    path: 'registro/gestion/socio/:id',
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
    path: 'operaciones/gestion/producto',
    component: ProductoComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Operaciones', menu: 'Gestión', item: 'Producto', roles: ["Administrador", "Analista", "Cajero"] }
  },
  {
    path: 'operaciones/gestion/producto-detalle/:id',
    component: ProductoDetalleComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Operaciones', menu: 'Gestión', item: 'Producto detalle', roles: ["Administrador", "Analista", "Cajero"] }
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
