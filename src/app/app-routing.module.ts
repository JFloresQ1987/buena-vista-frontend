import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesRoutingModule } from './components/pages/pages.routing';
import { AuthRoutingModule } from './components/auth/auth.routing';
import { Error404Component } from './components/shared/error404/error404.component';

const routes: Routes = [      
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
