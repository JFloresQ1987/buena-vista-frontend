import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Usuario } from '../../../interfaces/core/registro/usuario.interface';


const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  listar() {
    const url = `${base_url}/usuarios`;
    return this.http.get(url);
  }

  crear(objeto: Usuario) {
    const url = `${base_url}/usuarios`;
    return this.http.post(url, objeto);
  }

  getUsuario(id:string){
    const url = `${base_url}/usuarios/${id}`;
    return this.http.get(url);
  }

  editar(id:string, objeto: Usuario){
    const url = `${base_url}/usuarios/${id}`;
    return this.http.put(url,objeto);
  }

  listarxrol(rol:string){
    const url = `${base_url}/usuarios/rol/${rol}`;
    return this.http.get(url);
  }

}
