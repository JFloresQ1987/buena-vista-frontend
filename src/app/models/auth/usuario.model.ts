import { environment } from '../../../environments/environment';

const base_url = environment.base_url;

export class Usuario {

    constructor(
        public id?: string,
        public usuario?: string,
        public nombre_completo?: string,
        public correo?: string,
        public avatar?: string,
        public roles?: string[]
    ) { }

    getId() {
        return this.id;
    }

    getUsuario() {
        return this.usuario;
    }

    getAvatar() {

        // if (this.avatar)
        //     return `${base_url}/images/${this.avatar}`;
        // else
            return `${base_url}/upload/avatar.png`;
    }
}