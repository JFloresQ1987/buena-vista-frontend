import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../../services/core/registro/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit {

  totalRegistros:number = 0;
  usuarios:[] = [];
  desde:number = 0;
  paginaActual: number = 1;
  totalPaginas: number;
  
  constructor(private usuario:UsuarioService) { }

  ngOnInit(): void {
    this.cargarUsuarios(this.desde);
    //this.totalPaginas = Math.round(this.totalRegistros/10);
    
  }

  cargarUsuarios(desde: number){
    this.usuario.listar(desde).subscribe(res=>{
      this.usuarios = res['usuarios'];
      this.totalRegistros = res['total'];
      this.totalPaginas = this.calcularPaginas(this.totalRegistros);
    })
  }

  calcularPaginas(registros: number) {
    const pag = registros / 10;
    if (String(pag).includes(".")) {
      return Math.trunc(pag) + 1;
    }
    return pag;
  }

  cambiarPagina(desde:number){
    this.desde += desde;
    if(desde<0){
      this.paginaActual--; 
    }else{
      this.paginaActual++;
    }
    this.cargarUsuarios(this.desde);
  }

}
