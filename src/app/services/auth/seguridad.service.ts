import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../../interfaces/auth/login.interface';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Seguridad } from '../../models/auth/seguridad.model';
import { environment } from '../../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  public seguridad: Seguridad;

  constructor(private http: HttpClient) { }

  validarToken(): Observable<boolean> {

    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renovar_token`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((res: any) => {

        const { id, usuario, persona } = res.usuario

        this.seguridad = new Seguridad(id,
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
      }),
      map(res => true),
      catchError(err => of(false))
    );
  }

  login(data: Login) {

    return this.http.post(`${base_url}/login`, data).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token)
      })
    );;
  }

  logout() {

    localStorage.removeItem('token');
  }
}
