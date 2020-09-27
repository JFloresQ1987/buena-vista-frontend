import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

const base_url = environment.base_url
@Injectable({
  providedIn: 'root'
})
export class UbigeoService {
  constructor(private http: HttpClient) { }

  listarDepartamentos(){
    const url = `${base_url}/ubigeo`;
    return this.http.get(url);
  }

  listarProvinciasxDepartamento(departamento: string){
    const url = `${base_url}/ubigeo/${departamento}`;
    return this.http.get(url);
  }

  listarDistritosxProvincia(departamento: string, provincia: string){
    const url = `${base_url}/ubigeo/${departamento}/${provincia}`;
    return this.http.get(url);
  }
}
