import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
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
    return this.http.post(url, objeto);
  }
}
