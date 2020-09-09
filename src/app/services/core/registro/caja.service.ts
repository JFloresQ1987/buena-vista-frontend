import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { Caja } from '../../../interfaces/core/registro/caja.interface';
import { map } from 'rxjs/operators';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class CajaService {

  constructor(private http: HttpClient) {
  }

   
  crear(objeto: Caja){
    const url = `${ base_url }/caja`;
    return this.http.post(url, objeto)
  }

  listar() {
    const url = `${base_url}/caja`;
    return this.http.get(url);
  }
  
  obtenerCaja(id: String){
    const url = `${ base_url }/caja/${id}`;
    return this.http.get(url)
                .pipe(
                  map((resp: {ok: boolean, caja: Caja}) => resp.caja)
                )
  }
    
  actualizar(objeto: Caja){
    const url = `${ base_url }/caja/${objeto.id}`;
    return this.http.put(url, objeto);
  }  

}
