import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import * as dayjs from 'dayjs';
import { OperacionFinancieraService } from '../../../../services/core/registro/operacion-financiera.service';
import { OperaconFinanciera } from '../../../../interfaces/core/registro/operacion-financiera.interface';
import { SesionSocioService } from '../../../../services/shared/sesion-socio.service';
import { Socio } from '../../../../models/core/socio.model';
import { ProductoService } from '../../../../services/core/configuracion/producto.service';
// import * as updateLocale from 'dayjs/plugin/updateLocale';
import { UsuarioService } from '../../../../services/core/registro/usuario.service';
import { AnalistaService } from '../../../../services/core/registro/analista.service';
import { GrupoBancomunalService } from '../../../../services/core/registro/grupo-bancomunal.service';

@Component({
  selector: 'app-operacion-financiera',
  templateUrl: './operacion-financiera.component.html',
  styleUrls: ['./operacion-financiera.component.css']
})
export class OperacionFinancieraComponent implements OnInit {

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

  constructor(private service: OperacionFinancieraService,
    private formBuilder: FormBuilder,
    private sesionSocioService: SesionSocioService,
    private productoService: ProductoService,
    private analistaService: AnalistaService/*,
    private grupoBancomunalService: GrupoBancomunalService*/) {

    this.sesionSocio = this.sesionSocioService.sesionSocio;
  }

  ngOnInit(): void {

    setTimeout(() => {
      // console.log(this.socio.getNombreCompleto());
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
      programacion_pago: ['', [Validators.required]],
      // grupo_bancomunal: ['', [Validators.required]],
      analista: ['', [Validators.required]],
      tasa_interes: ['6', [Validators.required, Validators.min(0), Validators.maxLength(10)]],
      // tasa_mora: ['0', [Validators.required, Validators.min(0), Validators.maxLength(10)]],
      tasa_ahorro_programado: ['20', [Validators.required, Validators.min(0), Validators.maxLength(10)]],
      tasa_ahorro_inicial: ['10', [Validators.required, Validators.min(0), Validators.maxLength(10)]],
      monto_capital: ['', [Validators.required, Validators.min(1), Validators.maxLength(10)]],
      monto_gasto: ['6.7', [Validators.required, Validators.min(1), Validators.maxLength(10)]],
      monto_ahorro_inicial: ['', [Validators.required, Validators.min(0), Validators.maxLength(10)]],
      monto_interes: ['', [Validators.required, Validators.min(0), Validators.maxLength(10)]],
      // monto_mora: ['', [Validators.required, Validators.min(0), Validators.maxLength(10)]],
      monto_ahorro_programado: ['', [Validators.required, Validators.min(0), Validators.maxLength(10)]],
      // cantidad_cuotas: ['', [Validators.required, Validators.min(1), Validators.maxLength(3)]],
      fecha_inicio: [dayjs().format('YYYY-MM-DD'), [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      incluir_sabados: [true, Validators.required],
      comentario: ['', [Validators.required, Validators.maxLength(200)]]
    });

    this.productoService.listar()
      .subscribe(res => {
        this.tipos = res;
      });

    // this.grupoBancomunalService.getListaDesplegable()
    //   .subscribe(res => {
    //     this.grupo_bancomunal = res;
    //   });

    // this.analistaService.getListaDesplegablexProducto()
    //   .subscribe(res => {
    //     this.analistas = res;
    //     // console.log(this.analistas)
    //   });

    // this.productoService.listar_programacion(0)
    // .subscribe(res => {
    //   this.tipos = res;
    // });
    // this.cantidad_cuotas = 10;//this.form.get('cantidad_cuotas').value || 10;
  }

  volverCalcular() {

    this.calculado = false;
  }

  buscarProgramacionPago(tipo: string) {

    // const tipo = event.target.value;
    // this.programacion = event.target.options[event.target.options.selectedIndex].text;

    // this.form.setValue('programacion_pago') = "";
    // this.form.setValue({ "programacion_pago": '' });

    // element.getAttribute('formControlName')

    // console.log(tipo)
    // console.log(this.form. .getAttribute('formControlName'))


    // this.form.controls.programacion_pago.setValue('');
    // this.form.controls.analista.setValue('');
    this.form.get('programacion_pago').setValue('');
    this.form.get('analista').setValue('');

    this.calculado = false;

    // this.programacion_pago = [];

    if (!tipo) {

      this.programacion_pago = [];
      this.analistas = [];
      this.form.get('monto_gasto').setValue(0);
      this.form.get('tasa_interes').setValue(0);
      this.form.get('tasa_ahorro_programado').setValue(0);
      this.form.get('tasa_ahorro_inicial').setValue(0);
      this.form.get('monto_interes').setValue(0);
      this.form.get('monto_ahorro_programado').setValue(0);
      this.form.get('monto_ahorro_inicial').setValue(0);
      return;
    }
    // else
    this.productoService.listar_programacion(tipo)
      .subscribe(res => {
        this.programacion_pago = res.lista;
        this.configuracion_pago = res.configuracion;
        // console.log(res)

        this.form.get('monto_gasto').setValue(this.configuracion_pago.monto_gasto);
        this.form.get('tasa_interes').setValue(this.configuracion_pago.tasa_interes);
        this.form.get('tasa_ahorro_programado').setValue(this.configuracion_pago.tasa_ahorro_programado);
        this.form.get('tasa_ahorro_inicial').setValue(this.configuracion_pago.tasa_ahorro_inicial);

        this.calcularMontoInteres();
        this.calcularMontoAhorroProgramado();
        this.calcularMontoAhorroInicial();
      });

      this.analistaService.getListaDesplegablexProducto(tipo)
      .subscribe(res => {
        this.analistas = res;
        // console.log(this.analistas)
      });    
  }

  calcular() {

    if (this.sesionSocio.id === '0') {
      Swal.fire({
        text: "Primero debe buscar un socio.", icon: 'warning'
      });
      return;
    }

    // console.log(this.sesionSocio)

    this.formSubmitted = true;
    if (!this.form.valid) {
      Swal.fire({
        text: "Validar la información proporcionada.", icon: 'warning'
      });
      return;
    }

    this.calculado = true;

    // dayjs.extend(updateLocale)

    // dayjs.updateLocale('es', {
    //   weekdays: [
    //     "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"
    //   ]
    // })

    // const dd = dayjs().locale('es');
    // console.log(dd.format('dddd'));

    const capital = this.form.get('monto_capital').value;
    // const cantidad_cuotas = this.form.get('programacion_pago').value;
    const id_tipo = this.form.get('tipo').value;
    const tipo = this.tipos.find(item => item.id === id_tipo);
    const codigo_programacion = this.form.get('programacion_pago').value;
    const programacion = this.programacion_pago.find(item => item.codigo === codigo_programacion);
    // console.log(this.tipos)
    // console.log(this.programacion_pago)
    // console.log(id_tipo)
    // console.log(tipo)
    // console.log(codigo_programacion)
    // console.log(programacion)
    const cantidad_cuotas = programacion.numero_cuotas;
    const tasa_interes = this.form.get('tasa_interes').value;
    const tasa_ahorro_programado = this.form.get('tasa_ahorro_programado').value;
    const now = dayjs(this.form.get('fecha_inicio').value).locale('es');
    // const now = dayjs();

    // console.log(this.form.get('fecha_inicio').value)//fecha_inicio

    // console.log(this.form.get('tipo').value)
    // console.log(cantidad_cuotas)
    // // console.log(thitipos)
    // console.log(tipo)

    // let dias = [];

    this.cuotas = [];

    for (let i = 1; i <= cantidad_cuotas; i++) {
      let fecha: any;
      let nombre_dia:string;
      // let fecha = now.add(i, 'day');

      if (tipo.codigo === "CD")
        // if (this.form.get('tipo').value == 1)
        fecha = now.add(i, 'day');
      // else if (tipo.codigo === "CP" && )
      //   fecha = now.add((i * 7), 'day');
      else if (tipo.codigo === "CP" && programacion.tipo_pago === "semanal")
        fecha = now.add((i * 7), 'day');
      else if (tipo.codigo === "CP" && programacion.tipo_pago === "quincenal")
        fecha = now.add((i * 14), 'day');
      else if (tipo.codigo === "CM")
        fecha = now.add((i), 'month');
      else if (tipo.codigo === "BC" && programacion.tipo_pago === "semanal")
        fecha = now.add((i * 7), 'day');
      else if (tipo.codigo === "BC" && programacion.tipo_pago === "quincenal")
        fecha = now.add((i * 14), 'day');

      // console.log(fecha);        

      if ((fecha.format('d') != '0' && tipo.codigo === "CD")
        // || (fecha.format('d') != '6' && !this.form.get('incluir_sabados').value && this.form.get('tipo').value == 1))
        || tipo.codigo === "CP"
        || tipo.codigo === "CM"
        || tipo.codigo === "BC") {

        if ((((fecha.format('d') != '6'
          || fecha.format('d') == '6' && this.form.get('incluir_sabados').value)
          && tipo.codigo === "CD"))
          || tipo.codigo === "CP"
          || tipo.codigo === "CM"
          || tipo.codigo === "BC") {

          if (fecha.format('d') == '0')
            fecha = now.add(1, 'day');
          else if (fecha.format('d') == '6' && !this.form.get('incluir_sabados').value)
            fecha = now.add(2, 'day');

          let fecha_formateada = '';

          switch (fecha.format('d')) {
            case '1':
              fecha_formateada = 'LU - ' + fecha.format('DD/MM/YYYY');
              nombre_dia = 'Lunes';
              break;
            case '2':
              fecha_formateada = 'MA - ' + fecha.format('DD/MM/YYYY')
              nombre_dia = 'Martes';
              break;
            case '3':
              fecha_formateada = 'MI - ' + fecha.format('DD/MM/YYYY')
              nombre_dia = 'Miércoles';
              break;
            case '4':
              fecha_formateada = 'JU - ' + fecha.format('DD/MM/YYYY')
              nombre_dia = 'Jueves';
              break;
            case '5':
              fecha_formateada = 'VI - ' + fecha.format('DD/MM/YYYY')
              nombre_dia = 'Viernes';
              break;
            case '6':
              fecha_formateada = 'SA - ' + fecha.format('DD/MM/YYYY')
              nombre_dia = 'Sábado';
              break;
          }

          if (fecha.format('d') == '0')
            fecha = now.add(-1, 'day');
          else if (fecha.format('d') == '6' && !this.form.get('incluir_sabados').value)
            fecha = now.add(-2, 'day');

          // if (i == cantidad_cuotas)
          //   this.fecha_fin = fecha.format('DD/MM/YYYY');

          // dayjs.extend(updateLocale)

          // dayjs.updateLocale('es', {
          //   weekdays: [
          //     "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"
          //   ]
          // })

          // console.log(fecha.format('dddd'))
          // console.log(fecha.format('DD/MM/YYYY'))

          this.cuotas.push({
            nombre_dia_cuota: nombre_dia,
            fecha_cuota: fecha.format('DD/MM/YYYY'),
            fecha_cuota_visual: fecha_formateada,
            fecha_plazo_cuota: fecha.add(3, 'day').format('DD/MM/YYYY')
          });
          // this.cuotas.push({ fecha: fecha.format('DD/MM/YYYY') });
        }
      }
    }

    const cantidad_cuotas_calculada = this.cuotas.length;
    // const monto_cuota_capital = (capital * 0.1 * 0.625);
    let monto_cuota_capital = 0;

    if (tipo.codigo === "BC")
      monto_cuota_capital = (capital * 10 * 62.5) / 10000
    else
      monto_cuota_capital = capital / cantidad_cuotas_calculada;

    // const monto_cuota_capital = capital / cantidad_cuotas;
    const monto_cuota_capital_visual = Math.round(monto_cuota_capital * 100) / 100;

    // const monto_cuota_interes = (capital * (tasa_interes / 100)) / cantidad_cuotas_calculada;
    let monto_cuota_interes = 0;

    if (tipo.codigo === "BC")
      monto_cuota_interes = (capital * 10 * 10) / 10000;
    else if (tipo.codigo === "CP" && programacion.tipo_pago === "semanal")
      monto_cuota_interes = ((capital * (cantidad_cuotas_calculada / 4) * tasa_interes) / 100) / cantidad_cuotas_calculada;
    else if (tipo.codigo === "CP" && programacion.tipo_pago === "quincenal")
      monto_cuota_interes = ((capital * (cantidad_cuotas_calculada / 2) * tasa_interes) / 100) / cantidad_cuotas_calculada;
    else
      monto_cuota_interes = ((capital * tasa_interes) / 100) / cantidad_cuotas_calculada;

    // const monto_cuota_interes_visual = Math.round(monto_cuota_interes * 100) / 100;
    let monto_cuota = 0;

    if (tipo.codigo === "BC")
      monto_cuota = Math.ceil((monto_cuota_capital + monto_cuota_interes) * 100) / 100;
    else {
      monto_cuota = Math.ceil((monto_cuota_capital + monto_cuota_interes) * 10) / 10;
      // const monto_cuota_ahorro_programado = Math.ceil((monto_cuota * (tasa_ahorro_programado / 100)) * 10) / 10;
      monto_cuota_interes = monto_cuota - monto_cuota_capital;
    }

    const monto_cuota_interes_visual = Math.round(monto_cuota_interes * 100) / 100;
    let monto_cuota_ahorro_programado = 0;

    if (tipo.codigo === "BC")
      monto_cuota_ahorro_programado = Math.ceil(((capital * 10 * 27.5) / 10000) * 100) / 100;
    else
      monto_cuota_ahorro_programado = Math.ceil(((monto_cuota * tasa_ahorro_programado) / 100) * 10) / 10;

    // console.log(monto_cuota)
    // console.log(tasa_ahorro_programado)
    // console.log(monto_cuota_ahorro_programado)
    // console.log((monto_cuota * (tasa_ahorro_programado / 100)))

    const monto_cuota_total = (monto_cuota + monto_cuota_ahorro_programado).toFixed(2);

    console.log(monto_cuota);
    console.log(monto_cuota_ahorro_programado);
    console.log(monto_cuota_total);

    // this.cuotas = [];

    for (let i = 1; i <= cantidad_cuotas_calculada; i++) {

      if (i === cantidad_cuotas_calculada)
        this.fecha_fin = this.cuotas[i - 1].fecha_cuota;

      // let fecha = now.add(i, 'day')
      let cuota = {
        numero_cuota: i,
        // fecha: fecha.format('DD/MM/YYYY'),
        ingresos: {
          monto_amortizacion_capital: monto_cuota_capital,
          monto_interes: monto_cuota_interes,
        },
        ahorros: {
          monto_ahorro_programado: monto_cuota_ahorro_programado,
        },
        monto_cuota_capital_visual,
        monto_cuota_interes_visual,
        monto_cuota,
        monto_cuota_total
      };

      // this.cuotas.push({
      //   cuota: i,
      //   fecha: fecha.format('DD/MM/YYYY'),
      //   monto_cuota_capital,
      //   monto_cuota_capital_visual,
      //   monto_cuota_interes,
      //   monto_cuota_interes_visual,
      //   monto_cuota,
      //   monto_cuota_ahorro_programado,
      //   monto_cuota_total
      // });

      this.cuotas[i - 1] = Object.assign(cuota, this.cuotas[i - 1]);
    }

    this.cuotas.push({
      estado: 'Pendiente',
      numero_cuota: 0,
      nombre_dia_cuota: '',
      fecha_cuota: dayjs().format('DD/MM/YYYY'),
      fecha_plazo_cuota: dayjs().format('DD/MM/YYYY'),
      ingresos: {
        monto_gasto: this.form.get('monto_gasto').value,
      },
      ahorros: {
        monto_ahorro_inicial: this.form.get('monto_ahorro_inicial').value
      }
    });

  }

  guardar() {

    // this.cargando = true;

    if (this.sesionSocio.id === '0') {
      Swal.fire({
        text: "Primero debe buscar un socio.", icon: 'warning'
      });
      return;
    }

    if (!this.calculado) {
      Swal.fire({
        text: "Ha modificado los datos de cálculo, por lo que debe volver a ejecutar el cálculo.", icon: 'warning'
      });
      return;
    }

    this.formSubmitted = true;
    if (!this.form.valid) {
      Swal.fire({
        text: "Validar la información proporcionada.", icon: 'warning'
      });
      return;
    }

    // console.log('entro 1: '+this.form.get('tipo').value);

    // const tipoX = this.tipos.find(tipo => tipo.id == this.form.get('tipo').value);
    // console.log('entro 2: '+ this.form.get('programacion_pago').value);
    // const programacionX = this.programacion_pago.find(programacion => programacion.id == this.form.get('programacion_pago').value);
    // console.log('entro 3');
    let color: string;
    const id_tipo = this.form.get('tipo').value;
    const tipo = this.tipos.find(item => item.id === id_tipo);
    // const programacion = this.programacion_pago.find(programacion => programacion.id == this.form.get('programacion_pago').value);
    const codigo_programacion = this.form.get('programacion_pago').value;
    const programacion = this.programacion_pago.find(item => item.codigo === codigo_programacion);

    if (tipo.codigo == 'CD')
      color = "inverse";
    else if (tipo.codigo == 'CP' || tipo.codigo == 'CM')
      color = "success";
    else
      color = "primary";

    // console.log(tipoX);
    // console.log(color);
    // console.log(programacionX);
    const modelo: OperaconFinanciera = this.form.value;

    // console.log(modelo);

    modelo.producto = {
      tipo: id_tipo,
      codigo_programacion: programacion.codigo_programacion,
      programacion: programacion.descripcion,
      color: color
    };

    // console.log(modelo);

    // modelo.producto.tipo = id_tipo;//tipo.id;
    // modelo.producto.codigo_programacion = programacion.codigo_programacion;
    // modelo.producto.programacion = programacion.descripcion;
    // modelo.producto.color = color;

    modelo.configuracion = {
      tasa_aporte_capital: 0,//this.form.get('tasa_aporte_capital').value,
      tasa_ahorro_inicial: this.form.get('tasa_ahorro_inicial').value,
      tasa_ahorro_programado: this.form.get('tasa_ahorro_programado').value,
      tasa_interes: this.form.get('tasa_interes').value,
      tasa_mora: 0
    };

    // modelo.configuracion.tasa_aporte_capital = this.form.get('tasa_aporte_capital').value;
    // modelo.configuracion.tasa_ahorro_inicial = this.form.get('tasa_ahorro_inicial').value;
    // modelo.configuracion.tasa_ahorro_programado = this.form.get('tasa_ahorro_programado').value;
    // modelo.configuracion.tasa_interes = this.form.get('tasa_interes').value;
    // modelo.configuracion.tasa_mora = 0;

    // modelo.bancomunal.grupo_bancomunal='';
    // modelo.bancomunal.numero_ciclo = 0;
    modelo.persona = this.sesionSocio.id;
    // modelo.analista = '';
    // modelo.estado = 'PreVigente'
    modelo.fecha_inicio = this.form.get('fecha_inicio').value;
    modelo.fecha_fin = this.fecha_fin;
    modelo.monto_gasto = this.form.get('monto_gasto').value;
    modelo.monto_ahorro_inicial = this.form.get('monto_ahorro_inicial').value;
    modelo.monto_capital = this.form.get('monto_capital').value;
    modelo.detalle = this.cuotas;

    console.log(modelo);

    // this.cuotas.push({
    //   numero_cuota: 0,
    //   fecha_cuota: dayjs().format('DD/MM/YYYY'),
    //   monto_gasto: this.form.get('monto_gasto').value,
    //   monto_ahorro_inicial: this.form.get('monto_ahorro_inicial').value
    // });

    // console.log('entro a guardar')
    // console.log(modelo)

    this.cargando = true;

    this.service.crear(modelo)
      .subscribe(res => {

        // console.log(res);
        Swal.fire({
          text: 'La información se guardó satisfactoriamente.', icon: 'success'
        });

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

    const monto_capital: number = this.form.get('monto_capital').value;

    if (monto_capital <= 0)
      return;

    const tasa_interes: number = this.form.get('tasa_interes').value;

    if (tasa_interes > 0) {

      this.calcularMontoInteres();

      const tasa_ahorro_programado: number = this.form.get('tasa_ahorro_programado').value;

      if (tasa_ahorro_programado > 0)
        this.calcularMontoAhorroProgramado();
    }

    const tasa_ahorro_inicial: number = this.form.get('tasa_ahorro_inicial').value;

    if (tasa_ahorro_inicial > 0)
      this.calcularMontoAhorroInicial();
  }

  calcularMontoInteres() {

    const monto_capital: number = this.form.get('monto_capital').value;

    if (monto_capital <= 0)
      return;

    const tasa_interes: number = this.form.get('tasa_interes').value;

    let monto_interes = 0;

    if (tasa_interes > 0)
      monto_interes = (monto_capital * tasa_interes) / 100;

    this.form.get('monto_interes').setValue(monto_interes.toFixed(2));

    const tasa_ahorro_programado: number = this.form.get('tasa_ahorro_programado').value;

    if (tasa_ahorro_programado > 0)
      this.calcularMontoAhorroProgramado();
  }

  calcularTasaInteres() {

    const monto_capital: number = this.form.get('monto_capital').value;

    if (monto_capital <= 0)
      return;

    const monto_interes: number = this.form.get('monto_interes').value;

    let tasa_interes = 0;

    if (monto_interes > 0)
      tasa_interes = (monto_interes * 100) / monto_capital;

    this.form.get('tasa_interes').setValue(tasa_interes);

    const tasa_ahorro_programado: number = this.form.get('tasa_ahorro_programado').value;

    if (tasa_ahorro_programado > 0)
      this.calcularMontoAhorroProgramado();
  }

  calcularMontoAhorroInicial() {

    const monto_capital: number = this.form.get('monto_capital').value;

    if (monto_capital <= 0)
      return;

    const tasa_ahorro_inicial: number = this.form.get('tasa_ahorro_inicial').value;

    let monto_ahorro_inicial = 0;

    if (tasa_ahorro_inicial > 0)
      monto_ahorro_inicial = (monto_capital * tasa_ahorro_inicial) / 100;

    this.form.get('monto_ahorro_inicial').setValue(monto_ahorro_inicial.toFixed(2));
  }

  calcularTasaAhorroInicial() {

    const monto_capital: number = this.form.get('monto_capital').value;

    if (monto_capital <= 0)
      return;

    const monto_ahorro_inicial: number = this.form.get('monto_ahorro_inicial').value;

    let tasa_ahorro_inicial = 0;

    if (monto_ahorro_inicial > 0)
      tasa_ahorro_inicial = (monto_ahorro_inicial * 100) / monto_capital;

    this.form.get('tasa_ahorro_inicial').setValue(tasa_ahorro_inicial);
  }

  calcularMontoAhorroProgramado() {

    const monto_capital: number = Number(this.form.get('monto_capital').value);
    const monto_interes: number = Number(this.form.get('monto_interes').value);
    const monto_cuota: number = monto_capital + monto_interes;

    if (monto_cuota <= 0)
      return;

    const tasa_ahorro_programado: number = this.form.get('tasa_ahorro_programado').value;

    let monto_ahorro_programado = 0;

    if (tasa_ahorro_programado > 0)
      monto_ahorro_programado = (monto_cuota * tasa_ahorro_programado) / 100;

    this.form.get('monto_ahorro_programado').setValue(monto_ahorro_programado.toFixed(2));
  }

  calcularTasaAhorroProgramado() {

    const monto_capital: number = Number(this.form.get('monto_capital').value);
    const monto_interes: number = Number(this.form.get('monto_interes').value);
    const monto_cuota: number = monto_capital + monto_interes;

    if (monto_cuota <= 0)
      return;

    const monto_ahorro_programado: number = this.form.get('monto_ahorro_programado').value;

    let tasa_ahorro_programado = 0;

    if (monto_ahorro_programado > 0)
      tasa_ahorro_programado = (monto_ahorro_programado * 100) / monto_cuota;

    this.form.get('tasa_ahorro_programado').setValue(tasa_ahorro_programado.toFixed(2));
  }

}
