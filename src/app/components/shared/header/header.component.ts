import { Component, OnInit } from '@angular/core';
import { SeguridadService } from '../../../services/auth/seguridad.service';
import { Router } from '@angular/router';
import { Seguridad } from '../../../models/auth/seguridad.model';
import Swal from 'sweetalert2';
import { SesionSocioService } from '../../../services/shared/sesion-socio.service';
import { tap } from 'rxjs/operators';
import { Socio } from '../../../models/core/socio.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public seguridad: Seguridad;
  public sesionSocio: Socio;
  // public documento_identidad: string;

  constructor(private seguridadService: SeguridadService,
    private sesionSocioService: SesionSocioService,
    private router: Router) {

    this.seguridad = seguridadService.seguridad;
    this.sesionSocio = sesionSocioService.sesionSocio;

    // console.log(this.seguridad)
    // console.log(this.sesionSocio)
  }

  ngOnInit(): void {
  }

  logout() {

    this.sesionSocio = new Socio();
    this.seguridadService.logout();
    this.router.navigateByUrl('/login');
  }

  // buscarSocio(documento_identidad: string) {
  buscarSocio(documento_identidad: string) {

    // console.log(documento_identidad)
    if (documento_identidad.length != 8) {
      Swal.fire({
        text: "Ingrese un documento de identidad correcto.", icon: 'warning'
      });
      return;
    }

    this.sesionSocioService.buscarSocio(documento_identidad)
      .subscribe((res: any) => {

        // if (this.form.get('recordar').value) {
        //   localStorage.setItem('usuario', this.form.get('usuario').value);
        // }
        // else {
        //   localStorage.removeItem('usuario');
        // }

        const { persona } = res
        this.sesionSocio.id = persona.id;
        this.sesionSocio.nombre = persona.nombre;
        this.sesionSocio.apellido_paterno = persona.apellido_paterno;
        this.sesionSocio.apellido_materno = persona.apellido_materno;
        this.sesionSocio.fecha_nacimiento = persona.fecha_nacimiento;
        this.sesionSocio.es_masculino = persona.es_masculino;
        this.sesionSocio.avatar = persona.avatar;

        // const { persona } = res

        // this.sesionSocio = new Socio(
        //   persona.id,          
        //   persona.nombre,
        //   persona.apellido_paterno,
        //   persona.apellido_materno,
        //   persona.fecha_nacimiento,
        //   persona.es_masculino,
        //   persona.avatar
        //   );

        // this.sesionSocio.nombre = persona.nombre;
        // this.sesionSocio.apellido_paterno = persona.apellido_paterno;
        // this.sesionSocio.apellido_materno = persona.apellido_materno;

        localStorage.setItem('socio', documento_identidad);
        // this.documento_identidad='';
        // document.getElementById('documento_identidad').value = '';

        console.log(document.getElementById('documento_identidad'))
        // document.getElementById('documento_identidad').value=""
        this.router.navigateByUrl('/dashboard/socio');

      }, (err) => {

        if (err.status === 400)
          Swal.fire({
            text: err.error.msg, icon: 'warning'
          });
        else
          Swal.fire({
            text: err.error.msg, icon: 'error'
          });
      });
  }
}
