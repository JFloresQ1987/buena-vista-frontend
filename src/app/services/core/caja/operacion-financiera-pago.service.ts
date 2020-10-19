import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { OperaconFinancieraPago } from '../../../interfaces/core/registro/operacion-financiera-pago';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class OperacionFinancieraPagoService {

  constructor(private http: HttpClient) { }

  listarPagos() {

    return this.http.get(`${base_url}/operacion-financiera-pago/listar_pagos`)
      .pipe(
        map((res: { ok: boolean, lista: [] }) => res.lista)
      );
  }
  
  listarProductoDetalle(id_operacion_financiera: string) {

    return this.http.get(`${base_url}/operacion-financiera-pago/listar/${id_operacion_financiera}`)
      .pipe(
        map((res: { ok: boolean, lista: [] }) => res.lista)
      );
  }

  // pagarProducto(id_operacion_financiera: string) {
  pagarProducto(objeto: OperaconFinancieraPago) {

    // return this.http.get(`${base_url}/operacion-financiera-pago/listar/${id_operacion_financiera}`)
    //   .pipe(
    //     map((res: { ok: boolean, lista: [] }) => res.lista)
    //   );

    const url = `${base_url}/operacion-financiera-pago/pagar`;
    return this.http.post(url, objeto)
      .pipe(
        map((res: { ok: boolean, recibo: [] }) => res.recibo)
      );
  }

  registrarIngresoEgreso(objeto: Object) {
    const url = `${base_url}/operacion-financiera-pago/registrar-ingreso-egreso`;
    return this.http.post(url, objeto)
      .pipe(
        map((res: { ok: boolean, recibo: [] }) => res.recibo)
      );
  }

  desembolsarProducto(id_operacion_financiera: string, modelo: OperaconFinancieraPago) {

    // return this.http.get(`${base_url}/operacion-financiera-pago/listar/${id_operacion_financiera}`)
    //   .pipe(
    //     map((res: { ok: boolean, lista: [] }) => res.lista)
    //   );

    const url = `${base_url}/operacion-financiera-pago/desembolsar/${id_operacion_financiera}`;

    // const url = `${base_url}/usuarios/${id}`;
    return this.http.put(url, modelo);

    // return this.http.post(url, objeto)
    //   .pipe(
    //     map((res: { ok: boolean, recibo: [] }) => res.recibo)
    //   );
  }

  anularRecibo(id_operacion_financiera: string, comentario: string) {

    // return this.http.get(`${base_url}/operacion-financiera-pago/listar/${id_operacion_financiera}`)
    //   .pipe(
    //     map((res: { ok: boolean, lista: [] }) => res.lista)
    //   );

    const modelo: any = {
      comentario: comentario
    }

    const url = `${base_url}/operacion-financiera-pago/anular-recibo/${id_operacion_financiera}`;

    // const url = `${base_url}/usuarios/${id}`;
    return this.http.put(url, modelo);

    // return this.http.post(url, objeto)
    //   .pipe(
    //     map((res: { ok: boolean, recibo: [] }) => res.recibo)
    //   );
  }

  prePagarProductoPorAnalista(lista: any[]) {

    // return this.http.get(`${base_url}/operacion-financiera-pago/listar/${id_operacion_financiera}`)
    //   .pipe(
    //     map((res: { ok: boolean, lista: [] }) => res.lista)
    //   );

    const model = {
      lista: lista
    };

    const url = `${base_url}/operacion-financiera-pago/pre-pagar-por-analista`;
    return this.http.post(url, model);
    // return this.http.post(url, objeto)
    //   .pipe(
    //     map((res: { ok: boolean, recibo: [] }) => res.recibo)
    //   );
  }

}
