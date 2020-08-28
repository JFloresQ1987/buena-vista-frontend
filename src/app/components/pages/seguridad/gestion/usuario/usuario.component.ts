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

  constructor(private usuario:UsuarioService) { }

  ngOnInit(): void {
    console.log('Haciendo la peticion');
    this.usuario.listar().subscribe(res=>{
      this.usuarios = res['usuarios'];
      this.totalRegistros = res['total'];
    })
  }

}
