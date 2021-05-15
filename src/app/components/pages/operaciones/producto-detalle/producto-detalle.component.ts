import { Component, OnInit, ElementRef } from '@angular/core';
// import {imageToBase64} from 'image-to-base64';
import { OperacionFinancieraService } from '../../../../services/core/registro/operacion-financiera.service';
import { OperacionFinancieraDetalleService } from '../../../../services/core/registro/operacion-financiera-detalle.service';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { OperaconFinanciera } from '../../../../interfaces/core/registro/operacion-financiera.interface';
import { Seguridad } from '../../../../models/auth/seguridad.model';
import { SeguridadService } from '../../../../services/auth/seguridad.service';

import * as jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';
import * as dayjs from 'dayjs';
import { PersonaService } from '../../../../services/core/registro/persona.service';
import { Persona } from '../../../../interfaces/core/registro/persona.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../../../environments/environment';


declare const $: any;


@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent implements OnInit {

  // private id_operacion_financiera: string;
  public operaconFinanciera: OperaconFinanciera;
  public operaconFinancieraDetalle: [];
  public cargando: boolean = true;
  public cargandoDetalle: boolean = true;
  private seguridad: Seguridad;
  public totalPagoCapital: number = 0;
  public totalPagoInteres: number = 0.0;
  public totalAhorroProgramado: number = 0;
  // public totalCuota: number = 0;
  public totalCuota_k_i: number = 0;
  public totalCuota_pendiente: number = 0;
  public totalCuotaPagada: number = 0;
  public totalAhorroVoluntario: number = 0;
  public totalPagoMora: number = 0;
  public fecha_actual: string;
  public cuota_numero: number = 0;
  public form: FormGroup;
  public cuota_id: string;
  public formSubmitted = false;

  constructor(private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private serviceOperacionFinanciera: OperacionFinancieraService,
    private seguridadService: SeguridadService,
    private serviceOperacionFinancieraDetalle: OperacionFinancieraDetalleService,
    private personaService: PersonaService,
    private el: ElementRef) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      cuota_pago_capital: ['', [Validators.required]],
      cuota_pago_interes: ['', [Validators.required]],
      cuota_pago_mora: ['', [Validators.required]],
      cuota_ahorro_programado: ['', [Validators.required]],
    });
    this.fecha_actual = dayjs().format('DD/MM/YYYY');
    this.seguridad = this.seguridadService.seguridad;
    this.activatedRoute.params.subscribe(({ id }) => {

      this.listarProducto(id);
      this.listarProductoDetalle(id);
    })

    // setTimeout(() => {
    //   this.listarProducto();
    // }, 100);
  }

  verPDF() {
    this.personaService.obtenerDatosPersona(this.operaconFinanciera.persona['_id']).subscribe(persona => {
      var doc: any = new jsPDF();
      var totalPagesExp = '{ total_pages_count_string }';
      const autoTablex: any = {
        styles: { halign: 'center' },
        html: '#example',
        margin: { top: 30, bottom: 22.5 },
        startY: 105,
        didDrawPage: (data) => {
          doc.setFontSize(8)
          doc.setTextColor(40)
          var img = new Image();
          img.src = `${environment.base_url}/upload/buenavista-logo.png`
          if (img.src) {
            doc.addImage(img, /* 'PNG', */ data.settings.margin.right + 110, 5, 70, 20);
          }
          doc.text(this.seguridad.usuario + '\n' +
            this.seguridad.apellido_paterno + ' ' + this.seguridad.apellido_materno + ', ' + this.seguridad.nombre + '\n' +
            dayjs().format('DD/MM/YYYY hh:mm:ss a')
            , data.settings.margin.left, 10)

          if (data.pageNumber == 1) {
            doc.autoTable({
              styles: { overflow: 'visible', halign: ['center'], cellWidth: ['wrap'], fontSize: [20] },
              head: [
                [
                  {
                    content: 'Cronograma de pagos',
                    colSpan: 3,
                    styles: { halign: 'center', },
                  },
                ],
              ],
              startY: 28,
              showHead: 'firstPage',
            })
            doc.autoTable({
              showHead: false,
              styles: { overflow: 'visible', cellWidth: ['wrap'] },
              //columnStyles: { '': { halign: 'center', minCellWidth: [5] } }, // Cells in first column centered and green
              columnStyles: {
                0: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold', cellWidth: 40 },
              },
              margin: { right: 110 },
              body: [
                ['Monto(S/.): ', this.operaconFinanciera.monto_capital],
                ['Beneficiario: ', persona.apellido_paterno + ' ' + persona.apellido_materno + ', ' + persona.nombre],
                ['Domicilio: ', persona.domicilio],
                ['Departamento: ', persona.ubigeo.departamento],
                ['Provincia: ', persona.ubigeo.provincia],
                ['Distrito: ', persona.ubigeo.distrito],
                ['Gastos Admin. (S/.): ', this.operaconFinanciera.monto_gasto],
              ],
              startY: 45,
              // showHead: 'firstPage', 
              theme: 'striped',
            })
            doc.autoTable({
              styles: { overflow: 'hidden', cellWidth: ['wrap'] },
              //columnStyles: { '': { halign: 'center' } }, // Cells in first column centered and green
              columnStyles: {
                0: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold', cellWidth: 48 },
              },
              margin: { left: 110 },
              body: [
                ['Fecha Desembolso (S/.): ', this.operaconFinanciera.fecha_inicio],
                ['Producto: ', this.operaconFinanciera.producto.tipo.descripcion],
                ['Periodo de Ejecucion:', this.operaconFinanciera.producto.programacion],
                ['DNI: ', persona.documento_identidad],
                ['Celular: ', persona.numero_celular],
                ['Ahorro Inicial (S/.): ', this.operaconFinanciera.monto_ahorro_inicial],
              ],
              startY: 45,
              showHead: 'firstPage',
              theme: 'striped',

            })
          }

          var str = 'Página ' + doc.internal.getNumberOfPages()
          var fuente = `Fuente: Base de datos institucional`
          var oficina = `Oficina Principal: Jr. Miller N°334 Ayacucho, Huamanga, Ayacucho; Central Telefónica 066-311613.`
          var año = `© 2020 BuenaVista La Bolsa S.A.C. Todos los derechos reservados.`
          var pagWeb = `http://www.buenavistalabolsa.com/`
          // Total page number plugin only available in jspdf v1.0+
          if (typeof doc.putTotalPages === 'function') {
            str = fuente + '\n' +
              oficina + '\n' +
              año + '\n' +
              pagWeb + '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t' +
              str + ' de ' + totalPagesExp
          }
          doc.setFontSize(8)

          // jsPDF 1.4+ uses getWidth, <1.4 uses .width
          var pageSize = doc.internal.pageSize
          var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
          doc.text(str, data.settings.margin.left, pageHeight - 20)
        },
      }

      autoTable(doc, autoTablex);

      // Total page number plugin only available in jspdf v1.0+
      if (typeof doc.putTotalPages === 'function') {
        doc.putTotalPages(totalPagesExp)
      }

      var blob = doc.output("blob");
      window.open(URL.createObjectURL(blob));
    })
  }

  headRows() {
    return [
      { id: 'ID', name: 'Name', email: 'Email', city: 'City', expenses: 'Sum' },
    ]
  }

  footRows() {
    return [
      { id: 'ID', name: 'Name', email: 'Email', city: 'City', expenses: 'Sum' },
    ]
  }

  bodyRows(rowCount) {
    rowCount = rowCount || 10
    var body = []
    // var faker = window.faker
    for (var j = 1; j <= rowCount; j++) {
      body.push({
        id: j,
        name: 'Jorge',//faker.name.findName(),
        email: 'jfloresq1987@gmail.com',//faker.internet.email(),
        city: 'Ayacucho',//faker.address.city(),
        expenses: '1000',//faker.finance.amount(),
      })
    }
    return body
  }

  listarProducto(id_operacion_financiera: string) {

    // this.cargando = true;
    // // this.sesionSocio = this.sesionSocioService.sesionSocio;

    // if (this.socio.getId() === '0') {
    //   Swal.fire({
    //     text: "Primero debe buscar un socio.", icon: 'warning'
    //   });
    //   return;
    // }

    this.cargando = true;

    this.serviceOperacionFinanciera.listarProducto(id_operacion_financiera)
      // .pipe(
      //   delay(100)
      // )
      .subscribe((res: any) => {

        // this.productos = res.lista;
        // this.cargando = false;
        this.operaconFinanciera = res;
        // this.operaconFinanciera = res.modelo;
        this.cargando = false;

      }, (err) => {

        if (err.status === 400)
          Swal.fire({
            text: err.error.msg, icon: 'warning'
          });
        else
          Swal.fire({
            text: err.error.msg, icon: 'error'
          });
      });
  }

  listarProductoDetalle(id_operacion_financiera: string) {

    // this.cargando = true;
    // // this.sesionSocio = this.sesionSocioService.sesionSocio;

    // if (this.socio.getId() === '0') {
    //   Swal.fire({
    //     text: "Primero debe buscar un socio.", icon: 'warning'
    //   });
    //   return;
    // }

    this.cargandoDetalle = true;

    this.serviceOperacionFinancieraDetalle.listarProductoDetalle(id_operacion_financiera)
      // .pipe(
      //   delay(100)
      // )
      .subscribe((res: any) => {

        // this.productos = res.lista;
        // this.cargando = false;

        this.operaconFinancieraDetalle = res;
        // this.operaconFinanciera = res.modelo;

        this.cargandoDetalle = false;

        this.calcularMontos();

      }, (err) => {

        if (err.status === 400)
          Swal.fire({
            text: err.error.msg, icon: 'warning'
          });
        else
          Swal.fire({
            text: err.error.msg, icon: 'error'
          });
      });
  }

  calcularMontos() {
    this.totalPagoCapital = 0;
    this.totalPagoInteres = 0;
    this.totalAhorroProgramado = 0;
    // this.totalCuota = 0;
    this.totalCuota_k_i = 0;
    this.totalCuota_pendiente = 0;
    this.totalCuotaPagada = 0;
    this.totalAhorroVoluntario = 0;
    this.totalPagoMora = 0;
    this.operaconFinancieraDetalle.forEach(cuota => {
      if (parseInt(cuota['numero_cuota']) > 0) {
        this.totalPagoCapital += parseFloat(cuota['monto_amortizacion_capital_2']);
        this.totalPagoInteres += parseFloat(cuota['monto_interes_2']);
        this.totalAhorroProgramado += parseFloat(cuota['monto_ahorro_programado_2']);
        this.totalCuota_k_i += parseFloat(cuota['monto_amortizacion_capital_2']) + parseFloat(cuota['monto_interes_2']);
        this.totalCuota_pendiente += parseFloat(cuota['monto_cuota_2']);
        this.totalCuotaPagada += parseFloat(cuota['monto_cuota_pagada']);
        this.totalAhorroVoluntario += parseFloat(cuota['monto_ahorro_voluntario']);
        this.totalPagoMora += parseFloat(cuota['monto_pago_mora']);
      }

    })
  }

  cargarCuota(id: string) {
    this.serviceOperacionFinancieraDetalle.obtenerOperacionFinancieraDetalle(id).subscribe(res => {
      this.cuota_numero = res['operacion_financiera_detalle']['numero_cuota'];
      this.form.controls['cuota_pago_capital'].setValue(parseFloat(res['operacion_financiera_detalle']['ingresos']['monto_amortizacion_capital']).toFixed(2));
      this.form.controls['cuota_pago_interes'].setValue(parseFloat(res['operacion_financiera_detalle']['ingresos']['monto_interes']).toFixed(2));
      this.form.controls['cuota_pago_mora'].setValue(parseFloat(res['operacion_financiera_detalle']['ingresos']['monto_mora']).toFixed(2));
      this.form.controls['cuota_ahorro_programado'].setValue(parseFloat(res['operacion_financiera_detalle']['ahorros']['monto_ahorro_programado']).toFixed(2));
      this.cuota_id = id;
      $(this.el.nativeElement.querySelector('#mdlCuota')).modal('show');
    })
  }

  guardar() {
    
    this.formSubmitted = true;
    if (!this.form.valid) {
      Swal.fire({
        text: "Validar la información proporcionada.", icon: 'warning'
      });
      return;
    }
    
    this.serviceOperacionFinancieraDetalle.actualizarOperacionFinancieraDetalle(this.cuota_id, this.form.value).subscribe(res => {
      if (res['ok']) {
        $(this.el.nativeElement.querySelector('#mdlCuota')).modal('hide');
        Swal.fire({
          text: res['msg'], icon: 'success'
        });
        this.activatedRoute.params.subscribe(({ id }) => {
          this.listarProductoDetalle(id);
        })
      }
    })
  }

  darBajaCuota(id: string) {
    this.serviceOperacionFinancieraDetalle.operacionFinancieraDetalleBaja(id).subscribe(res => {
      Swal.fire({
        text: res['msg'], icon: 'success'
      });
      this.activatedRoute.params.subscribe(({ id }) => {
        this.listarProductoDetalle(id);
      })
    })
  }

  validarFechaCuota(fecha_cuota) {
    const fecha = fecha_cuota.split('/');
    const fecha_c = dayjs(fecha[2] + '-' + fecha[1] + '-' + fecha[0])
    const fecha_actual = dayjs();
    if (fecha_actual.diff(fecha_c, "day") <= 0) {
      return true;
    } else {
      return false;
    }
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
