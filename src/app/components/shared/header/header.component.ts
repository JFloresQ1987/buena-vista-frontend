import { Component, OnInit } from '@angular/core';
import { SeguridadService } from '../../../services/auth/seguridad.service';
import { Router } from '@angular/router';
import { Seguridad } from '../../../models/auth/seguridad.model';
import Swal from 'sweetalert2';
import { SesionSocioService } from '../../../services/shared/sesion-socio.service';
import { tap } from 'rxjs/operators';
import { Socio } from '../../../models/core/socio.model';
import { UsuarioService } from '../../../services/core/registro/usuario.service';

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
    private router: Router, private usuarioService: UsuarioService) {

    this.seguridad = seguridadService.seguridad;
    this.sesionSocio = sesionSocioService.sesionSocio;

    // console.log(this.seguridad)
    // console.log(this.sesionSocio)
  }

  ngOnInit(): void {
  }

  logout() {

    // this.sesionSocio = new Socio();

    this.sesionSocio.id = '0';
    this.sesionSocio.nombre = '';
    this.sesionSocio.apellido_paterno = '';
    this.sesionSocio.apellido_materno = '';
    this.sesionSocio.fecha_nacimiento = '';
    this.sesionSocio.es_masculino = true;
    this.sesionSocio.avatar = '';

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
        console.log(persona.id);
        localStorage.setItem('socio1', persona.id);
        // this.documento_identidad='';
        // document.getElementById('documento_identidad').value = '';

        // console.log(document.getElementById('documento_identidad'))
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

  cambiarClave() {
    Swal.fire({
      title: '<strong>Cambiar Clave</strong>',
      icon: 'info',
      html:
        '<label class="form-control-label">Clave Anterior</label>' +
        '<input type="password" class="form-control" id="clave">' +
        '<label class="form-control-label">Nueva Clave</label>' +
        '<input type="password" class="form-control" id="nueva_clave">' +
        '<label class="form-control-label">Confirmar Clave</label>' +
        '<input type="password" class="form-control" id="confirmar_clave">',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        'Cambiar Clave',
      cancelButtonColor: 'red',
      cancelButtonText:
        'Cancelar',
      preConfirm: () => {
        const password = (<HTMLInputElement>document.getElementById('nueva_clave')).value;
        const confirm_password = (<HTMLInputElement>document.getElementById('confirmar_clave')).value;
        if (password !== confirm_password) {
          return Swal.showValidationMessage('Las claves no coinciden');
        } else {
          return {
            "usuario": this.seguridad.usuario,
            "old_password": (<HTMLInputElement>document.getElementById('clave')).value,
            "password": (<HTMLInputElement>document.getElementById('nueva_clave')).value
          }
        }

      },
    }).then((result) => {
      if(result.isConfirmed){
        const data = <Object>result.value;
        this.usuarioService.cambiarClaveUsuario(data).subscribe(res => {
          Swal.fire({
            icon:"success",
            text: res['msg']
          })
          this.logout();
        })
      }
    })
  }
}
