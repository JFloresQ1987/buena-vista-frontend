import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { SeguridadService } from '../services/auth/seguridad.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private service: SeguridadService,
    private router: Router) { }

  canLoad(route: Route, segments: import("@angular/router").UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    return this.service.validarToken()
      .pipe(
        tap(esta_autenticado => {
// console.log(esta_autenticado);
          if (!esta_autenticado)
            this.router.navigateByUrl('/login');
        })
      );

//  return false;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    return this.service.validarToken()
      .pipe(
        tap(esta_autenticado => {
// console.log(esta_autenticado);
          if (!esta_autenticado)
            this.router.navigateByUrl('/login');
        })
      );
  }

}
