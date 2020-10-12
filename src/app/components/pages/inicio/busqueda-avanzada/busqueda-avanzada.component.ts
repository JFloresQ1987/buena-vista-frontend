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

  totalRegistros:number = 0;
  desde:number = 0;
  paginaActual: number = 1;
  totalPaginas: number;

  constructor( private sesionSocioService: SesionSocioService,
    private router: Router ) { 
    this.sesionSocio = sesionSocioService.sesionSocio;
  }

  ngOnInit(): void {
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

  buscarPorNombre(termino: string, desde:number= 0){
    termino = this.nombre    
    if (termino.length >= 3) {
      console.log('estas aquí!!!!!!!!');      
    } else if (termino.length < 3) {
      console.log('ahora entras aqui!!!!!!!!!!!!!!!');
    }
    this.cargando = false
    this.sesionSocioService.buscarSocioNombre(termino, desde).subscribe(res =>{
      this.persona = res['persona'];
      this.totalRegistros = res['total'];
      this.totalPaginas = this.calcularPaginas(this.totalRegistros);
    })  
  }

  buscarPorApellido(termino: string, desde:number= 0){
    termino = this.apellido
    this.cargando = false
    this.sesionSocioService.buscarSocioApellido(termino, desde).subscribe(res =>{
      this.persona = res['persona'];
      this.totalRegistros = res['total'];
      this.totalPaginas = this.calcularPaginas(this.totalRegistros);
    })          
  }

  buscarPorApellidoMat(termino: string, desde:number= 0){
    termino = this.apellidoMat    
    this.cargando = false
    this.sesionSocioService.buscarSocioApellidoMat(termino, desde).subscribe(res =>{
      this.persona = res['persona'];
      this.totalRegistros = res['total'];
      this.totalPaginas = this.calcularPaginas(this.totalRegistros);
    })   
  }

  calcularPaginas(registros: number) {
    const pag = registros / 15;
    if (String(pag).includes(".")) {
      return Math.trunc(pag) + 1;
    }
    return pag;
  }

  cambiarPaginaApMat(termino: string,desde:number){
    this.desde += desde;
    if(desde<0){
      this.paginaActual--; 
    }else{
      this.paginaActual++;
    }
    // tipoBusqueda(termino, this.desde);
    this.buscarPorApellidoMat(termino, this.desde);
  }
  cambiarPaginaNombre(termino: string,desde:number){
    this.desde += desde;
    if(desde<0){
      this.paginaActual--; 
    }else{
      this.paginaActual++;
    }
    // tipoBusqueda(termino, this.desde);
    this.buscarPorNombre(termino, this.desde);
  }
  cambiarPaginaApPat(termino: string,desde:number){
    this.desde += desde;
    if(desde<0){
      this.paginaActual--; 
    }else{
      this.paginaActual++;
    }
    // tipoBusqueda(termino, this.desde);
    this.buscarPorApellido(termino, this.desde);
  }

}
