export interface OperaconFinanciera {
    tipo: String,
    estado: String,
    numero_ciclo: number,
    fecha_inicio: String,
    fecha_fin: String,
    tasa_aporte_inicial: number,
    tasa_aporte_capital: number,
    tasa_aporte_programado: number,
    tasa_interes: number,
    tasa_mora: number,
    se_desembolso_prestamo: boolean,
    comentario: String,
    persona: String,
    detalle: Object[]
}