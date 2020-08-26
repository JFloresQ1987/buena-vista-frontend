import { Component, OnInit, OnDestroy } from '@angular/core';
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
  socio: Socio;

  constructor(public sidebarService: SidebarService,
    public sesionSocioService: SesionSocioService) {

    // console.log(this.socio)
    // console.log(sesionSocioService.sesionSocio)

    // if (localStorage.getItem('socio')) {
      this.socio = sesionSocioService.sesionSocio;
    // } else {
    //   this.socio = new Socio();
    // }

// if(!this.socio)
// this.socio = new Socio();

    // console.log(this.socio.nombre);
  }

  ngOnInit(): void {
  }

}
