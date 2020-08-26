import { Injectable, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subscription } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Socio } from '../../models/core/socio.model';

@Injectable({
  providedIn: 'root'
})
export class SesionSocioService {

  private base_url = environment.base_url;
  public sesionSocio: Socio = new Socio();
  // private xxx :Subscription;

  constructor(private http: HttpClient) {

    // console.log('entrooo')

    // this.sesionSocio = new Socio();

    if (localStorage.getItem('socio')) {
      // console.log('entrooo 111'+localStorage.getItem('socio'))
      this.buscarSocio(localStorage.getItem('socio')).subscribe((res: any) => {

        const { persona } = res
        // this.sesionSocio = persona;

        // this.sesionSocio = new Socio(
        //   persona.id,          
        //   persona.nombre,
        //   persona.apellido_paterno,
        //   persona.apellido_materno,
        //   persona.fecha_nacimiento,
        //   persona.es_masculino,
        //   persona.avatar
        //   );

        this.sesionSocio.id = persona.id;
        this.sesionSocio.nombre = persona.nombre;
        this.sesionSocio.apellido_paterno = persona.apellido_paterno;
        this.sesionSocio.apellido_materno = persona.apellido_materno;
        this.sesionSocio.fecha_nacimiento = persona.fecha_nacimiento;
        this.sesionSocio.es_masculino = persona.es_masculino;
        this.sesionSocio.avatar = persona.avatar;

      });
    }
    // else
    //   this.sesionSocio = new Socio();
  }

  // ngOnDestroy(): void {
  //   this.xxx.unsubscribe();
  // }

  // buscarSocio(documento_identidad: string) {

  //   const url = `${this.base_url}/personas/buscar_socio/${documento_identidad}`;

  //   return this.http.get(url);
  // }

  buscarSocio(documento_identidad: string) {


    console.log('buscando')

    return this.http.get(`${this.base_url}/personas/buscar_socio/${documento_identidad}`);
    // return this.http.get(`${this.base_url}/personas/buscar_socio/${documento_identidad}`).pipe(
    //   tap((res: any) => {
    //     // console.log('entrooo')
    //     // console.log(res)

    //     const { persona } = res

    //     // this.sesionSocio = new Socio(
    //     //   persona.id,          
    //     //   persona.nombre,
    //     //   persona.apellido_paterno,
    //     //   persona.apellido_materno,
    //     //   persona.fecha_nacimiento,
    //     //   persona.es_masculino,
    //     //   persona.avatar
    //     //   );

    //     this.sesionSocio.nombre = persona.nombre;
    //     this.sesionSocio.apellido_paterno = persona.apellido_paterno;
    //     this.sesionSocio.apellido_materno = persona.apellido_materno;

    //     // localStorage.setItem('socio', res.token);
    //     // localStorage.setItem('menu', JSON.stringify(res.menu));
    //   })//,map(res => true)
    // );
  }
}
