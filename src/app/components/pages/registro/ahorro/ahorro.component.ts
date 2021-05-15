import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Socio } from '../../../../models/core/socio.model';
import { OperacionFinancieraService } from '../../../../services/core/registro/operacion-financiera.service';
import { SesionSocioService } from '../../../../services/shared/sesion-socio.service';
import { ProductoService } from '../../../../services/core/configuracion/producto.service';
import { AnalistaService } from '../../../../services/core/registro/analista.service';
import Swal from 'sweetalert2';
import * as dayjs from 'dayjs';
import { OperaconFinanciera } from '../../../../interfaces/core/registro/operacion-financiera.interface';
import { OperacionFinancieraPagoService } from '../../../../services/core/caja/operacion-financiera-pago.service';
import { Recibo } from '../../../../helpers/core/recibo';

@Component({
  selector: 'app-ahorro',
  templateUrl: './ahorro.component.html',
  styles: [
  ]
})
export class AhorroComponent implements OnInit {

  // public cargando: boolean = false;
  public cargando: boolean = true;
  public calculado: boolean = false;
  public form: FormGroup;
  public formSubmitted = false;
  // public cantidad_cuotas: number;
  public programacion_pago = [];
  public analistas = [];
  public configuracion_pago: any = {};
  public cuotas = [];
  public sesionSocio: Socio;
  // public tipo_operacion_financiera: string;
  public tipos = [];
  // public grupo_bancomunal = [];
  public fecha_fin = '';
  // public color: string;
  // public programacion: string;

  constructor(private service: OperacionFinancieraPagoService,
    // pri
    private formBuilder: FormBuilder,
    private sesionSocioService: SesionSocioService,
    private productoService: ProductoService,
    private analistaService: AnalistaService/*,
    private grupoBancomunalService: GrupoBancomunalService*/) {

    this.sesionSocio = this.sesionSocioService.sesionSocio;
  }

  ngOnInit(): void {

    setTimeout(() => {
      // this.listarProductos();
      if (this.sesionSocio.id === '0') {

        // this.cargando = true;
        Swal.fire({
          text: "Primero debe buscar un socio.", icon: 'warning'
        });
      }
      else {

        this.cargando = false;
      }
    }, 100);

    this.form = this.formBuilder.group({
      tipo: ['', [Validators.required]],
      programacion_pago: [''],
      analista: ['', [Validators.required]],
      tasa_interes_ganado: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(10)]],
      monto_ahorro_voluntario: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(10)]],
      monto_gasto: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(10)]],
      monto_interes: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(10)]],
      comentario: ['', [Validators.required, Validators.maxLength(200)]]
    });

    this.productoService.listar(false, false)
      .subscribe(res => {
        this.tipos = res;
      });

    // this.form.get('tipo').valueChanges
    //   .subscribe(tipo => {

    //     if (this.programacion_pago.length > 0)
    //       this.form.get('programacion_pago').setValidators([Validators.required]);
    //     else
    //       this.form.get('programacion_pago').setValidators(null);

    //     // if (tipo === 'student') {
    //     //   this.form.get('programacion_pago').setValidators([Validators.required]);
    //     //   // companyControl.setValidators(null);
    //     //   // salaryControl.setValidators(null);
    //     // }

    //     // if (tipo === 'employee') {
    //     //   this.form.get('programacion_pago').setValidators(null);
    //     //   // companyControl.setValidators([Validators.required]);
    //     //   // salaryControl.setValidators([Validators.required]);
    //     // }

    //     this.form.get('programacion_pago').updateValueAndValidity();
    //     // companyControl.updateValueAndValidity();
    //     // salaryControl.updateValueAndValidity();
    //   });
  }

  volverCalcular() {

    this.calculado = false;
  }

  buscarProgramacionPago(tipo: string) {

    this.form.get('programacion_pago').setValue('');
    // this.form.get('analista').setValue('');

    this.calculado = false;

    // this.programacion_pago = [];

    if (!tipo) {

      this.programacion_pago = [];
      this.analistas = [];
      this.form.get('monto_gasto').setValue(0);
      this.form.get('tasa_interes_ganado').setValue(0);
      // this.form.get('tasa_ahorro_programado').setValue(0);
      // this.form.get('tasa_ahorro_inicial').setValue(0);
      this.form.get('monto_interes').setValue(0);
      // this.form.get('monto_ahorro_programado').setValue(0);
      // this.form.get('monto_ahorro_inicial').setValue(0);
      return;
    }

    // this.form.get('programacion_pago').valueChanges
    //   .subscribe(userCategory => {

    //     if (userCategory === 'student') {
    //       institutionControl.setValidators([Validators.required]);
    //       companyControl.setValidators(null);
    //       salaryControl.setValidators(null);
    //     }

    //     if (userCategory === 'employee') {
    //       institutionControl.setValidators(null);
    //       companyControl.setValidators([Validators.required]);
    //       salaryControl.setValidators([Validators.required]);
    //     }

    //     institutionControl.updateValueAndValidity();
    //     companyControl.updateValueAndValidity();
    //     salaryControl.updateValueAndValidity();
    //   });

    // else
    this.productoService.listar_programacion(tipo)
      .subscribe(res => {
        this.programacion_pago = res.lista;
        this.configuracion_pago = res.configuracion;

        this.form.get('monto_gasto').setValue(this.configuracion_pago.monto_gasto);
        this.form.get('tasa_interes_ganado').setValue(this.configuracion_pago.tasa_interes_ganado);
        // this.form.get('tasa_ahorro_programado').setValue(this.configuracion_pago.tasa_ahorro_programado);
        // this.form.get('tasa_ahorro_inicial').setValue(this.configuracion_pago.tasa_ahorro_inicial);

        this.calcularMontoInteres();
        this.validar();
        // this.calcularMontoAhorroProgramado();
        // this.calcularMontoAhorroInicial();
      });

    this.analistaService.getListaDesplegablexProducto(tipo)
    .subscribe(res => {
      this.analistas = res;
    });    
  }

  validar() {

    if (this.programacion_pago.length > 0)
      this.form.get('programacion_pago').setValidators([Validators.required]);
    else
      this.form.get('programacion_pago').setValidators(null);

    this.form.get('programacion_pago').updateValueAndValidity();
  }

  guardar() {

    // this.cargando = true;

    if (this.sesionSocio.id === '0') {
      Swal.fire({
        text: "Primero debe buscar un socio.", icon: 'warning'
      });
      return;
    }

    // if (!this.calculado) {
    //   Swal.fire({
    //     text: "Ha modificado los datos de cálculo, por lo que debe volver a ejecutar el cálculo.", icon: 'warning'
    //   });
    //   return;
    // }

    this.formSubmitted = true;
    if (!this.form.valid) {
      Swal.fire({
        text: "Validar la información proporcionada.", icon: 'warning'
      });
      return;
    }


    // const tipoX = this.tipos.find(tipo => tipo.id == this.form.get('tipo').value);
    // const programacionX = this.programacion_pago.find(programacion => programacion.id == this.form.get('programacion_pago').value);
    // let color: string;
    const id_tipo = this.form.get('tipo').value;
    const tipo = this.tipos.find(item => item.id === id_tipo);
    // const programacion = this.programacion_pago.find(programacion => programacion.id == this.form.get('programacion_pago').value);
    const codigo_programacion = this.form.get('programacion_pago').value;
    let programacion: any;

    if (codigo_programacion)
      programacion = this.programacion_pago.find(item => item.codigo === codigo_programacion);

    // if (tipo.codigo == 'CD')
    //   color = "inverse";
    // else if (tipo.codigo == 'CP' || tipo.codigo == 'CM')
    //   color = "success";
    // else
    //   color = "primary";

    const modelo: OperaconFinanciera = this.form.value;

    modelo.producto = {
      tipo: id_tipo,
      codigo: tipo.codigo,
      descripcion: tipo.descripcion,
      codigo_programacion: programacion ? codigo_programacion : '',
      // codigo_programacion: programacion ? programacion.codigo_programacion : '',
      programacion: programacion ? programacion.descripcion : '',
      color: tipo.color,
      es_prestamo: false
      // color: color
    };

    // modelo.producto.tipo = id_tipo;//tipo.id;
    // modelo.producto.codigo_programacion = programacion.codigo_programacion;
    // modelo.producto.programacion = programacion.descripcion;
    // modelo.producto.color = color;

    modelo.configuracion = {
      tasa_aporte_capital: 0,//this.form.get('tasa_aporte_capital').value,
      tasa_ahorro_inicial: 0,//this.form.get('tasa_ahorro_inicial').value,
      tasa_ahorro_programado: 0,//this.form.get('tasa_ahorro_programado').value,
      tasa_interes: 0,//this.form.get('tasa_interes_ganado').value,
      tasa_interes_ganado: this.form.get('tasa_interes_ganado').value,
      tasa_mora: 0
    };

    // modelo.configuracion.tasa_aporte_capital = this.form.get('tasa_aporte_capital').value;
    // modelo.configuracion.tasa_ahorro_inicial = this.form.get('tasa_ahorro_inicial').value;
    // modelo.configuracion.tasa_ahorro_programado = this.form.get('tasa_ahorro_programado').value;
    // modelo.configuracion.tasa_interes_ganado = this.form.get('tasa_interes_ganado').value;
    // modelo.configuracion.tasa_mora = 0;

    // modelo.bancomunal.grupo_bancomunal='';
    // modelo.bancomunal.numero_ciclo = 0;
    modelo.persona = this.sesionSocio.id;
    // modelo.analista = '';
    modelo.estado = 'Vigente'
    modelo.fecha_inicio = dayjs().format('DD/MM/YYYY');//this.form.get('fecha_inicio').value;
    modelo.fecha_fin = dayjs().format('DD/MM/YYYY');//this.fecha_fin;
    modelo.monto_gasto = this.form.get('monto_gasto').value;
    // modelo.monto_ahorro_inicial = 0;//this.form.get('monto_ahorro_inicial').value;
    // modelo.monto_capital = 0;//this.form.get('monto_capital').value;
    // modelo.detalle = this.cuotas;
    modelo.monto_recibido = this.form.get('monto_ahorro_voluntario').value,

    this.cuotas.push({
      estado: 'Vigente',
      numero_cuota: 1,
      nombre_dia_cuota: '',
      fecha_cuota: dayjs().format('DD/MM/YYYY'),
      fecha_plazo_cuota: dayjs().format('DD/MM/YYYY'),
      ingresos: {
        monto_gasto: this.form.get('monto_gasto').value,
      },
      ahorros: {
        // monto_ahorro_inicial: 0
        monto_ahorro_voluntario: this.form.get('monto_ahorro_voluntario').value,
      }
    });

    // modelo.detalle = [{
    //   estado: 'Vigente',
    //   numero_cuota: 1,
    //   nombre_dia_cuota: '',
    //   fecha_cuota: dayjs().format('DD/MM/YYYY'),
    //   fecha_plazo_cuota: dayjs().format('DD/MM/YYYY'),
    //   ingresos: {
    //     monto_gasto: this.form.get('monto_gasto').value,
    //   },
    //   ahorros: {
    //     monto_ahorro_inicial: 0
    //   }
    // }];

    modelo.detalle = this.cuotas;

    // this.cuotas.push({
    //   estado: 'Pendiente',
    //   numero_cuota: 0,
    //   nombre_dia_cuota: '',
    //   fecha_cuota: dayjs().format('DD/MM/YYYY'),
    //   fecha_plazo_cuota: dayjs().format('DD/MM/YYYY'),
    //   ingresos: {
    //     monto_gasto: this.form.get('monto_gasto').value,
    //   },
    //   ahorros: {
    //     monto_ahorro_inicial: this.form.get('monto_ahorro_inicial').value
    //   }
    // });

    // this.cuotas.push({
    //   numero_cuota: 0,
    //   fecha_cuota: dayjs().format('DD/MM/YYYY'),
    //   monto_gasto: this.form.get('monto_gasto').value,
    //   monto_ahorro_inicial: this.form.get('monto_ahorro_inicial').value
    // });

    this.cargando = true;

    this.service.crearPagarAhorro(modelo)
      .subscribe(res => {

        Swal.fire({
          text: 'La información se guardó satisfactoriamente.', icon: 'success'
        });

        const recibo = new Recibo();

        recibo.imprimirRecibo(res)

        this.cancelar();
        this.cargando = false;

      });
  }

  cancelar() {

    this.cuotas = [];

    this.formSubmitted = false;
    this.form.reset();
  }

  validarCampo(campo: string, validar: string): boolean {



    if (this.form.get(campo).hasError(validar) &&
      (this.formSubmitted || this.form.get(campo).touched))
      return true;
    else
      return false;
  }

  validarError(campo: string): boolean {

    if (this.form.get(campo).invalid &&
      (this.formSubmitted || this.form.get(campo).touched))
      return true;
    else
      return false;
  }

  validarSuccess(campo: string): boolean {

    if (this.form.get(campo).valid &&
      (this.formSubmitted || this.form.get(campo).touched))
      return true;
    else
      return false;
  }

  calcularMontos() {

    const monto_ahorro_voluntario: number = this.form.get('monto_ahorro_voluntario').value;

    if (monto_ahorro_voluntario <= 0)
      return;

    const tasa_interes_ganado: number = this.form.get('tasa_interes_ganado').value;

    if (tasa_interes_ganado >= 0) {

      this.calcularMontoInteres();

      // const tasa_ahorro_programado: number = this.form.get('tasa_ahorro_programado').value;

      // if (tasa_ahorro_programado > 0)
      //   this.calcularMontoAhorroProgramado();
    }

    // const tasa_ahorro_inicial: number = this.form.get('tasa_ahorro_inicial').value;

    // if (tasa_ahorro_inicial > 0)
    //   this.calcularMontoAhorroInicial();
  }

  calcularMontoInteres() {

    const monto_ahorro_voluntario: number = this.form.get('monto_ahorro_voluntario').value;

    if (monto_ahorro_voluntario <= 0)
      return;

    const tasa_interes_ganado: number = this.form.get('tasa_interes_ganado').value;

    let monto_interes = 0;

    if (tasa_interes_ganado > 0)
      monto_interes = (monto_ahorro_voluntario * tasa_interes_ganado) / 100;

    this.form.get('monto_interes').setValue(monto_interes.toFixed(2));

    // const tasa_ahorro_programado: number = this.form.get('tasa_ahorro_programado').value;

    // if (tasa_ahorro_programado > 0)
    //   this.calcularMontoAhorroProgramado();
  }

  calcularTasaInteres() {

    const monto_ahorro_voluntario: number = this.form.get('monto_ahorro_voluntario').value;

    if (monto_ahorro_voluntario <= 0)
      return;

    const monto_interes: number = this.form.get('monto_interes').value;

    let tasa_interes_ganado = 0;

    if (monto_interes > 0)
      tasa_interes_ganado = (monto_interes * 100) / monto_ahorro_voluntario;

    this.form.get('tasa_interes_ganado').setValue(tasa_interes_ganado);

    // const tasa_ahorro_programado: number = this.form.get('tasa_ahorro_programado').value;

    // if (tasa_ahorro_programado > 0)
    //   this.calcularMontoAhorroProgramado();
  }

  // calcularMontoAhorroInicial() {

  //   const monto_capital: number = this.form.get('monto_capital').value;

  //   if (monto_capital <= 0)
  //     return;

  //   const tasa_ahorro_inicial: number = this.form.get('tasa_ahorro_inicial').value;

  //   let monto_ahorro_inicial = 0;

  //   if (tasa_ahorro_inicial > 0)
  //     monto_ahorro_inicial = (monto_capital * tasa_ahorro_inicial) / 100;

  //   this.form.get('monto_ahorro_inicial').setValue(monto_ahorro_inicial.toFixed(2));
  // }

  // calcularTasaAhorroInicial() {

  //   const monto_capital: number = this.form.get('monto_capital').value;

  //   if (monto_capital <= 0)
  //     return;

  //   const monto_ahorro_inicial: number = this.form.get('monto_ahorro_inicial').value;

  //   let tasa_ahorro_inicial = 0;

  //   if (monto_ahorro_inicial > 0)
  //     tasa_ahorro_inicial = (monto_ahorro_inicial * 100) / monto_capital;

  //   this.form.get('tasa_ahorro_inicial').setValue(tasa_ahorro_inicial);
  // }

  // calcularMontoAhorroProgramado() {

  //   const monto_capital: number = Number(this.form.get('monto_capital').value);
  //   const monto_interes: number = Number(this.form.get('monto_interes').value);
  //   const monto_cuota: number = monto_capital + monto_interes;

  //   if (monto_cuota <= 0)
  //     return;

  //   const tasa_ahorro_programado: number = this.form.get('tasa_ahorro_programado').value;

  //   let monto_ahorro_programado = 0;

  //   if (tasa_ahorro_programado > 0)
  //     monto_ahorro_programado = (monto_cuota * tasa_ahorro_programado) / 100;

  //   this.form.get('monto_ahorro_programado').setValue(monto_ahorro_programado.toFixed(2));
  // }

  // calcularTasaAhorroProgramado() {

  //   const monto_capital: number = Number(this.form.get('monto_capital').value);
  //   const monto_interes: number = Number(this.form.get('monto_interes').value);
  //   const monto_cuota: number = monto_capital + monto_interes;

  //   if (monto_cuota <= 0)
  //     return;

  //   const monto_ahorro_programado: number = this.form.get('monto_ahorro_programado').value;

  //   let tasa_ahorro_programado = 0;

  //   if (monto_ahorro_programado > 0)
  //     tasa_ahorro_programado = (monto_ahorro_programado * 100) / monto_cuota;

  //   this.form.get('tasa_ahorro_programado').setValue(tasa_ahorro_programado.toFixed(2));
  // }

}
