import { Component, OnInit } from '@angular/core';
import { SesionSocioService } from '../../../../services/shared/sesion-socio.service';

@Component({
  selector: 'app-dashboard-socio',
  templateUrl: './dashboard-socio.component.html',
  styles: [
  ]
})
export class DashboardSocioComponent implements OnInit {

  constructor(private service: SesionSocioService) { }

  ngOnInit(): void {

    console.log(this.service.sesionSocio)
    
    // this.activatedRoute.params
    // .subscribe(({ documento_identidad }) => {

    //   this.buscarSocio(documento_identidad);
    // })
  }

  // buscarSocio(documento_identidad: string){

  //   this.service.buscarSocio(documento_identidad)
  //   .subscribe(res => {
  //     console.log(res);
      
  //   });

  //   // return this.http.get(`${base_url}/login/renovar_token`).pipe(
  //   //   tap((res: any) => {

  //   //     const { id, usuario, persona } = res.usuario

  //   //     this.seguridad = new Seguridad(id,
  //   //       usuario,
  //   //       persona.nombre,
  //   //       persona.apellido_paterno,
  //   //       persona.apellido_materno,
  //   //       persona.fecha_nacimiento,
  //   //       persona.es_masculino,
  //   //       persona.correo_electronico,
  //   //       persona.avatar,
  //   //       ['Administrador']);
  //   //     localStorage.setItem('token', res.token);
  //   //     localStorage.setItem('menu', JSON.stringify(res.menu));
  //   //   })
  // }

}
