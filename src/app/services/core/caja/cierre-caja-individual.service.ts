import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CierreCajaIndividual } from '../../../interfaces/core/registro/cierre-caja.interface';


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

  getOperacionesCajaInd(caja: string){
    const url = `${base_url}/caja-diario/${caja}`;
    return this.http.get(url);
  }

  getCajas(){
    const url = `${base_url}/caja-diario/`;
    return this.http.get(url);
  }

}
 