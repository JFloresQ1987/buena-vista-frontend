import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import * as dayjs from 'dayjs';
import { OperacionFinancieraService } from '../../../../services/core/registro/operacion-financiera.service';
import { OperaconFinanciera } from '../../../../interfaces/core/registro/operacion-financiera.interface';
import { SesionSocioService } from '../../../../services/shared/sesion-socio.service';
import { Socio } from '../../../../models/core/socio.model';
import { ProductoService } from '../../../../services/core/configuracion/producto.service';

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
  public cuotas = [];
  public sesionSocio: Socio;
  // public tipo_operacion_financiera: string;
  public tipos = [];/*[
    { id: 1, tipo: 'Crédito diario' },
    { id: 2, tipo: 'Crédito personal' },
    { id: 3, tipo: 'Banco comunal individual' }
  ];*/
  // public color: string;
  // public programacion: string;

  constructor(private service: OperacionFinancieraService,
    private formBuilder: FormBuilder,
    private sesionSocioService: SesionSocioService,
    private productoService: ProductoService) {

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
      monto_capital: ['', [Validators.required, Validators.min(1), Validators.maxLength(10)]],
      monto_gasto: ['', [Validators.required, Validators.min(1), Validators.maxLength(10)]],
      tasa_interes: ['6', [Validators.required, Validators.min(0), Validators.maxLength(10)]],
      tasa_aporte_programado: ['20', [Validators.required, Validators.min(0), Validators.maxLength(10)]],
      programacion_pago: ['', [Validators.required]],
      monto_ahorro_inicial: ['', [Validators.required, Validators.min(0), Validators.maxLength(10)]],
      // cantidad_cuotas: ['', [Validators.required, Validators.min(1), Validators.maxLength(3)]],
      fecha_inicio: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      incluir_sabados: [true, Validators.required],
      comentario: ['', [Validators.required, Validators.maxLength(200)]]
    });

    this.productoService.listar()
      .subscribe(res => {
        this.tipos = res;
      });

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


    this.form.controls.programacion_pago.setValue('');

    this.calculado = false;

    // this.programacion_pago = [];

    if (!tipo) {

      this.programacion_pago = [];
      return;
    }
    // else
    this.productoService.listar_programacion(tipo)
      .subscribe(res => {
        this.programacion_pago = res;
      });

    // console.log(tipo)

    // if (tipo == 1) {

    //   this.programacion_pago = [
    //     { id: 20, programacion: '20 días' },
    //     { id: 40, programacion: '40 días' },
    //     { id: 60, programacion: '60 días' },
    //     { id: 90, programacion: '90 días' },
    //     { id: 120, programacion: '120 días' },
    //     { id: 150, programacion: '150 días' },
    //     { id: 180, programacion: '180 días' }
    //   ]
    //   // console.log(this.programacion_pago)
    //   return this.programacion_pago
    // }
    // else if (tipo == 2) {

    //   this.programacion_pago = [
    //     { id: 4, programacion: '1 mes - semanal' },
    //     { id: 2, programacion: '1 mes - quincenal' },
    //     { id: 8, programacion: '2 mes - semanal' },
    //     { id: 4, programacion: '2 mes - quincenal' },
    //     { id: 12, programacion: '3 mes - semanal' },
    //     { id: 6, programacion: '3 mes - quincenal' },
    //     { id: 16, programacion: '4 mes - semanal' },
    //     { id: 8, programacion: '4 mes - quincenal' },
    //     { id: 20, programacion: '5 mes - semanal' },
    //     { id: 10, programacion: '5 mes - quincenal' },
    //     { id: 24, programacion: '6 mes - semanal' },
    //     { id: 12, programacion: '6 mes - quincenal' },
    //     { id: 28, programacion: '7 mes - semanal' },
    //     { id: 14, programacion: '7 mes - quincenal' },
    //     { id: 32, programacion: '8 mes - semanal' },
    //     { id: 16, programacion: '8 mes - quincenal' },
    //     { id: 36, programacion: '9 mes - semanal' },
    //     { id: 18, programacion: '9 mes - quincenal' },
    //     { id: 40, programacion: '10 meses - semanal' },
    //     { id: 20, programacion: '10 meses - quincenal' }
    //   ]
    //   // console.log(this.programacion_pago)
    //   return this.programacion_pago
    // }
    // else {
    //   // console.log(this.programacion_pago)
    //   this.programacion_pago = [];
    //   return this.programacion_pago
    // }
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
    const tasa_aporte_programado = this.form.get('tasa_aporte_programado').value;
    const now = dayjs(this.form.get('fecha_inicio').value);
    // const now = dayjs();

    // console.log(this.form.get('fecha_inicio').value)//fecha_inicio

    console.log(this.form.get('tipo').value)
    console.log(cantidad_cuotas)
    // console.log(thitipos)
    console.log(tipo)

    // let dias = [];

    this.cuotas = [];

    for (let i = 1; i <= cantidad_cuotas; i++) {
      let fecha: any;
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

      console.log(fecha);

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
            case '1': fecha_formateada = 'LU - ' + fecha.format('DD/MM/YYYY')
              break;
            case '2': fecha_formateada = 'MA - ' + fecha.format('DD/MM/YYYY')
              break;
            case '3': fecha_formateada = 'MI - ' + fecha.format('DD/MM/YYYY')
              break;
            case '4': fecha_formateada = 'JU - ' + fecha.format('DD/MM/YYYY')
              break;
            case '5': fecha_formateada = 'VI - ' + fecha.format('DD/MM/YYYY')
              break;
            case '6': fecha_formateada = 'SA - ' + fecha.format('DD/MM/YYYY')
              break;
          }

          if (fecha.format('d') == '0')
            fecha = now.add(-1, 'day');
          else if (fecha.format('d') == '6' && !this.form.get('incluir_sabados').value)
            fecha = now.add(-2, 'day');

          this.cuotas.push({
            fecha_cuota: fecha.format('DD/MM/YYYY'),
            fecha_cuota_visual: fecha_formateada
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

    const monto_cuota_interes_visual = Math.round(monto_cuota_interes * 100) / 100;
    let monto_cuota = 0;

    if (tipo.codigo === "BC")
      monto_cuota = Math.ceil((monto_cuota_capital + monto_cuota_interes) * 100) / 100;
    else
      monto_cuota = Math.ceil((monto_cuota_capital + monto_cuota_interes) * 10) / 10;
    // const monto_cuota_ahorro_programado = Math.ceil((monto_cuota * (tasa_aporte_programado / 100)) * 10) / 10;

    let monto_cuota_ahorro_programado = 0;

    if (tipo.codigo === "BC")
      monto_cuota_ahorro_programado = Math.ceil(((capital * 10 * 27.5) / 10000) * 100) / 100;
    else
      monto_cuota_ahorro_programado = Math.ceil(((monto_cuota * tasa_aporte_programado) / 100) * 10) / 10;

    // console.log(monto_cuota)
    // console.log(tasa_aporte_programado)
    // console.log(monto_cuota_ahorro_programado)
    // console.log((monto_cuota * (tasa_aporte_programado / 100)))

    const monto_cuota_total = monto_cuota + monto_cuota_ahorro_programado;

    // console.log(this.cuotas);

    // this.cuotas = [];

    for (let i = 1; i <= cantidad_cuotas_calculada; i++) {

      // let fecha = now.add(i, 'day')
      let cuota = {
        numero_cuota: i,
        // fecha: fecha.format('DD/MM/YYYY'),
        monto_amortizacion_capital: monto_cuota_capital,
        monto_cuota_capital_visual,
        monto_interes: monto_cuota_interes,
        monto_cuota_interes_visual,
        monto_cuota,
        monto_ahorro_programado: monto_cuota_ahorro_programado,
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
      numero_cuota: 0,
      fecha_cuota: dayjs().format('DD/MM/YYYY'),
      monto_gasto: this.form.get('monto_gasto').value,
      monto_ahorro_inicial: this.form.get('monto_ahorro_inicial').value
    });

  }

  guardar() {

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
    modelo.tipo = tipo.descripcion;
    modelo.color = color;
    modelo.programacion = programacion.descripcion;
    modelo.monto_gasto = this.form.get('monto_gasto').value;
    modelo.monto_ahorro_inicial = this.form.get('monto_ahorro_inicial').value;
    modelo.monto_capital = this.form.get('monto_capital').value;
    modelo.numero_ciclo = 0;
    modelo.tasa_aporte_inicial = 0;
    modelo.tasa_aporte_capital = 0;
    modelo.tasa_aporte_programado = this.form.get('tasa_aporte_programado').value;
    modelo.tasa_interes = this.form.get('tasa_interes').value;
    modelo.tasa_mora = 0;
    modelo.detalle = this.cuotas;
    modelo.persona = this.sesionSocio.id;



    // this.cuotas.push({
    //   numero_cuota: 0,
    //   fecha_cuota: dayjs().format('DD/MM/YYYY'),
    //   monto_gasto: this.form.get('monto_gasto').value,
    //   monto_ahorro_inicial: this.form.get('monto_ahorro_inicial').value
    // });

    // console.log('entro a guardar')
    console.log(modelo)

    this.service.crear(modelo)
      .subscribe(res => {

        // console.log(res);
        Swal.fire({
          text: 'La información se guardó satisfactoriamente.', icon: 'success'
        });

        this.cancelar();

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

}
