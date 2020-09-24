import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CierreCajaIndividual } from '../../../interfaces/core/registro/cierre-caja.inteface';


const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class CierreCajaIndividualService {

  constructor( private http: HttpClient ) { }

  getCierreCaja(objeto: CierreCajaIndividual){
    const url = `${base_url}/caja-diario/${objeto.id}`;
    return this.http.put(url, objeto);
  }

  getOperacionesCajaInd(id: string){
    const url = `${base_url}/caja-diario/${id}`;
    return this.http.get(url);
  }

}
 