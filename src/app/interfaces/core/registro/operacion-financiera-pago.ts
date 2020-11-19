export interface OperaconFinancieraPago {
    operacion_financiera: string,
    monto_recibido: number,
    monto_ahorro_voluntario: number,
    cuotas: string[],
    id_socio: string,
    documento_identidad_socio: string,
    nombres_apellidos_socio: string,
    es_ingreso: boolean
}