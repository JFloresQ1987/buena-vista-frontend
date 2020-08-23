import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = [];

  cargarMenu(){

    this.menu = JSON.parse(localStorage.getItem('menu')) || [];
  }
  
  // menu: any[] = [
  //   {
  //     opcion: 'Home',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [        
  //       { opcion: 'Dashboard', url: '/dashboard' }
  //     ]
  //   },
  //   {
  //     opcion: 'Gestión',
  //     icono: 'mdi mdi-bullseye',
  //     submenu: [
  //       { opcion: 'Usuarios', url: '/seguridad/gestion/usuario' },
  //       { opcion: 'Roles', url: '/seguridad/gestion/rol' }
  //     ]
  //   }
  // ];
  
  constructor() { }
}
