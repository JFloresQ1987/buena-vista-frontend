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

  getOperacionesCajaInd(){
    const url = `${base_url}/caja-diario/caja`;
    return this.http.get(url);
  }

  getCajas(desde: string, hasta: string ){
    const url = `${base_url}/caja-diario?desde=${desde}&hasta=${hasta}`;
    console.log('servicio', desde);
    console.log('servicio1', hasta);
    return this.http.get(url);
  }

  getCajasFecha(fecha_apertura: string){
    const url = `${base_url}/caja-diario/fecha/${fecha_apertura}`;
    return this.http.get(url);
  }

  // ================= Verificar/Validar ==========

  validarMonto(){
    const url = `${base_url}/caja-diario/verificar-m`;
    return this.http.get(url)
  }
  validarRecibo(){
    const url = `${base_url}/caja-diario/verificar-r`;
    return this.http.get(url)
  }

  validarOperacionesFinancieras(){
    const url = `${base_url}/caja-diario/verificar-o`;
    return this.http.get(url)
  }


}
 