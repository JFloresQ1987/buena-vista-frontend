import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './inicio/dashboard/dashboard.component';
import { UsuarioComponent } from './seguridad/gestion/usuario/usuario.component';
import { RolComponent } from './seguridad/gestion/rol/rol.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { OperacionFinancieraComponent } from './registro/operacion-financiera/operacion-financiera.component';
import { SocioComponent } from './registro/socio/socio.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardSocioComponent } from './inicio/dashboard-socio/dashboard-socio.component';
import { CrearComponent } from './seguridad/gestion/usuario/crear/crear.component';
import { ProductoComponent } from './operaciones/producto/producto.component';
import { ProductoDetalleComponent } from './operaciones/producto-detalle/producto-detalle.component';
import { AnalistaComponent } from './seguridad/gestion/analista/analista.component';
import { FormComponent } from './seguridad/gestion/analista/form.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    UsuarioComponent,
    RolComponent,
    SocioComponent,
    OperacionFinancieraComponent,
    DashboardSocioComponent,
    CrearComponent,
    ProductoComponent,
    ProductoDetalleComponent,
    AnalistaComponent,
    FormComponent
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    UsuarioComponent,
    RolComponent,
    SocioComponent,
    OperacionFinancieraComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
