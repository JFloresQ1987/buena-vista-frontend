import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../../interfaces/auth/login.interface';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Seguridad } from '../../models/auth/seguridad.model';
import { environment } from '../../../environments/environment';
import { identifierModuleUrl } from '@angular/compiler';
// import { SesionSocioService } from '../shared/sesion-socio.service';
// import { Socio } from 'src/app/models/core/socio.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  public seguridad: Seguridad;

  constructor(private http: HttpClient/*,
    private sesionSocioService: SesionSocioService*/) {

    console.log('entro para buscando seguridad')
  }

  validarToken(): Observable<any> {

    const token = localStorage.getItem('token') || '';

    // console.log(token)

    return this.http.get(`${base_url}/login/renovar_token`).pipe(
      tap((res: any) => {

        const { id, usuario, persona } = res.usuario

        this.seguridad = new Seguridad(
          id,
          usuario,
          persona.nombre,
          persona.apellido_paterno,
          persona.apellido_materno,
          persona.fecha_nacimiento,
          persona.es_masculino,
          persona.correo_electronico,
          persona.avatar,
          ['Administrador']);
        localStorage.setItem('token', res.token);
        // localStorage.setItem('sesion', id)
        localStorage.setItem('menu', JSON.stringify(res.menu));
      }),
      // map(res => ({resultado:true})),
      map(res => ({
        esta_autenticado: true,
        debe_cambiar_clave_inicio_sesion: res.debe_cambiar_clave_inicio_sesion
      })),
      // map(res => true),
      catchError(err => of({
        esta_autenticado: false
      }))
      // catchError(err => of(false))
    );
  }

  login(data: Login) {

    return this.http.post(`${base_url}/login`, data).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token)
        // this.sesionSocioService.sesionSocio = new Socio();
      })
    );
  }

  logout() {

    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    localStorage.removeItem('socio');
    // this.sesionSocioService.sesionSocio = new Socio();

    // sesionSocioService.
  }

  get rol(): String[] {

    return this.seguridad.rol || [];
  }
}
