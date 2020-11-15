import { Component, OnInit, OnDestroy, AfterContentInit, AfterViewInit } from '@angular/core';
import { SidebarService } from '../../../services/shared/sidebar.service';
import { Socio } from '../../../models/core/socio.model';
import { SesionSocioService } from '../../../services/shared/sesion-socio.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menu: any[];
  sesionSocio: Socio;

  constructor(public sidebarService: SidebarService,
    public sesionSocioService: SesionSocioService) {

    // if (localStorage.getItem('socio')) {
      this.sesionSocio = sesionSocioService.sesionSocio;
    // } else {
    //   this.socio = new Socio();
    // }

// if(!this.socio)
// this.socio = new Socio();
  }

  ngOnInit(): void {

  }

  limpiarSesionSocio() {

    this.sesionSocio.id = '0';
    this.sesionSocio.nombre = '';
    this.sesionSocio.apellido_paterno = '';
    this.sesionSocio.apellido_materno = '';
    this.sesionSocio.fecha_nacimiento = '';
    this.sesionSocio.es_masculino = true;
    this.sesionSocio.avatar = '';
    localStorage.removeItem('socio');
  }

}
