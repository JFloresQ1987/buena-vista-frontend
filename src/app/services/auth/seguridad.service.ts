import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../../interfaces/auth/login.interface';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Usuario } from '../../models/auth/usuario.model';
import { environment } from '../../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  public usuario: Usuario;

  constructor(private http: HttpClient) { }

  validarToken(): Observable<boolean> {

    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/login/renovar_token`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap((res: any) => {

        const { id, usuario, avatar } = res.usuario

        this.usuario = new Usuario(id,
          usuario,
          'Jorge Flores Quispe',
          'jfloresq1987@gmail.com',
          'img.jpg', ['Administrador']);
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
