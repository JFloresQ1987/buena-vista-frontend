import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  listar() {

    return this.http.get(`${base_url}/producto/listar`)
      .pipe(
        map((res: { ok: boolean, lista: [] }) => res.lista)
      );
  }

  listar_programacion(id: string) {

    return this.http.get(`${base_url}/producto/listar-programacion/${id}`)
      .pipe(
        map((res: any) => res)
        // map((res: { ok: boolean, lista: [] }) => res.lista)
      );
  }
}
