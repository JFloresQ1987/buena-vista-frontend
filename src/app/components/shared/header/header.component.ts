import { Component, OnInit } from '@angular/core';
import { SeguridadService } from '../../../services/auth/seguridad.service';
import { Router } from '@angular/router';
import { Usuario } from '../../../models/auth/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public usuario : Usuario;

  constructor(private service: SeguridadService,
    private router: Router) {
    
      this.usuario = service.usuario;
  }

  ngOnInit(): void {
  }

  logout() {

    this.service.logout();
    this.router.navigateByUrl('/login');
  }

}
