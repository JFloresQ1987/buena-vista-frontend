import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import { OperacionFinancieraService } from '../../../../services/core/registro/operacion-financiera.service';
import { ActivatedRoute } from '@angular/router';
import { OperaconFinanciera } from '../../../../interfaces/core/registro/operacion-financiera.interface';
import { OperacionFinancieraPagoService } from '../../../../services/core/caja/operacion-financiera-pago.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OperaconFinancieraPago } from '../../../../interfaces/core/registro/operacion-financiera-pago';
import { Socio } from '../../../../models/core/socio.model';
import { SesionSocioService } from '../../../../services/shared/sesion-socio.service';
import { element } from 'protractor';
import { Recibo } from '../../../../helpers/core/recibo';

@Component({
  selector: 'app-producto-detalle-pago',
  templateUrl: './producto-detalle-pago.component.html',
  styleUrls: ['./producto-detalle-pago.component.css']
})
export class ProductoDetallePagoComponent implements OnInit {

  // private id_operacion_financiera: string;
  public operaconFinanciera: OperaconFinanciera;
  public operaconFinancieraDetalle: [];
  public cargando: boolean = true;
  public cargandoDetalle: boolean = true;
  public form: FormGroup;
  public formSubmitted = false;
  public listaCuotasPagar = [];
  // public modelo: OperaconFinancieraPago;
  public id_operacion_financiera: string;
  public sesionSocio: Socio;
  // public recibo;

  constructor(private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private serviceOperacionFinanciera: OperacionFinancieraService,
    private serviceOperacionFinancieraPago: OperacionFinancieraPagoService,
    private sesionSocioService: SesionSocioService) {

    this.sesionSocio = this.sesionSocioService.sesionSocio
    // this.recibo = new recibo();
  }

  ngOnInit(): void {

    // this.id_operacion_financiera = this.route.snapshot.params.id

    // this.listarProducto();


    // content.hide(); 
    const element = document.getElementById('divRecibo');
    // element.hidden = true;

    this.activatedRoute.params.subscribe(({ id }) => {


      this.id_operacion_financiera = id;
      // this.listarProducto(this.id_operacion_financiera);
      this.listarProductoDetalle(this.id_operacion_financiera);
    })

    this.form = this.formBuilder.group({
      monto_cancelar: ['0', [Validators.required, Validators.min(0.1), Validators.maxLength(10)]],
      monto_ahorro_voluntario: ['0', [Validators.required, Validators.min(0), Validators.maxLength(10)]],
      monto_total: ['0', [Validators.required, Validators.min(0.1), Validators.maxLength(10)]],
      monto_recibido: ['0', [Validators.required, Validators.min(0.1), Validators.maxLength(10)]],
      monto_vuelto: ['0', [Validators.required, Validators.min(0), Validators.maxLength(10)]],
    });

    // setTimeout(() => {
    //   this.listarProducto();
    // }, 100);
  }

  verPDF() {

    var doc: any = new jsPDF()
    var totalPagesExp = '{ total_pages_count_string }'

    const autoTablex: any = {
      // head: this.headRows(),
      // body: this.bodyRows(120),
      html: '#example',
      didDrawPage: async (data) => {
        // Header
        doc.setFontSize(20)
        doc.setTextColor(40)

        var img = new Image();
        img.src = "https://images.pexels.com/photos/209640/pexels-photo-209640.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=300";
        // img.src = path.resolve('sample.jpg');

        // var doc = new jsPDF('p', 'mm', 'a3');  // optional parameters
        // doc.addImage(img, 'PNG', data.settings.margin.left, 15, 10, 10);
        // doc.addImage(img, 'PNG', 1, 2);
        // doc.save("new.pdf");

        if (img.src) {
          // doc.addImage(imgg, 'JPEG', data.settings.margin.left, 15, 10, 10)
          doc.addImage(img, 'PNG', data.settings.margin.left, 15, 10, 10);
        }

        doc.text('Report', data.settings.margin.left + 15, 22)

        // Footer
        var str = 'Page ' + doc.internal.getNumberOfPages()
        // // Total page number plugin only available in jspdf v1.0+
        // if (typeof doc.putTotalPages === 'function') {
        str = str + ' of ' + totalPagesExp
        // }
        doc.setFontSize(10)

        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageSize = doc.internal.pageSize
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
        doc.text(str, data.settings.margin.left, pageHeight - 10)
      },
      margin: { top: 30 },
    };

    // autoTable(doc, { html: '#example' })
    autoTable(doc, autoTablex);
    // })

    // Total page number plugin only available in jspdf v1.0+
    if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages(totalPagesExp)
    }

    // return doc
    doc.output('dataurlnewwindow');
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

    this.serviceOperacionFinancieraPago.listarProductoDetalle(id_operacion_financiera)
      // .pipe(
      //   delay(100)
      // )
      .subscribe((res: any) => {

        // this.productos = res.lista;
        // this.cargando = false;

        this.operaconFinancieraDetalle = res;
        // this.operaconFinanciera = res.modelo;

        this.cargandoDetalle = false;

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

  agregarCuota(id: string, agregar: boolean) {

    // const element = document.getElementById('md_checkbox_21');

    const cuota: any = this.operaconFinancieraDetalle.find((item: any) => item.id === id);
    const monto_cancelar = this.form.get('monto_cancelar').value;

    if (agregar) {

      this.listaCuotasPagar.push(id);
      this.form.controls.monto_cancelar.setValue((Number(monto_cancelar) + Number(cuota.monto_cuota)).toFixed(2));
    }
    else {

      this.listaCuotasPagar.splice(this.listaCuotasPagar.indexOf(id), 1);
      this.form.controls.monto_cancelar.setValue((Number(monto_cancelar) - Number(cuota.monto_cuota)).toFixed(2));
    }

    this.calcularMontos();
  }

  agregarTodasLasCuota(agregar: boolean) {

    let monto_cancelar: number = 0;
    this.listaCuotasPagar = [];
    // this.form.get('monto_cancelar').setValue(0);

    // if (agregar) {

    this.operaconFinancieraDetalle.forEach((item: any) => {

      if (agregar) {

        this.listaCuotasPagar.push(item.id);
        monto_cancelar += Number(item.monto_cuota);
        // this.form.get(item.id).setValue(true);
        // document.getElementById(item.id)//.checked==true;
        // document.getElementById(item.id) = true;

        let element: any = document.getElementById(item.id);
        element.checked = true;
      }
      else {

        // this.form.get(item.id).setValue(false);
        // document.getElementById(item.id).spellcheck = false;
        let element: any = document.getElementById(item.id);
        element.checked = false;
      }
    });
    // }

    this.form.get('monto_cancelar').setValue(monto_cancelar.toFixed(2));

    // // const element = document.getElementById('md_checkbox_21');

    // const cuota: any = this.operaconFinancieraDetalle.find((item: any) => item.id === id);
    // // const monto_cancelar = this.form.get('monto_cancelar').value;

    // if (agregar) {

    //   this.listaCuotasPagar.push(id);
    //   this.form.controls.monto_cancelar.setValue(Number(monto_cancelar) + Number(cuota.monto_cuota));
    // }
    // else {

    //   this.listaCuotasPagar.splice(this.listaCuotasPagar.indexOf(id), 1);
    //   this.form.controls.monto_cancelar.setValue(Number(monto_cancelar) - Number(cuota.monto_cuota));
    // }

    this.calcularMontos();
  }

  realizarPago() {

    if (this.listaCuotasPagar.length === 0) {
      Swal.fire({
        text: "Seleccionar al menos una cuota a pagar.", icon: 'warning'
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

    const modelo: OperaconFinancieraPago = this.form.value;

    // modelo.monto_ahorro_voluntario = this.form.get('monto_ahorro_voluntario').value;
    // modelo.monto_recibido = this.form.get('monto_recibido').value
    modelo.operacion_financiera = this.id_operacion_financiera;
    modelo.cuotas = this.listaCuotasPagar;
    modelo.id_socio = this.sesionSocio.id;
    modelo.documento_identidad_socio = this.sesionSocio.documento_identidad;
    modelo.nombres_apellidos_socio = this.sesionSocio.getNombreCompleto();

    // this.imprimirRecibo(null);

    this.serviceOperacionFinancieraPago.pagarProducto(modelo)
      .subscribe(res => {

        Swal.fire({
          text: 'El pago se realizó satisfactoriamente.', icon: 'success'
        });

        // this.imprimirRecibo(res);
        // this.construirRecibo(res);
        // this.imprimirRecibo(res);

        const recibo = new Recibo();

        recibo.imprimirRecibo(res)

        this.cancelar();
        // this.form.reset();
        // this.form.reset(this.form.value);
        // this.form.resetForm({resetType:ResetFormType.ControlsOnly});
        // this.userFormGroup.resetForm({resetType:ResetFormType.FormGroupsOnly});
        // this.userFormGroup.resetForm({resetType:ResetFormType.FormArraysOnly});
        // this.userFormGroup.resetForm({resetType:ResetFormType.ControlsAndFormGroupsOnly});

      });
  }

  cancelar() {

    this.listaCuotasPagar = [];

    this.formSubmitted = false;
    this.form.reset();

    this.listarProductoDetalle(this.id_operacion_financiera);

    this.form.get('monto_cancelar').setValue(0);
    this.form.get('monto_ahorro_voluntario').setValue(0);
    this.form.get('monto_total').setValue(0);
    this.form.get('monto_recibido').setValue(0);
    this.form.get('monto_vuelto').setValue(0);
  }

  calcularMontos() {

    // this.formSubmitted = true;
    //   if (!this.form.valid) {
    //     Swal.fire({
    //       text: "Validar la información proporcionada.", icon: 'warning'
    //     });
    //     return;
    //   }

    const monto_cancelar = this.form.get('monto_cancelar').value;
    const monto_ahorro_voluntario = this.form.get('monto_ahorro_voluntario').value || 0;

    const monto_total = Number(monto_cancelar) + Number(monto_ahorro_voluntario);
    // const monto_total = this.form.get('monto_total').value;

    const monto_recibido = this.form.get('monto_recibido').value || 0;
    // const monto_vuelto = this.form.get('monto_vuelto').value;
    let monto_vuelto = Number(monto_recibido) - monto_total;

    if (monto_vuelto < 0)
      monto_vuelto = 0;

    this.form.controls.monto_total.setValue(monto_total.toFixed(2));
    this.form.controls.monto_vuelto.setValue(monto_vuelto.toFixed(2));
  }

  // imprimirRecibo2(recibo: []) {

  //   const opciones: any = {
  //     orientation: 'p',
  //     unit: 'cm',
  //     format: [16, 16]
  //   };

  //   // var doc = new jsPDF(opciones);

  //   // doc.setFontSize(10);
  //   // doc.text('       Buenavista La Bolsa S.A.C.', 10, 30);
  //   // doc.text('            Agencia Ayacucho', 10, 35);
  //   // doc.text('------------------------------------------', 10, 40);
  //   // doc.text('RUC: 20574744599                I-00000009', 10, 45);
  //   // doc.text('', 10, 55);
  //   // doc.text('DNI: 44684165', 10, 60);
  //   // doc.text('Socio: Jorge Flores Quispe', 10, 65);
  //   // doc.text('Analista: Jorge Flores Quispe', 10, 70);
  //   // doc.text('Producto: Créditos Personales', 10, 90);
  //   // doc.text('Operación en Soles', 10, 95);
  //   // doc.text('', 10, 100);
  //   // doc.text('Detalle Operación', 10, 105);
  //   // doc.text('------------------------------------------', 10, 110);
  //   // doc.text('Ahorro voluntario', 10, 115);
  //   // doc.text('Amortización Capital', 10, 120);
  //   // doc.text('Interés', 10, 125);
  //   // doc.text('------------------------------------------', 10, 130);
  //   // doc.text('Total', 10, 135);
  //   // doc.text('', 10, 140);
  //   // doc.text('Usuario: 44684165', 10, 145);
  //   // doc.text('Fecha: 09/09/2020 06:15:56 pm', 10, 150);
  //   // doc.text('Recibo: Original', 10, 155);
  //   // doc.text('** Frase **', 10, 160);

  //   // doc.autoPrint({ variant: 'non-conform' });
  //   // doc.save('comprobante.pdf');

  //   var doc: any = new jsPDF(opciones)

  //   // doc.setFontSize(12);

  //   // doc.text('Theme "striped"', 14, 16)
  //   // doc.autoTable({ head: headRows(), body: bodyRows(5), startY: 20 })

  //   // doc.text('Theme "grid"', 14, doc.lastAutoTable.finalY + 10)
  //   // doc.autoTable({
  //   //   head: headRows(),
  //   //   body: bodyRows(5),
  //   //   startY: doc.lastAutoTable.finalY + 14,
  //   //   theme: 'grid',
  //   // })

  //   // doc.text('Theme "plain"', 14, 16)
  //   // doc.text('Theme "plain"', 14, doc.lastAutoTable.finalY + 10)


  //   // doc.autoTable({
  //   //   head: this.headRows(),
  //   //   body: this.bodyRows(5),
  //   //   startY: 20,
  //   //   // startY: doc.lastAutoTable.finalY + 14,
  //   //   theme: 'plain',
  //   // })

  //   // const body = this.bodyRows(5);

  //   // doc.text('Theme "striped"', 0, 5)

  //   doc.autoTable({
  //     // startX: 0,
  //     startY: 0.5,
  //     margin: {
  //       right: 0,
  //       left: 0
  //     },
  //     styles: {
  //       valign: 'middle',
  //       font: 'courier',
  //       // font: 'monospace',
  //       // font: 'courier-boldregular',
  //       // font: 'meta',
  //       fontSize: 16,
  //       // fontSize: 10,
  //       fontStyle: 'bold',
  //       // fillColor: [255, 255, 255],
  //       textColor: [0, 0, 0],
  //       // lineColor: [0, 0, 0],
  //       rowHeight: 0.5,
  //       // columnWidth: '100',
  //       cellPadding: 0,
  //       charSpace: '50'
  //       // lineWidth: 1
  //     },
  //     // styles: {overflow: 'linebreak', columnWidth: '100', font: 'arial', fontSize: 10, cellPadding: 4, overflowColumns: 'linebreak'}
  //     // head: [
  //     //   [
  //     //     {
  //     //       content: 'Buenavista La Bolsa S.A.C.',
  //     //       colSpan: 3,
  //     //       styles: { halign: 'center' },
  //     //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
  //     //       columnHeight: 35
  //     //     },
  //     //   ],
  //     // ],
  //     body: recibo,
  //     theme: 'plain',
  //     // theme: 'grid',
  //   });

  //   doc.setCharSpace('50');


  //   doc.autoPrint();//<- para llamar a imprimir    
  //   doc.output('dataurlnewwindow');//<-- para ver pdf en nueva pestaña
  //   // doc.output('save', 'filename.pdf'); //Try to save PDF as a file (not works on ie before 10, and some mobile devices)
  //   // doc.output('datauristring');        //returns the data uri string
  //   // doc.output('datauri');              //opens the data uri in current window
  //   // doc.output('dataurlnewwindow');     //opens the data uri in new window
  // }

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

  // cancelar() {    

  //   this.formSubmitted=false
  //   this.form.reset()
  // }

  // construirRecibo(data: any) {

  //   // content.html('');
  //   const content: any = document.getElementById('divRecibo');

  //   content.innerHTML = '';
  //   // content.html('');

  //   // content.append

  //   // content.append

  //   content.append('<div class="row-form-24"><div class="span5 center">' + data.institucion.denominacion + '</div></div>');
  //   content.append('<div class="row-form-24"><div class="span5 center">' + data.institucion.agencia + '</div></div>');
  //   content.append('<div class="row-form-24"><div class="linea"></div></div>');
  //   content.append('<div class="row-form-24"><div class="span3">RUC: ' + data.institucion.ruc + '</div><div class="span2 right">' + data.recibo.numero + '</div></div>');
  //   content.append('<div class="row-form-24"><div class="espacio"></div></div>');
  //   content.append('<div class="row-form-24"><div class="span5">DNI: ' + data.persona.documento_identidad + '</div></div>');
  //   content.append('<div class="row-form-24"><div class="span5">Socio: ' + data.persona.nombre_completo + '</div></div>');

  //   // $.each(data.ListaRecibos, function (index, i) {

  //     if (data.responsable)
  //       content.append('<div class="row-form-24"><div class="span5">Analista: ' + data.responsable + '</div></div>');
  //     else
  //       content.append('<div class="row-form-24"><div class="span5">Responsable: ' + data.analista + '</div></div>');

  //     if (data.bancomunal)
  //       content.append('<div class="row-form-24"><div class="span5">Bancomunal: ' + data.bancomunal.grupo + '</div></div>');

  //     content.append('<div class="row-form-24"><div class="span5">Producto: ' + data.producto.descripcion + '</div></div>');

  //     //if (i.ConceptoDetalle != null && i.ConceptoDetalle != '')
  //     //    content.append('<div class="row-form-24"><div class="span5">Concepto: ' + i.ConceptoDetalle + '</div></div>');

  //     content.append('<div class="row-form-24"><div class="espacio"></div></div>');
  //     content.append('<div class="row-form-24"><div class="span5">Operaciones en Soles</div></div>');
  //     content.append('<div class="row-form-24"><div class="espacio"></div></div>');
  //     //content.append('<div class="row-form-24"><div class="span4 center">Detalle Operación</div><div class="span1 center">Monto</div></div>');
  //     content.append('<div class="row-form-24"><div class="span3 center">Detalle Operación</div><div class="span1 center">Cuota</div><div class="span1 center">Monto</div></div>');
  //     content.append('<div class="row-form-24"><div class="linea"></div></div>');
  //     //content.append('<div class="row-form-24"><div class="span4">' + i.OperacionFinanciera + '</div><div class="span1 right">' + i.MontoTransaccion + '</div></div>');

  //     if (data.producto.monto_gasto)
  //       content.append('<div class="row-form-24"><div class="span4">Gasto Administrativo</div><div class="span1 right">' + data.producto.monto_gasto + '</div></div>');
  //     if (data.producto.monto_ahorro_inicial)
  //       content.append('<div class="row-form-24"><div class="span4">Aporte Inicial</div><div class="span1 right">' + data.producto.monto_ahorro_inicial + '</div></div>');
  //     if (data.producto.monto_ahorro_voluntario)
  //         content.append('<div class="row-form-24"><div class="span4">Ahorro Voluntario</div><div class="span1 right">' + data.producto.monto_ahorro_voluntario + '</div></div>');      
  //     if (data.producto.monto_ahorro_programado)
  //       content.append('<div class="row-form-24"><div class="span4">Ahorro Programado</div><div class="span1 right">' + data.producto.monto_ahorro_programado + '</div></div>');
  //     if (data.producto.monto_amortizacion_capital)
  //       content.append('<div class="row-form-24"><div class="span3">Amortización Capital</div><div class="span1 center">' + data.producto.cuota + '</div><div class="span1 right">' + data.producto.monto_amortizacion_capital + '</div></div>');
  //     if (data.producto.monto_interes)
  //       content.append('<div class="row-form-24"><div class="span3">Interés</div><div class="span1 center">' + data.producto.cuota + '</div><div class="span1 right">' + data.producto.monto_interes + '</div></div>');
  //     if (data.producto.monto_mora)
  //       content.append('<div class="row-form-24"><div class="span4">Mora</div><div class="span1 right">' + data.producto.monto_mora + '</div></div>');
  //     if (data.producto.monto_interes_ganado)
  //       content.append('<div class="row-form-24"><div class="span4">Interés ganado</div><div class="span1 right">' + data.producto.monto_interes_ganado + '</div></div>');
  //     if (data.producto.monto_retiro_interes_ganado)
  //       content.append('<div class="row-form-24"><div class="span4">Retiro Aporte I.</div><div class="span1 right">' + data.producto.monto_retiro_interes_ganado + '</div></div>');
  //     if (data.producto.monto_retiro_ahorro_voluntario)
  //         content.append('<div class="row-form-24"><div class="span4">Retiro Ahorro V.</div><div class="span1 right">' + data.producto.monto_retiro_ahorro_voluntario + '</div></div>');
  //     if (data.producto.monto_retiro_ahorro_programado)
  //       content.append('<div class="row-form-24"><div class="span4">Retiro Ahorro P.</div><div class="span1 right">' + data.producto.monto_retiro_ahorro_programado + '</div></div>');
  //     if (data.producto.monto_retiro_interes_ganado)
  //       content.append('<div class="row-form-24"><div class="span4">Retiro Interés G.</div><div class="span1 right">' + data.producto.monto_retiro_interes_ganado + '</div></div>');

  //     // if (i.ConceptoOperacionFinanciera != null && i.ConceptoOperacionFinanciera != '') {
  //     //   var monto = (i.MontoRetiroAhorroVoluntario != '0.00' && i.MontoRetiroAhorroVoluntario != '0') ? i.MontoRetiroAhorroVoluntario : i.MontoAhorroVoluntario;
  //     //   content.append('<div class="row-form-24"><div class="span4">' + i.ConceptoOperacionFinanciera + '</div><div class="span1 right">' + monto + '</div></div>');
  //     // }

  //     // if (i.ConceptoDetalle != null && i.ConceptoDetalle != '')
  //     //   content.append('<div class="row-form-24"><div class="span5">Det.: ' + i.ConceptoDetalle + '</div></div>');

  //     //if (i.MontoAhorroVoluntario != '0.00' && i.MontoAhorroVoluntario != '0')
  //     //    content.append('<div class="row-form-24"><div class="span4">Ahorro Voluntario</div><div class="span1 right">' + i.MontoAhorroVoluntario + '</div></div>');

  //     content.append('<div class="row-form-24"><div class="linea"></div></div>');
  //     content.append('<div class="row-form-24"><div class="span4 center">Total: S/. </div><div class="span1 right">' + data.recibo.monto_total + '</div></div>')

  //     // if (i.MontoTotalAhorrosLibres != null && i.MontoTotalAhorrosLibres != '0.00' && i.MontoTotalAhorrosLibres != '0') {
  //     //   content.append('<div class="row-form-24"><div class="espacio"></div></div>');
  //     //   content.append('<div class="row-form-24"><div class="span4 center">Total Ahorro Restante: S/. </div><div class="span1 right">' + i.MontoTotalAhorrosLibres + '</div></div>')
  //     // }

  //     content.append('<div class="row-form-24"><div class="espacio"></div></div>');
  //     //content.append('<div class="row-form-24"><div class="espacio"></div></div>');
  //     //content.append('<div class="row-form-24"><div class="espacio"></div></div>');
  //     //content.append('<div class="row-form-24"><div class="espacio"></div></div>');
  //     //content.append('<div class="row-form-24"><div class="espacio"></div></div>');
  //     content.append('<div class="row-form-24"><div class="span5">Usuario: ' + data.recibo.usuario + '</div></div>');
  //     content.append('<div class="row-form-24"><div class="span5">Fecha: ' + data.recibo.fecha + '</div></div>');
  //     content.append('<div class="row-form-24"><div class="span5">Recibo: ' + data.recibo.tipo_impresion + '</div></div>');
  //     content.append('<div class="row-form-24"><div class="espacio"></div></div>');
  //     content.append('<div class="row-form-24"><div class="span5 center">** ' + data.institucion.frase + ' **</div></div>');
  //   // });

  //   this.imprimirRecibo();
  // }

  // imprimirRecibo(data: any) {
  //   try {
  //     const iframe: any = document.getElementById('ifrmPrint');
  //     let doc = (iframe.contentWindow || iframe.contentDocument);

  //     if (doc.document) doc = doc.document;

  //     doc.write('<head><title></title>');
  //     doc.write('<link href="../../../../../assets/css/recibo.css" rel="stylesheet" type="text/css"/>');
  //     doc.write('</head><body onload="this.focus(); this.print();">');

  //     doc.write('<div class="ticket">');
  //     doc.write('<p class="centrado">' + data.institucion.denominacion);
  //     doc.write('<br>' + data.institucion.agencia);
  //     doc.write('<br>----------------------------------------------</p>');
  //     doc.write('<table>');
  //     doc.write('<tbody>');
  //     doc.write('<tr>');
  //     doc.write('<td class="ruc">RUC: ' + data.institucion.ruc + '</td><td class="recibo derecha">' + data.recibo.numero + '</td>');
  //     doc.write('</tr>');
  //     doc.write('</tbody>');
  //     doc.write('</table>');
  //     doc.write('<p>DNI: ' + data.persona.documento_identidad);
  //     doc.write('<br>Socio: ' + data.persona.nombre_completo);

  //     if (data.responsable)
  //       doc.write('<br>Analista: ' + data.responsable);
  //     else
  //       doc.write('<br>Responsable: ' + data.analista);

  //     if (data.bancomunal)
  //       doc.write('<br>Bancomunal: ' + data.bancomunal.grupo);

  //     doc.write('<br>Producto: ' + data.producto.descripcion);
  //     doc.write('</p>');
  //     doc.write('<p>');
  //     doc.write('Operaciones en Soles');
  //     doc.write('</p>');
  //     doc.write('<table>');
  //     doc.write('<tbody>');
  //     doc.write('<tr class="border-bottom">');
  //     doc.write('<td class="detalle centrado">Detalle Operación</td>');
  //     doc.write('<td class="monto derecha">Monto</td>');
  //     doc.write('</tr>');

  //     if (Number(data.producto.monto_gasto) > 0) {
  //       doc.write('<tr>');
  //       doc.write('<td class="detalle">Gasto Administrativo</td><td class="monto derecha">' + data.producto.monto_gasto + '</td>');
  //       doc.write('</tr>');
  //     }
  //     if (Number(data.producto.monto_ahorro_inicial) > 0) {
  //       doc.write('<tr>');
  //       doc.write('<td class="detalle">Aporte Inicial</td><td class="monto derecha">' + data.producto.monto_ahorro_inicial + '</td>');
  //       doc.write('</tr>');
  //     }
  //     if (Number(data.producto.monto_ahorro_voluntario) > 0) {
  //       doc.write('<tr>');
  //       doc.write('<td class="detalle">Ahorro Voluntario</td><td class="monto derecha">' + data.producto.monto_ahorro_voluntario + '</td>');
  //       doc.write('</tr>');
  //     }

  //     var monto_cuota = 0;

  //     if (Number(data.producto.monto_ahorro_programado) > 0) {
  //       monto_cuota += Number(data.producto.monto_ahorro_programado);
  //     }
  //     if (Number(data.producto.monto_amortizacion_capital) > 0) {
  //       monto_cuota += Number(data.producto.monto_amortizacion_capital);
  //     }
  //     if (Number(data.producto.monto_interes) > 0) {
  //       monto_cuota += Number(data.producto.monto_interes);
  //     }
  //     if (monto_cuota > 0) {
  //       doc.write('<tr>');
  //       doc.write('<td class="detalle">Cuota: ' + data.producto.cuota + '</td><td class="monto derecha">' + monto_cuota.toFixed(2) + '</td>');
  //       doc.write('</tr>');
  //     }
  //     if (Number(data.producto.monto_mora) > 0) {
  //       doc.write('<tr>');
  //       doc.write('<td class="detalle">Mora</td><td class="monto derecha">' + data.producto.monto_mora + '</td>');
  //       doc.write('</tr>');
  //     }
  //     if (Number(data.producto.monto_interes_ganado) > 0) {
  //       doc.write('<tr>');
  //       doc.write('<td class="detalle">Interés ganado</td><td class="monto derecha">' + data.producto.monto_interes_ganado + '</td>');
  //       doc.write('</tr>');
  //     }
  //     if (Number(data.producto.monto_retiro_interes_ganado) > 0) {
  //       doc.write('<tr>');
  //       doc.write('<td class="detalle">Retiro Aporte I.</td><td class="monto derecha">' + data.producto.monto_retiro_interes_ganado + '</td>');
  //       doc.write('</tr>');
  //     }
  //     if (Number(data.producto.monto_retiro_ahorro_voluntario) > 0) {
  //       doc.write('<tr>');
  //       doc.write('<td class="detalle">Retiro Ahorro V.</td><td class="monto derecha">' + data.producto.monto_retiro_ahorro_voluntario + '</td>');
  //       doc.write('</tr>');
  //     }
  //     if (Number(data.producto.monto_retiro_ahorro_programado) > 0) {
  //       doc.write('<tr>');
  //       doc.write('<td class="detalle">Retiro Ahorro P.</td><td class="monto derecha">' + data.producto.monto_retiro_ahorro_programado + '</td>');
  //       doc.write('</tr>');
  //     }
  //     if (Number(data.producto.monto_retiro_interes_ganado) > 0) {
  //       doc.write('<tr>');
  //       doc.write('<td class="detalle">Retiro Interés G.</td><td class="monto derecha">' + data.producto.monto_retiro_interes_ganado + '</td>');
  //       doc.write('</tr>');
  //     }

  //     // if (i.ConceptoOperacionFinanciera != null && i.ConceptoOperacionFinanciera != '') {
  //     //   var monto = (i.MontoRetiroAhorroVoluntario != '0.00' && i.MontoRetiroAhorroVoluntario != '0') ? i.MontoRetiroAhorroVoluntario : i.MontoAhorroVoluntario;
  //     //   content.append('<div class="row-form-24"><div class="span4">' + i.ConceptoOperacionFinanciera + '</div><div class="span1 right">' + monto + '</div></div>');
  //     // }

  //     // if (i.ConceptoDetalle != null && i.ConceptoDetalle != '')
  //     //   content.append('<div class="row-form-24"><div class="span5">Det.: ' + i.ConceptoDetalle + '</div></div>');

  //     //if (i.MontoAhorroVoluntario != '0.00' && i.MontoAhorroVoluntario != '0')
  //     //    content.append('<div class="row-form-24"><div class="span4">Ahorro Voluntario</div><div class="span1 right">' + i.MontoAhorroVoluntario + '</div></div>');

  //     // doc.write('<div class="row-form-24"><div class="linea"></div></div>');
  //     doc.write('<tr class="border-top">');
  //     doc.write('<td class="detalle centrado negrita">Total: S/. </td><td class="monto derecha negrita">' + data.recibo.monto_total + '</td>')
  //     doc.write('</tr>');
  //     doc.write('</tbody>');
  //     doc.write('</table>');
  //     doc.write('<p>Usuario: ' + data.recibo.usuario);
  //     doc.write('<br>Fecha: ' + data.recibo.fecha);
  //     doc.write('<br>Recibo: ' + data.recibo.tipo_impresion + '</p>');
  //     doc.write('<p class="centrado">** ' + data.institucion.frase + ' **</p>');
  //     doc.write('</div>');

  //     doc.write('</body>');

  //     doc.close();
  //   } catch (e) {
  //     self.print();
  //   }
  // }
}
