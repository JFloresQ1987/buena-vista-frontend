import { environment } from '../../../environments/environment';

const base_url = environment.base_url;

export class Seguridad {

    constructor(
        public id?: string,
        public usuario?: string,
        public local_atencion?: string,
        public nombre?: string,
        public apellido_paterno?: string,
        public apellido_materno?: string,
        public fecha_nacimiento?: string,
        public es_masculino?: boolean,
        public correo_electronico?: string,
        public avatar?: string,
        public rol?: string[]
    ) { }    

    getNombreCompleto() {
        return `${this.nombre} ${this.apellido_paterno} ${this.apellido_materno}`;
    }

    getAvatar() {

        if (this.avatar)
            return `${base_url}/upload/${this.avatar}`;
        else
            return this.es_masculino ? `${base_url}/upload/male.png` : `${base_url}/upload/female.png`;
    }
}