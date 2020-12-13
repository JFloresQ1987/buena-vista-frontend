import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { SeguridadService } from '../auth/seguridad.service';
import { Seguridad } from 'src/app/models/auth/seguridad.model';
import { SesionSocioService } from '../shared/sesion-socio.service';
import { Socio } from '../../models/core/socio.model';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  private seguridad: Seguridad;
  // private socio: Socio;

  constructor(private seguridadService: SeguridadService/*,
    private sesionSocioService: SesionSocioService*/) {

    // this.seguridad = this.service.seguridad
  };

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.seguridad = this.seguridadService.seguridad;
    // this.socio = this.sesionSocioService.sesionSocio;

    const headers = new HttpHeaders({
      'x-token': localStorage.getItem('token') || '',/*,
      'uid': this.seguridad.id,
      'usuario': this.seguridad.usuario,
      'nombre': this.seguridad.nombre*/

      'id_usuario_sesion': this.seguridad ? this.seguridad.id : '0',
      'usuario_sesion': this.seguridad ? this.seguridad.usuario : '',
      'local_atencion': this.seguridad ? this.seguridad.local_atencion : '',
      'nombre_sesion': this.seguridad ? this.seguridad.nombre : ''
    });

    const req_clone = req.clone({
      headers
    });

    return next.handle(req_clone)
      .pipe(
        catchError(this.gestionError)
      );

    // return next.handle( req );
  }

  gestionError(err: HttpErrorResponse) {

    let message_error = '';

    if (err.error.msg)
      message_error = err.error.msg;
    else if (err.error && err.message)
      message_error = 'Tiempo de espera agotado al conectarse con el servidor.';
      // message_error = err.message;
    else
      message_error = 'Ocurrió un error inesperado en la aplicación.';

    Swal.fire({
      text: message_error,
      // text: err.error ? err.error.msg : 'Ocurrió un error inesperado en la aplicación.',
      icon: 'error'
    });
    return throwError('Error personalizado.');
  }
}
