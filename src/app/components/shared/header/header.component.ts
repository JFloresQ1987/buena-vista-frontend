import { Component, OnInit } from '@angular/core';
import { SeguridadService } from '../../../services/auth/seguridad.service';
import { Router } from '@angular/router';
import { Seguridad } from '../../../models/auth/seguridad.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public seguridad : Seguridad;

  constructor(private service: SeguridadService,
    private router: Router) {
    
      this.seguridad = service.seguridad;
  }

  ngOnInit(): void {
  }

  logout() {

    this.service.logout();
    this.router.navigateByUrl('/login');
  }

}
