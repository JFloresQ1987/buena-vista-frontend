import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class OperacionFinancieraDetalleService {

  constructor(private http: HttpClient) { }

  listarProductoDetalle(id_operacion_financiera: string) {

    return this.http.get(`${base_url}/operacion-financiera-detalle/listar/${id_operacion_financiera}`)
      .pipe(
        map((res: { ok: boolean, lista: [] }) => res.lista)
      );
  }

  obtenerOperacionFinancieraDetalle(id: string){
    return this.http.get(`${base_url}/operacion-financiera-detalle/${id}`);
  }

  actualizarOperacionFinancieraDetalle(id: string, data: Object){
    return this.http.put(`${base_url}/operacion-financiera-detalle/${id}`,data);
  }

  operacionFinancieraDetalleBaja(id: string){
    return this.http.get(`${base_url}/operacion-financiera-detalle/cuota_baja/${id}`);
  }

  obtenerAhorros(id_operacion_financiera: string) {

    return this.http.get(`${base_url}/operacion-financiera-detalle/obtener-ahorros/${id_operacion_financiera}`)
      .pipe(
        map((res: { ok: boolean, ahorros: any }) => res.ahorros)
      );
  }
}
