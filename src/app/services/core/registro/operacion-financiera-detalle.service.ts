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
}
