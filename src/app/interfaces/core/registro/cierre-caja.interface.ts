export interface CierreCajaIndividual {
    id?: String,
    caja?:String,
    cajero?: String,
    local_atencion?: String,
    fecha_apertura: String,
    monto_total_apertura?: Number,
    monto_total_operaciones?: Number,
    cantidad_opreaciones?: Number,
    cantidad_doscientos_soles_cierre: Number,
    cantidad_cien_soles_cierre: Number,
    cantidad_cincuenta_soles_cierre: Number,
    cantidad_veinte_soles_cierre: Number,
    cantidad_diez_soles_cierre: Number,
    cantidad_cinco_soles_cierre: Number,
    cantidad_dos_soles_cierre: Number,
    cantidad_un_sol_cierre: Number,
    cantidad_cincuenta_centimos_cierre: Number,
    cantidad_veinte_centimos_cierre: Number,
    cantidad_diez_centimos_cierre: Number,    
    comentario: String
}