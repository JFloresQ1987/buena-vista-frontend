import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private base_url = environment.base_url;
  
  constructor(private http:HttpClient) { }

  buscarSocio(documento_identidad: string){

    const url = `${ this.base_url }/personas/buscar_socio/${ documento_identidad }`;

    return this.http.get(url);
  }
}
