import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SeguridadService } from '../../auth/seguridad.service';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService) { }

  consultarSaldoCredito(analista: string, desde: string, hasta: string) {

    // const headers = new HttpHeaders({
    //   'analista': modelo.analista
    // });

    return this.http.get(`${base_url}/reporte/consultar-saldo-credito/${this.seguridadService.seguridad.id}/${analista}/${desde}/${hasta}`)
    // .pipe(
    //   map((res: { ok: boolean, lista: [] }) => res.lista)
    // );
  }
}
