import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './inicio/dashboard/dashboard.component';
import { UsuarioComponent } from './seguridad/gestion/usuario/usuario.component';
import { RolComponent } from './seguridad/gestion/rol/rol.component';
import { AuthorizationGuard } from '../../guards/authorization.guard';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent,                
                data: { menu: 'Home', item: 'Dashboard' }
            },
            {
                path: 'seguridad/gestion/usuario',
                component: UsuarioComponent,
                canActivate: [AuthorizationGuard],
                data: { menu: 'Gestión', item: 'Usuarios', roles: ["Cajero"] }
            },
            {
                path: 'seguridad/gestion/rol',
                component: RolComponent,
                canActivate: [AuthorizationGuard],
                data: { menu: 'Gestión', item: 'Roles', roles: ["Administrador", "Cajero"] }
            },
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
