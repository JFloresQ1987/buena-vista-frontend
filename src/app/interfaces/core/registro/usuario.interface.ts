export interface Usuario {
    id?: String,
    nombre: String,
    apellido_paterno: String,
    apellido_materno: String,
    documento_identidad: String,
    fecha_nacimiento: String,
    es_masculino: boolean,
    numero_telefono: String,
    numero_celular: String,
    correo_electronico: String,
    domicilio: String,
    rol: Array<string>[]
    ubigeo: Ubigeo
}

export interface Ubigeo {

    departamento: String,
    provincia: String,
    distrito: String
}