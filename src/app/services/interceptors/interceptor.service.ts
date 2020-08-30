import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { SeguridadService } from '../auth/seguridad.service';
import { Seguridad } from 'src/app/models/auth/seguridad.model';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  private seguridad: Seguridad
  
  constructor(private service: SeguridadService) {
    
    this.seguridad = this.service.seguridad
    // console.log('ejecutando inter')
  };

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('Interceptor token')


    const headers = new HttpHeaders ({
      'x-token': localStorage.getItem('token') || '',/*,
      'uid': this.seguridad.id,
      'usuario': this.seguridad.usuario,
      'nombre': this.seguridad.nombre*/

      'id_usuario_sesion': this.seguridad ? this.seguridad.id : '0',
      'usuario_sesion': this.seguridad ? this.seguridad.usuario : '',
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

  gestionError(err: HttpErrorResponse){
    // console.log(err.error.msg);
    Swal.fire({
      text: err.error.msg, icon: 'error'

// cons

    });
    return throwError('Error personalizado.');
  }
}
