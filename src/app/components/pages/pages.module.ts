import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './inicio/dashboard/dashboard.component';
import { UsuarioComponent } from './seguridad/gestion/usuario/usuario.component';
import { RolComponent } from './seguridad/gestion/rol/rol.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';

@NgModule({
  declarations: [
    DashboardComponent,
    UsuarioComponent,
    RolComponent,
    PagesComponent
  ],
  exports: [
    DashboardComponent,
    UsuarioComponent,
    RolComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]  
})
export class PagesModule { }
