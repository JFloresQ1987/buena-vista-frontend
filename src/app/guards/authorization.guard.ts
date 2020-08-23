import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SeguridadService } from '../services/auth/seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  
  constructor(private service : SeguridadService,
    private router: Router){} 

  canActivate(route: ActivatedRouteSnapshot): boolean {
    
    // if()
    
    //   return true;



      // if (this.service.seguridad.rol) {
        const roles = this.service.seguridad.rol;
        const coincidencias = route.data.roles.filter(rol => roles.includes(rol))
  
        // console.log(roles)
        // console.log(route.data.roles)
        // console.log(coincidencias)
  
        if (route.data.roles && coincidencias.length === 0) {
  
          // console.log("false")
          this.router.navigate(['/dashboard']);
          return false;
        }
  
        // console.log("true")
  
        return true
      // }
      // else {
      //   this.router.navigate(['/login'])
      //   return false
      // }
  }
  
}
