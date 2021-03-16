import { Component, OnInit } from '@angular/core';

import { AnalistaService } from '../../../../../services/core/registro/analista.service';

@Component({
  selector: 'app-analista',
  templateUrl: './analista.component.html',
  styleUrls: ['./analista.component.css']
})
export class AnalistaComponent implements OnInit {

  analistas: [] = []
  desde: number = 0;
  totalRegistros: number;
  paginaActual: number = 1;
  totalPaginas: number;

  constructor(private analistaService: AnalistaService) { }

  ngOnInit(): void {
    this.cargarAnalistas(this.desde);
  }

  cargarAnalistas(desde: number) {
    this.analistaService.listar(desde).subscribe(res => {
      this.analistas = res['analistas'];
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

  cambiarPagina(desde: number) {
    this.desde += desde;
    if (desde < 0) {
      this.paginaActual--;
    } else {
      this.paginaActual++;
    }
    this.cargarAnalistas(this.desde);
  }
}
