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

  listarProductos(id_persona: string, tipo: string, estado: string) {
    
    return this.http.get(`${base_url}/operacion-financiera/listar-productos/${id_persona}/${tipo}/${estado}`)
    .pipe(
      map((res: { ok: boolean, lista: [] }) => res.lista)
    );
  }

  listarProductosXAnalista() {

    return this.http.get(`${base_url}/operacion-financiera/listar-productos-por-analista`)
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

  cambiarAnalista(id_operacion_financiera: string, analista: string, comentario: string) {

    const modelo: any = {
      analista: analista,
      comentario: comentario
    }

    const url = `${base_url}/operacion-financiera/cambiar-analista/${id_operacion_financiera}`;

    // const url = `${base_url}/usuarios/${id}`;
    return this.http.put(url, modelo);
  }

  anular(id_operacion_financiera: string, comentario: string) {

    const modelo: any = {
      comentario: comentario
    }

    const url = `${base_url}/operacion-financiera/anular/${id_operacion_financiera}`;

    // const url = `${base_url}/usuarios/${id}`;
    return this.http.put(url, modelo);
  }

  congelar_descongelar(id_operacion_financiera: string, comentario: string) {

    const modelo: any = {
      comentario: comentario
    }

    const url = `${base_url}/operacion-financiera/congelar_descongelar/${id_operacion_financiera}`;

    // const url = `${base_url}/usuarios/${id}`;
    return this.http.put(url, modelo);
  }
}
