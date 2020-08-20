export class Usuario {
    
    constructor(
        public usuario?: string,        
        public nombre_completo?: string,
        public correo?: string,
        public avatar?: string,
        public roles?: string[],
        public id?: string
    ) { }

    getId(){
        return this.id;
    }

    getUsuario(){
        return this.usuario;
    }
}