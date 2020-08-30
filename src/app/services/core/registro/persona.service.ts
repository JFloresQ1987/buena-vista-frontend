import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { map } from 'rxjs/operators';

import { Persona } from '../../../interfaces/core/registro/persona.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http: HttpClient) {
    console.log('entro para buscando persona')
  }

   
  crear(objeto: Persona){
    const url = `${ base_url }/personas`;
    return this.http.post(url, objeto)
  }

  obtenerPersona(id: String){
    const url = `${ base_url }/personas/${id}`;
    return this.http.get(url)
                .pipe(
                  map((resp: {ok: boolean, persona: Persona}) => resp.persona)
                )
  }
    
  actualizar(objeto: Persona){
    const url = `${ base_url }/personas/${objeto.id}`;
    return this.http.put(url, objeto);
  }  
  

}
