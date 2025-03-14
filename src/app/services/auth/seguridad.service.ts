import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../../interfaces/auth/login.interface';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Seguridad } from '../../models/auth/seguridad.model';
import { environment } from '../../../environments/environment';
// import { identifierModuleUrl } from '@angular/compiler';
import { ConfigurationService } from '../configuration/configuration.service';
// import { SesionSocioService } from '../shared/sesion-socio.service';
// import { Socio } from 'src/app/models/core/socio.model';

// const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  public seguridad: Seguridad;
  base_url: any;

  constructor(private http: HttpClient,
    private configurationService: ConfigurationService/*,
   private sesionSocioService: SesionSocioService*/) {

    // this.base_url = this.configurationService.settings;

    // console.log(ConfigurationService);
    // console.log(ConfigurationService.settings);
    // console.log(this.configurationService);
    // console.log(this.base_url);

  }

  validarToken(): Observable<any> {

    const token = localStorage.getItem('token') || '';

    // return this.http.get(`${this.base_url}/login/renovar_token`).pipe(
    return this.http.get(ConfigurationService.settings.apiUrl + `/login/renovar_token`).pipe(
      tap((res: any) => {

        const { id, usuario, rol, local_atencion, persona } = res.usuario

        this.seguridad = new Seguridad(
          id,
          usuario,
          local_atencion,
          persona.nombre,
          persona.apellido_paterno,
          persona.apellido_materno,
          persona.fecha_nacimiento,
          persona.es_masculino,
          persona.correo_electronico,
          persona.avatar,
          rol);
          // ['Administrador']);
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
    
    return this.http.post(ConfigurationService.settings.apiUrl + `/login`, data).pipe(
    // return this.http.post(`${this.base_url}/login`, data).pipe(
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
