import { Component, OnInit, ElementRef } from '@angular/core';
import { UsuarioService } from '../../../../../services/core/registro/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


declare const $: any;


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [],
})
export class UsuarioComponent implements OnInit {
  totalRegistros: number = 0;
  usuarios: [] = [];
  desde: number = 0;
  paginaActual: number = 1;
  totalPaginas: number;

  clave: string;
  comentario: string;

  constructor(private usuario: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.cargarUsuarios(this.desde);
    //this.totalPaginas = Math.round(this.totalRegistros/10);
  }

  cargarUsuarios(desde: number) {
    this.usuario.listar(desde).subscribe((res) => {
      this.usuarios = res['usuarios'];
      this.totalRegistros = res['total'];
      this.totalPaginas = this.calcularPaginas(this.totalRegistros);
    });
  }

  calcularPaginas(registros: number) {
    const pag = registros / 10;
    if (String(pag).includes('.')) {
      return Math.trunc(pag) + 1;
    }
    return pag;
  }

  cambiarPagina(desde: number) {
    this.desde += desde;
    if (desde < 0) {
      this.paginaActual--;
    } else {
      this.paginaActual++;
    }
    this.cargarUsuarios(this.desde);
  }

  cambiarVigencia(id: string) {
    Swal.fire({
      title: '<strong>Cambiar Vigencia</strong>',
      icon: 'info',
      html:
        '<label class="form-control-label">Comentario</label>' +
        '<textarea class="form-control" id="comentario"></textarea>',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        'Cambiar Vigencia',
      cancelButtonColor:'red',
      cancelButtonText:
        'Cancelar',
      preConfirm: () => {
        return {
          "comentario": (<HTMLInputElement>document.getElementById('comentario')).value
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const data = result.value;
        this.usuario.cambiarVigencia(id, data).subscribe(res => {
          Swal.fire({
            title: res['msg'],
          });
          this.cambiarRuta();
        })
      }
    });
  }


  cambiarClave(id: string) {
    
    Swal.fire({
      title: '<strong>Cambiar Clave</strong>',
      icon: 'info',
      html:
        '<label class="form-control-label">Nueva Clave</label>' +
        '<input class="form-control" id="clave">',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        'Cambiar Clave',
      cancelButtonColor:'red',
      cancelButtonText:
        'Cancelar',
      preConfirm: () => {
        return {
          "clave": (<HTMLInputElement>document.getElementById('clave')).value,
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const data = result.value;
        this.usuario.cambiarClaveAdministrador(id, data).subscribe(res => {
          Swal.fire({
            title: res['msg'],
          });
          this.cambiarRuta();
        })
      }
    });

  }

  cambiarRuta(){
    this.router.navigateByUrl(`/`).then(
      () => {this.router.navigateByUrl('seguridad/gestion/usuario');});
  }
}
