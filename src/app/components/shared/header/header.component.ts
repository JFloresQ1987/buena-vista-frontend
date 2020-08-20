import { Component, OnInit } from '@angular/core';
import { SeguridadService } from '../../../services/auth/seguridad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(private service: SeguridadService,
              private router: Router) { }

  ngOnInit(): void {
  }

  logout(){

    this.service.logout();
    this.router.navigateByUrl('/login');
  }

}
