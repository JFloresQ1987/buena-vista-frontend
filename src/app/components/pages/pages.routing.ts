import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './inicio/dashboard/dashboard.component';
import { UsuarioComponent } from './seguridad/gestion/usuario/usuario.component';
import { RolComponent } from './seguridad/gestion/rol/rol.component';

const routes: Routes = [  
    {
        path: '',
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
            { path: 'dashboard', component: DashboardComponent, data: { menu: 'Home', item: 'Dashboard' } },
            { path: 'seguridad/gestion/usuario', component: UsuarioComponent, data: { menu: 'Gestión', item: 'Usuarios' } },
            { path: 'seguridad/gestion/rol', component: RolComponent, data: { menu: 'Gestión', item: 'Roles' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
