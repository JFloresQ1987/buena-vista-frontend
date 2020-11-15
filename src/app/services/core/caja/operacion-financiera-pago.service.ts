import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { OperaconFinancieraPago } from '../../../interfaces/core/registro/operacion-financiera-pago';
// import { UsuarioService } from '../registro/usuario.service';
import { SeguridadService } from '../../auth/seguridad.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class OperacionFinancieraPagoService {

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) { }

  listarPagos(analista: string) {

    // const headers = new HttpHeaders({
    //   'analista': modelo.analista
    // });

    return this.http.get(`${base_url}/operacion-financiera-pago/listar_pagos/${this.seguridadService.seguridad.id}/${analista}`)
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

  confirmarPagoAnalista(id_analista: string) {


    const url = `${base_url}/operacion-financiera-pago/confirmar-pago-analista/${id_analista}`;

    return this.http.put(url, null);
  }

}
