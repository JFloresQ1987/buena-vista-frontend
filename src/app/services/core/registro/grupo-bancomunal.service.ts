import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class GrupoBancomunalService {

  constructor(private http: HttpClient) { }

  getListaDesplegable() {
    const url = `${base_url}/grupo-bancomunal/lista-desplegable`;
    return this.http.get(url)
      .pipe(
        map((res: { ok: boolean, lista: [] }) => res.lista)
      );
  }
}
