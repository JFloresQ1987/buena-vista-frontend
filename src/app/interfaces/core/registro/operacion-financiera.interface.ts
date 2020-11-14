export interface OperaconFinanciera {
    // producto: {
    //     tipo: String,
    //     codigo_programacion: String,
    //     programacion: String,
    //     color: String
    // },
    producto: Producto;
    // configuracion: {
    //     tasa_ahorro_inicial: number,
    //     tasa_aporte_capital: number,
    //     tasa_ahorro_programado: number,
    //     tasa_interes: number,
    //     tasa_mora: number,
    // },
    configuracion: Configuracion;
    // bancomunal: {
    //     grupo_bancomunal: String,
    //     numero_ciclo: number
    // },
    bancomunal: Bancomunal;
    persona: String,
    analista: String,
    estado: String,
    // numero_ciclo: number,
    fecha_inicio: String,
    fecha_fin: String,
    monto_gasto: number,
    monto_ahorro_inicial: number,
    monto_capital: number,
    // tasa_aporte_inicial: number,
    // tasa_aporte_capital: number,
    // tasa_aporte_programado: number,
    // tasa_interes: number,
    // tasa_mora: number,
    se_desembolso_prestamo: boolean,
    comentario: String,
    detalle: OperaconFinancieraDetalle[]
}

export interface Producto {

    tipo: any,
    // descripcion: String,
    codigo_programacion: String,
    programacion: String,
    color: String,
    es_prestamo: boolean
}

export interface Configuracion {
    tasa_ahorro_inicial: number,
    tasa_aporte_capital: number,
    tasa_ahorro_programado: number,
    tasa_interes: number,
    tasa_interes_ganado: number,
    tasa_mora: number,
}

export interface Bancomunal {
    grupo_bancomunal: String,
    numero_ciclo: number
}

export interface OperaconFinancieraDetalle {
    bancomunal: String,
    persona: String,
    numero_cuota: Number,
    fecha_cuota: String,
    // fecha_cuota_visual,
    fecha_plazo_cuota: String,
    ingresos: {
        monto_gasto: Number,
        monto_amortizacion_capital: Number,
        monto_interes: Number,
        monto_mora: Number
    },
    ahorros: {
        monto_ahorro_inicial: Number,
        monto_ahorro_programado: Number
    },
    monto_saldo_capital: Number
}