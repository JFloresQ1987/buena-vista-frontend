import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Analista } from '../../../interfaces/core/registro/analista.interface';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AnalistaService {

  constructor(private http: HttpClient) { }

  listar() {
    const url = `${base_url}/analistas`;
    return this.http.get(url);
  }

  crear(objeto: Analista) {
    const url = `${base_url}/analistas`;
    return this.http.post(url, objeto);
  }

  getAnalista(id: string) {
    const url = `${base_url}/analistas/${id}`;
    return this.http.get(url);
  }

  editar(id: string, objeto: Analista) {
    const url = `${base_url}/analistas/${id}`;
    return this.http.put(url, objeto);
  }

  getListaDesplegable() {
    const url = `${base_url}/analistas/lista-desplegable`;
    return this.http.get(url)
      .pipe(
        map((res: { ok: boolean, analistas: any }) => res.analistas)
      );;
  }

}
