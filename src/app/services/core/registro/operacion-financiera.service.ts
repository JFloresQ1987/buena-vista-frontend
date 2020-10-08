import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { OperaconFinanciera } from '../../../interfaces/core/registro/operacion-financiera.interface';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class OperacionFinancieraService {

  constructor(private http: HttpClient) { }

  crear(objeto: OperaconFinanciera) {

    const url = `${base_url}/operacion-financiera`;
    return this.http.post(url, objeto);
  }

  listarProductos(id_persona: string) {

    return this.http.get(`${base_url}/operacion-financiera/listar-productos/${id_persona}`)
    .pipe(
      map((res: { ok: boolean, lista: [] }) => res.lista)
    );
  }

  listarProducto(id_operacion_financiera: string) {

    return this.http.get(`${base_url}/operacion-financiera/listar-producto/${id_operacion_financiera}`)
      .pipe(
        map((res: { ok: boolean, modelo: OperaconFinanciera }) => res.modelo)
      );
  }
}
