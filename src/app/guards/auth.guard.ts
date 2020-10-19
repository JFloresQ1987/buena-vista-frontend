import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { SeguridadService } from '../services/auth/seguridad.service';
import { tap, map } from 'rxjs/operators';
// import { SesionSocioService } from '../services/shared/sesion-socio.service';
// import { Socio } from '../models/core/socio.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private seguridadService: SeguridadService,
    //private sesionSocioService: SesionSocioService,
    private router: Router) { }

  canLoad(route: Route, segments: import("@angular/router").UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.seguridadService.validarToken()
      .pipe(
        tap(({ esta_autenticado, debe_cambiar_clave_inicio_sesion }) => {
          // tap((esta_autenticado: any) => {
          //  console.log(esta_autenticado);


          // console.log('validando token ... 1')
          // console.log(esta_autenticado)

          if (!esta_autenticado)
            this.router.navigateByUrl('/login');

          console.log(debe_cambiar_clave_inicio_sesion)

          // if (esta_autenticado.debe_cambiar_clave_inicio_sesion)
          //   this.router.navigateByUrl('/cambiar-clave');
        }),
        map(({ esta_autenticado }) => esta_autenticado)
      );

    //  return false;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    return this.seguridadService.validarToken()
      .pipe(
        tap(({ esta_autenticado, debe_cambiar_clave_inicio_sesion }) => {
          // tap((esta_autenticado: any) => {
          // console.log(esta_autenticado);

          // console.log('validando token ... 2')

          if (!esta_autenticado)
            this.router.navigateByUrl('/login');

          console.log(debe_cambiar_clave_inicio_sesion)

        }),
        map(({ esta_autenticado }) => esta_autenticado)
      );
  }

}
