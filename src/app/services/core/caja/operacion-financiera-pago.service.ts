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
    return this.http.post(url, objeto);
  }

  registrarIngresoEgreso(objeto: Object){
    const url = `${base_url}/operacion-financiera-pago/registrar-ingreso-egreso`;
    return this.http.post(url, objeto);
  }

}
