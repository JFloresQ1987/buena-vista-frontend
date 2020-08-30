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
  socio: Socio;

  constructor(public sidebarService: SidebarService,
    public sesionSocioService: SesionSocioService) {

    //console.log(this.socio)
    // console.log(sesionSocioService.sesionSocio)

    // if (localStorage.getItem('socio')) {
      this.socio = sesionSocioService.sesionSocio;
    // } else {
    //   this.socio = new Socio();
    // }
// console.log('--sidebar--')
//     console.log(this.socio.getNombreCompleto())
//     console.log('--sidebar--')

//     console.log("Hello");
// setTimeout(() => { console.log(this.socio.getNombreCompleto()); }, 2000);
// console.log("Goodbye!");

// if(!this.socio)
// this.socio = new Socio();

    // console.log(this.socio.nombre);
  }

  ngOnInit(): void {

  }

}
