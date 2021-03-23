import { Component, OnInit } from '@angular/core';
import { OperacionFinancieraService } from '../../../../services/core/registro/operacion-financiera.service';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { OperacionFinancieraPagoService } from '../../../../services/core/caja/operacion-financiera-pago.service';
import { ProductoService } from '../../../../services/core/configuracion/producto.service';
// import autoTable from 'jspdf-autotable';
import { environment } from 'src/environments/environment';
// import * as jsPDF from 'jspdf';
import { Seguridad } from '../../../../models/auth/seguridad.model';
import { SeguridadService } from '../../../../services/auth/seguridad.service';
import * as jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-producto-pre-pago',
  templateUrl: './producto-pre-pago.component.html',
  styleUrls: ['./producto-pre-pago.component.css']
})
export class ProductoPrePagoComponent implements OnInit {

  public lista = [];
  public listaPago = [];
  public listaReporte = [];
  public cargando: boolean = true;
  public ultimo_monto_amortizacion: number = 0;
  public ultimo_monto_ahorro: number = 0;
  public tipos = [];
  private seguridad: Seguridad;
  public analista: string;

  constructor(private service: OperacionFinancieraService,
    private serviceOperacionFinancieraPago: OperacionFinancieraPagoService,
    private productoService: ProductoService,
    private seguridadService: SeguridadService) {

  }

  ngOnInit(): void {

    this.seguridad = this.seguridadService.seguridad;

    // this.cargando = true;
    // this.sesionSocio = this.sesionSocioService.sesionSocio;
    // setTimeout(() => {
    //   this.listarProductos();
    // }, 100);

    // this.listarProductos();

    this.productoService.listar(false, true)
      .subscribe(res => {
        this.tipos = res;
      });
  }

  listarProductos(tipo: string) {

    this.cargando = true;

    this.service.listarProductosXAnalista(tipo)
      .pipe(
        delay(100)
      )
      .subscribe((res: any) => {
        // console.log(res)
        this.lista = res.lista;
        this.analista = res.analista;
        // this.productos = res.lista;

        if (this.lista.length > 0)
          this.cargando = false;
      });
  }

  realizarPago() {

    this.listaPago = [];

    this.lista.forEach((item: any) => {

      const amortizacion: any = document.getElementById(item.id + '_amortizacion');
      const ahorro: any = document.getElementById(item.id + '_ahorro');

      if (Number(amortizacion.value) > 0 || Number(ahorro.value) > 0)
        this.listaPago.push({
          operacion_financiera: item.id,
          monto_recibido: Number(amortizacion.value) + Number(ahorro.value),
          monto_amortizacion: Number(amortizacion.value),
          monto_ahorro_voluntario: Number(ahorro.value)
        })
    });

    if (this.listaPago.length === 0) {
      Swal.fire({
        text: "Ingresar al menos un monto a pagar.", icon: 'warning'
      });
      return;
    }

    // // this.formSubmitted = true;
    // // if (!this.form.valid) {
    // //   Swal.fire({
    // //     text: "Validar la información proporcionada.", icon: 'warning'
    // //   });
    // //   return;
    // // }

    // const modelo: OperaconFinancieraPago = this.form.value;

    // // modelo.monto_ahorro_voluntario = this.form.get('monto_ahorro_voluntario').value;
    // // modelo.monto_recibido = this.form.get('monto_recibido').value
    // modelo.operacion_financiera = this.id_operacion_financiera;
    // modelo.cuotas = this.listaCuotasPagar;
    // modelo.id_socio = this.sesionSocio.id;
    // modelo.documento_identidad_socio = this.sesionSocio.documento_identidad;
    // modelo.nombres_apellidos_socio = this.sesionSocio.getNombreCompleto();

    // // this.imprimirRecibo();

    // this.serviceOperacionFinancieraPago.pagarProducto(modelo)
    //   .subscribe(res => {

    //     Swal.fire({
    //       text: 'El pago se realizó satisfactoriamente.', icon: 'success'
    //     });

    //     // this.imprimirRecibo(res);
    //     // this.construirRecibo(res);
    //     this.imprimirRecibo(res);

    //     this.cancelar();
    //     // this.form.reset();
    //     // this.form.reset(this.form.value);
    //     // this.form.resetForm({resetType:ResetFormType.ControlsOnly});
    //     // this.userFormGroup.resetForm({resetType:ResetFormType.FormGroupsOnly});
    //     // this.userFormGroup.resetForm({resetType:ResetFormType.FormArraysOnly});
    //     // this.userFormGroup.resetForm({resetType:ResetFormType.ControlsAndFormGroupsOnly});

    //   });

    Swal.fire({
      // title: '¿Estas seguro de guardar los pagos?',
      text: "¿Esta seguro de realizar el pago?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, realizar pago'
    }).then((result) => {
      if (result.isConfirmed) {

        this.serviceOperacionFinancieraPago.prePagarProductoPorAnalista(this.listaPago)
          .subscribe(res => {

            Swal.fire({
              text: 'Los pagos se realizaron satisfactoriamente.', icon: 'success'
            });

            this.cancelar();

          });
      }
    })
  }

  // limpiarPago(){

  //   this.listaPago = [];

  //   this.lista.forEach((item: any) => {

  //     const amortizacion: any = document.getElementById(item.id + '_amortizacion');
  //     const ahorro: any = document.getElementById(item.id + '_ahorro');

  //     amortizacion.value == '';
  //     ahorro.value == '';
  //   });
  // }

  cancelar() {

    this.listaPago = [];
    
    this.lista.forEach((item: any) => {

      const amortizacion: any = document.getElementById(item.id + '_amortizacion');
      const ahorro: any = document.getElementById(item.id + '_ahorro');

      amortizacion.value = '';
      ahorro.value = '';
    });

    const total_amortizacion: any = document.getElementById('total_amortizacion');
    const total_ahorro: any = document.getElementById('total_ahorro');

    total_amortizacion.value = '';
    total_ahorro.value = '';
  }

  construirReporte() {

    // this.construirReporte();

    // this.listaReporte = [];

    // let i = 0;

    // this.lista.forEach((item: any) => {

    //   const amortizacion: any = document.getElementById(item.id + '_amortizacion');
    //   const ahorro: any = document.getElementById(item.id + '_ahorro');

    //   if (Number(amortizacion.value) > 0 || Number(ahorro.value) > 0) {
    //     i++;
    //     this.listaReporte.push([
    //       i,
    //       item.persona.documento_identidad,
    //       `${item.persona.apellido_paterno}  ${item.persona.apellido_materno}, ${item.persona.nombre}`,
    //       item.producto.codigo,
    //       item.producto.codigo_programacion,
    //       Number(amortizacion.value).toFixed(2),
    //       Number(ahorro.value).toFixed(2)
    //     ])
    //     // this.listaReporte.push([
    //     //   numeracion: i,
    //     //   documento_identidad: item.persona.documento_identidad,
    //     //   socio: `${item.persona.apellido_paterno}  ${item.persona.apellido_materno}, ${ item.persona.nombre }`,
    //     //   producto: item.producto.codigo,
    //     //   programacion: item.producto.codigo_programacion,
    //     //   monto_amortizacion: Number(amortizacion.value),
    //     //   monto_ahorro_voluntario: Number(ahorro.value)
    //     // ])
    //   }
    // });

    if (this.listaReporte.length === 0) {
      Swal.fire({
        text: "No hay ningún pago pendiente de confirmación, guardar antes de ver reporte.", icon: 'warning'
      });
      return;
    }

    const opciones: any = {
      orientation: 'p',
      unit: 'mm',
      format: 'a4'
      // format: [16, 16]
    };

    var doc: any = new jsPDF(opciones);
    var totalPagesExp = '{ total_pages_count_string }';
    const autoTablex: any = {
      styles: { halign: 'center' },
      // html: '#reporte',
      head: [['#', 'N° Recibo', 'Fecha', 'DNI', 'Socio', 'Producto', 'Programación', 'Monto Amortizado', 'Ah. Voluntario']],
      body: this.listaReporte,

      margin: { top: 30, bottom: 22.5 },
      startY: 50,
      // startY: 105,
      didDrawPage: (data) => {
        doc.setFontSize(8)
        doc.setTextColor(40)
        var img = new Image();
        img.src = `${environment.base_url}/upload/buenavista-logo.png`
        if (img.src) {
          doc.addImage(img, /* 'PNG', */ data.settings.margin.right + 199, 5, 70, 20);
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
                  content: 'Reporte de pagos',
                  colSpan: 3,
                  styles: { halign: 'center', },
                },
              ],
            ],
            startY: 28,
            showHead: 'firstPage',
          })
          // doc.autoTable({
          //   showHead: false,
          //   styles: { overflow: 'visible', cellWidth: ['wrap'] },
          //   //columnStyles: { '': { halign: 'center', minCellWidth: [5] } }, // Cells in first column centered and green
          //   columnStyles: {
          //     0: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold', cellWidth: 40 },
          //   },
          //   margin: { right: 110 },
          //   body: [
          //     // ['Monto(S/.): ', this.operaconFinanciera.monto_capital],
          //     // ['Beneficiario: ', persona.apellido_paterno + ' ' + persona.apellido_materno + ', ' + persona.nombre],
          //     // ['Domicilio: ', persona.domicilio],
          //     // ['Departamento: ', persona.ubigeo.departamento],
          //     // ['Provincia: ', persona.ubigeo.provincia],
          //     // ['Distrito: ', persona.ubigeo.distrito],
          //     // ['Gastos Admin. (S/.): ', this.operaconFinanciera.monto_gasto],
          //   ],
          //   startY: 45,
          //   // showHead: 'firstPage', 
          //   theme: 'striped',
          // })
          // doc.autoTable({
          //   styles: { overflow: 'hidden', cellWidth: ['wrap'] },
          //   //columnStyles: { '': { halign: 'center' } }, // Cells in first column centered and green
          //   columnStyles: {
          //     0: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold', cellWidth: 48 },
          //   },
          //   margin: { left: 110 },
          //   body: [
          //     // ['Fecha Desembolso (S/.): ', this.operaconFinanciera.fecha_inicio],
          //     // ['Producto: ', this.operaconFinanciera.producto.tipo.descripcion],
          //     // ['Periodo de Ejecucion:', this.operaconFinanciera.producto.programacion],
          //     // ['DNI: ', persona.documento_identidad],
          //     // ['Celular: ', persona.numero_celular],
          //     // ['Ahorro Inicial (S/.): ', this.operaconFinanciera.monto_ahorro_inicial],
          //   ],
          //   startY: 45,
          //   showHead: 'firstPage',
          //   theme: 'striped',

          // })
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


    // this.personaService.obtenerDatosPersona(this.operaconFinanciera.persona['_id']).subscribe(persona => {
    //   var doc: any = new jsPDF();
    //   var totalPagesExp = '{ total_pages_count_string }';
    //   const autoTablex: any = {
    //     styles: { halign: 'center' },
    //     html: '#example',
    //     margin: { top: 30, bottom: 22.5 },
    //     startY: 105,
    //     didDrawPage: (data) => {
    //       doc.setFontSize(8)
    //       doc.setTextColor(40)
    //       var img = new Image();
    //       img.src = `${environment.base_url}/upload/buenavista-logo.png`
    //       if (img.src) {
    //         doc.addImage(img, /* 'PNG', */ data.settings.margin.right + 110, 5, 70, 20);
    //       }
    //       doc.text(this.seguridad.usuario + '\n' +
    //         this.seguridad.apellido_paterno + ' ' + this.seguridad.apellido_materno + ', ' + this.seguridad.nombre + '\n' +
    //         dayjs().format('DD/MM/YYYY hh:mm:ss a')
    //         , data.settings.margin.left, 10)

    //       if (data.pageNumber == 1) {
    //         doc.autoTable({
    //           styles: { overflow: 'visible', halign: ['center'], cellWidth: ['wrap'], fontSize: [20] },
    //           head: [
    //             [
    //               {
    //                 content: 'Reporte de pagos',
    //                 colSpan: 3,
    //                 styles: { halign: 'center', },
    //               },
    //             ],
    //           ],
    //           startY: 28,
    //           showHead: 'firstPage',
    //         })
    //         doc.autoTable({
    //           showHead: false,
    //           styles: { overflow: 'visible', cellWidth: ['wrap'] },
    //           //columnStyles: { '': { halign: 'center', minCellWidth: [5] } }, // Cells in first column centered and green
    //           columnStyles: {
    //             0: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold', cellWidth: 40 },
    //           },
    //           margin: { right: 110 },
    //           body: [
    //             // ['Monto(S/.): ', this.operaconFinanciera.monto_capital],
    //             // ['Beneficiario: ', persona.apellido_paterno + ' ' + persona.apellido_materno + ', ' + persona.nombre],
    //             // ['Domicilio: ', persona.domicilio],
    //             // ['Departamento: ', persona.ubigeo.departamento],
    //             // ['Provincia: ', persona.ubigeo.provincia],
    //             // ['Distrito: ', persona.ubigeo.distrito],
    //             // ['Gastos Admin. (S/.): ', this.operaconFinanciera.monto_gasto],
    //           ],
    //           startY: 45,
    //           // showHead: 'firstPage', 
    //           theme: 'striped',
    //         })
    //         doc.autoTable({
    //           styles: { overflow: 'hidden', cellWidth: ['wrap'] },
    //           //columnStyles: { '': { halign: 'center' } }, // Cells in first column centered and green
    //           columnStyles: {
    //             0: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold', cellWidth: 48 },
    //           },
    //           margin: { left: 110 },
    //           body: [
    //             // ['Fecha Desembolso (S/.): ', this.operaconFinanciera.fecha_inicio],
    //             // ['Producto: ', this.operaconFinanciera.producto.tipo.descripcion],
    //             // ['Periodo de Ejecucion:', this.operaconFinanciera.producto.programacion],
    //             // ['DNI: ', persona.documento_identidad],
    //             // ['Celular: ', persona.numero_celular],
    //             // ['Ahorro Inicial (S/.): ', this.operaconFinanciera.monto_ahorro_inicial],
    //           ],
    //           startY: 45,
    //           showHead: 'firstPage',
    //           theme: 'striped',

    //         })
    //       }

    //       var str = 'Página ' + doc.internal.getNumberOfPages()
    //       var fuente = `Fuente: Base de datos institucional`
    //       var oficina = `Oficina Principal: Jr. Miller N°334 Ayacucho, Huamanga, Ayacucho; Central Telefónica 066-311613.`
    //       var año = `© 2020 BuenaVista La Bolsa S.A.C. Todos los derechos reservados.`
    //       var pagWeb = `http://www.buenavistalabolsa.com/`
    //       // Total page number plugin only available in jspdf v1.0+
    //       if (typeof doc.putTotalPages === 'function') {
    //         str = fuente + '\n' +
    //           oficina + '\n' +
    //           año + '\n' +
    //           pagWeb + '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t' +
    //           str + ' de ' + totalPagesExp
    //       }
    //       doc.setFontSize(8)

    //       // jsPDF 1.4+ uses getWidth, <1.4 uses .width
    //       var pageSize = doc.internal.pageSize
    //       var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
    //       doc.text(str, data.settings.margin.left, pageHeight - 20)
    //     },
    //   }

    //   autoTable(doc, autoTablex);

    //   // Total page number plugin only available in jspdf v1.0+
    //   if (typeof doc.putTotalPages === 'function') {
    //     doc.putTotalPages(totalPagesExp)
    //   }

    //   var blob = doc.output("blob");
    //   window.open(URL.createObjectURL(blob));
    // })
  }

  setUltimoMontoAmortizacion(id: string) {

    const amortizacion: any = document.getElementById(id + '_amortizacion');
    this.ultimo_monto_amortizacion = Number(amortizacion.value);
  }

  setUltimoMontoAhorro(id: string) {

    const ahorro: any = document.getElementById(id + '_ahorro');
    this.ultimo_monto_ahorro = Number(ahorro.value);
  }

  calcularTotalAmortizacion(id: string) {

    const total_amortizacion: any = document.getElementById('total_amortizacion');
    const monto_amortizacion: any = document.getElementById(id + '_amortizacion');
    const nuevo_total_amortizacion: number = Number(total_amortizacion.value) + Number(monto_amortizacion.value) - this.ultimo_monto_amortizacion;

    total_amortizacion.value = nuevo_total_amortizacion;
  }

  calcularTotalAhorro(id: string) {

    const total_ahorro: any = document.getElementById('total_ahorro');
    const monto_ahorro: any = document.getElementById(id + '_ahorro');
    const nuevo_total_ahorro: number = Number(total_ahorro.value) + Number(monto_ahorro.value) - this.ultimo_monto_ahorro;

    total_ahorro.value = nuevo_total_ahorro;
  }

  buscarCarteraSocios(tipo: string) {

    if (tipo === "") {
      this.cargando = true;
      this.lista = [];
    }
    else
      this.listarProductos(tipo);
  }

  verReporte() {

    this.listaReporte = [];
    // const analista = this.seguridadService.seguridad.id

    // console.log(this.analista)

    // let i = 0;

    // this.lista.forEach((item: any) => {

    //   const amortizacion: any = document.getElementById(item.id + '_amortizacion');
    //   const ahorro: any = document.getElementById(item.id + '_ahorro');

    //   if (Number(amortizacion.value) > 0 || Number(ahorro.value) > 0) {
    //     i++;
    //     this.listaReporte.push([
    //       i,
    //       item.persona.documento_identidad,
    //       `${item.persona.apellido_paterno}  ${item.persona.apellido_materno}, ${item.persona.nombre}`,
    //       item.producto.codigo,
    //       item.producto.codigo_programacion,
    //       Number(amortizacion.value).toFixed(2),
    //       Number(ahorro.value).toFixed(2)
    //     ])
    //     // this.listaReporte.push([
    //     //   numeracion: i,
    //     //   documento_identidad: item.persona.documento_identidad,
    //     //   socio: `${item.persona.apellido_paterno}  ${item.persona.apellido_materno}, ${ item.persona.nombre }`,
    //     //   producto: item.producto.codigo,
    //     //   programacion: item.producto.codigo_programacion,
    //     //   monto_amortizacion: Number(amortizacion.value),
    //     //   monto_ahorro_voluntario: Number(ahorro.value)
    //     // ])
    //   }
    // });

    // if (this.listaReporte.length === 0) {
    //   Swal.fire({
    //     text: "Ingresar al menos un monto a pagar.", icon: 'warning'
    //   });
    //   return;
    // }

    this.serviceOperacionFinancieraPago.listarRecibosPreVigentesPorAnalista(this.analista)
      // .pipe(
      //   delay(100)
      // )
      .subscribe((res: []) => {

        // this.listaReporte = res;
        // console.log(res)

        if (res.length > 0) {
          // Swal.fire({
          //   text: "No hay ningún pago pendiente de confirmación realizado.", icon: 'warning'
          // });
          // return;
          // }

          let i = 0;

          res.forEach((item: any) => {

            // const amortizacion: any = document.getElementById(item.id + '_amortizacion');
            // const ahorro: any = document.getElementById(item.id + '_ahorro');

            const monto_total = Number(item.producto.monto_ahorro_programado) +
              Number(item.producto.monto_amortizacion_capital) +
              Number(item.producto.monto_interes) +
              Number(item.producto.monto_mora)

            // if (Number(amortizacion.value) > 0 || Number(ahorro.value) > 0) {
            i++;
            this.listaReporte.push([
              i,
              item.recibo.numero,
              item.recibo.fecha,
              item.producto.documento_identidad_persona,
              item.producto.nombre_persona,
              item.producto.descripcion,
              item.producto.descripcion_programacion,
              Number(monto_total).toFixed(2),
              Number(item.producto.monto_ahorro_voluntario).toFixed(2)
            ])
            // this.listaReporte.push([
            //   numeracion: i,
            //   documento_identidad: item.persona.documento_identidad,
            //   socio: `${item.persona.apellido_paterno}  ${item.persona.apellido_materno}, ${ item.persona.nombre }`,
            //   producto: item.producto.codigo,
            //   programacion: item.producto.codigo_programacion,
            //   monto_amortizacion: Number(amortizacion.value),
            //   monto_ahorro_voluntario: Number(ahorro.value)
            // ])
            // }
          });
        }
        // this.productos = res.lista;
        // this.cargando = false;

        this.construirReporte();
      });
  }

}
