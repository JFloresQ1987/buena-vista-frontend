import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PagoConceptoService {

  constructor(private http: HttpClient) { }

  listarConceptos(es_ingreso: string) {
    const url = `${base_url}/pago-concepto/${es_ingreso}`;
    return this.http.get(url);
  }

  listarSubConceptos(id: string) {
    const url = `${base_url}/pago-concepto/subconceptos/${id}`;
    return this.http.get(url);
  }


}
