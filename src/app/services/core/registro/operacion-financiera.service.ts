import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { OperaconFinanciera } from '../../../interfaces/core/registro/operacion-financiera.interface';

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

    return this.http.get(`${base_url}/operacion-financiera/listar/${id_persona}`);
  }
}
