import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { SesionSocioService } from '../../../../services/shared/sesion-socio.service';
import { Socio } from '../../../../models/core/socio.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-busqueda-avanzada',
  templateUrl: './busqueda-avanzada.component.html',
  styles: [
  ]
})
export class BusquedaAvanzadaComponent implements OnInit {

  public nombre = ''
  public apellido = ''
  public apellidoMat = ''
  public seleccion = 'nombre'
  public cargando: boolean = true;
  public mostrar: boolean = false;
  public sesionSocio: Socio;
  persona: [] = []

  constructor( private sesionSocioService: SesionSocioService,
    private router: Router ) { 
    this.sesionSocio = sesionSocioService.sesionSocio;
  }


  ngOnInit(): void {

    console.log('Obteniendo datos');
    
  }


  buscarPorNombre(termino: string){
    this.cargando = false
    termino = this.nombre
    console.log(termino);
    this.sesionSocioService.buscarSocioNombre(termino).subscribe(res =>{
      this.persona = res['persona'];
      console.log('asdasd',res);
    })
  }

  buscarSocioDni(documento_identidad: string) {

    this.sesionSocioService.buscarSocio(documento_identidad)
      .subscribe((res: any) => {

        const { persona } = res
        this.sesionSocio.id = persona.id;
        this.sesionSocio.nombre = persona.nombre;
        this.sesionSocio.apellido_paterno = persona.apellido_paterno;
        this.sesionSocio.apellido_materno = persona.apellido_materno;
        this.sesionSocio.fecha_nacimiento = persona.fecha_nacimiento;
        this.sesionSocio.es_masculino = persona.es_masculino;
        this.sesionSocio.avatar = persona.avatar;

        localStorage.setItem('socio', documento_identidad);
        this.router.navigateByUrl('/dashboard/socio');

      }, (err) => {

        if (err.status === 400)
          Swal.fire({
            text: err.error.msg, icon: 'warning'
          });
        else
          Swal.fire({
            text: err.error.msg, icon: 'error'
          });
      });
  }

  buscarPorApellido(termino: string){
    this.cargando = false
    termino = this.apellido
    console.log(termino);
    this.sesionSocioService.buscarSocioApellido(termino).subscribe(res =>{
      this.persona = res['persona'];
      console.log(res);
    })
  }

  buscarPorApellidoMat(termino: string){
    this.cargando = false
    termino = this.apellidoMat
    console.log(termino);
    this.sesionSocioService.buscarSocioApellidoMat(termino).subscribe(res =>{
      this.persona = res['persona'];
      console.log(res);
    })
  }


}
