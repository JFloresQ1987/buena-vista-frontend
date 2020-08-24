import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log('Interceptor token')
    const headers = new HttpHeaders ({
      'x-token': localStorage.getItem('token') || ''
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
    console.log(err);
    Swal.fire({
      text: 'Error personalizado, desde interceptor.', icon: 'error'
    });
    return throwError('Error personalizado.');
  }
}
