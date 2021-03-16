import { Component, OnInit } from '@angular/core';
import { OperacionFinancieraPagoService } from '../../../../services/core/caja/operacion-financiera-pago.service';

@Component({
  selector: 'app-libro-diario-ingresos',
  templateUrl: './libro-diario-ingresos.component.html',
  styleUrls: ['./libro-diario-ingresos.component.css']
})
export class LibroDiarioIngresosComponent implements OnInit {

  public cargando: boolean = true;
  public lista: [];
  public analistas: [] = [];
  public analista: string = '0';

  totalRegistros: number = 0;
  desde: number = 0;
  paginaActual: number = 1;
  totalPaginas: number;

  constructor(private service: OperacionFinancieraPagoService) { }

  ngOnInit(): void {

    this.listarRecibos(this.desde);
  }

  listarRecibos(desde: number) {

    this.service.listarLibroDiario('ingreso', desde)
      // .pipe(
      //   delay(100)
      // )
      .subscribe((res: any) => {

// console.log(res)

        // this.lista = res;
        // this.productos = res.lista;
        this.lista = res['lista'];
        this.totalRegistros = res['total'];
        this.totalPaginas = this.calcularPaginas(this.totalRegistros);
        this.cargando = false;
      });
  }

  // buscarRecibos(id) {

  //   const analista = id || 0;
  //   this.listarRecibos(analista);
  //   this.analista = id;
  // }

  calcularPaginas(registros: number) {
    const pag = registros / 50;
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
    this.listarRecibos(this.desde);
  }

}
