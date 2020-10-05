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

  constructor(private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private serviceOperacionFinanciera: OperacionFinancieraService,
    private serviceOperacionFinancieraPago: OperacionFinancieraPagoService,
    private sesionSocioService: SesionSocioService) {

    this.sesionSocio = this.sesionSocioService.sesionSocio
  }

  ngOnInit(): void {

    // this.id_operacion_financiera = this.route.snapshot.params.id

    // this.listarProducto();

    this.activatedRoute.params.subscribe(({ id }) => {


      this.id_operacion_financiera = id;
      // this.listarProducto(this.id_operacion_financiera);
      this.listarProductoDetalle(this.id_operacion_financiera);
    })

    this.form = this.formBuilder.group({
      monto_cancelar: ['0', [Validators.required, Validators.min(1), Validators.maxLength(10)]],
      monto_ahorro_voluntario: ['0', [Validators.required, Validators.min(0), Validators.maxLength(10)]],
      monto_total: ['0', [Validators.required, Validators.min(1), Validators.maxLength(10)]],
      monto_recibido: ['0', [Validators.required, Validators.min(1), Validators.maxLength(10)]],
      monto_vuelto: ['0', [Validators.required, Validators.min(0), Validators.maxLength(10)]],
    });

    // setTimeout(() => {
    //   // console.log(this.socio.getNombreCompleto());
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

        // console.log(this.base64Img);

        var img = new Image();
        img.src = "https://images.pexels.com/photos/209640/pexels-photo-209640.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=300";
        // img.src = path.resolve('sample.jpg');

        // var doc = new jsPDF('p', 'mm', 'a3');  // optional parameters
        // doc.addImage(img, 'PNG', data.settings.margin.left, 15, 10, 10);
        // doc.addImage(img, 'PNG', 1, 2);
        // doc.save("new.pdf");

        if (img.src) {
          // console.log('entroo') 
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
    // // console.log(this.sesionSocioService.sesionSocio);
    // // console.log(this.socio.getId());
    // // console.log(this.socio.getNombreCompleto());

    // if (this.socio.getId() === '0') {
    //   Swal.fire({
    //     text: "Primero debe buscar un socio.", icon: 'warning'
    //   });
    //   return;
    // }

    this.cargando = true;

    // console.log(this.id_operacion_financiera)

    this.serviceOperacionFinanciera.listarProducto(id_operacion_financiera)
      // .pipe(
      //   delay(100)
      // )
      .subscribe((res: any) => {

        // console.log(res)
        // this.productos = res.lista;
        // this.cargando = false;
        // console.log(this.productos);

        this.operaconFinanciera = res;
        // this.operaconFinanciera = res.modelo;

        this.cargando = false;

        console.log(res)

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
    // // console.log(this.sesionSocioService.sesionSocio);
    // // console.log(this.socio.getId());
    // // console.log(this.socio.getNombreCompleto());

    // if (this.socio.getId() === '0') {
    //   Swal.fire({
    //     text: "Primero debe buscar un socio.", icon: 'warning'
    //   });
    //   return;
    // }

    this.cargandoDetalle = true;

    // console.log(this.id_operacion_financiera)

    this.serviceOperacionFinancieraPago.listarProductoDetalle(id_operacion_financiera)
      // .pipe(
      //   delay(100)
      // )
      .subscribe((res: any) => {

        // console.log(res)
        // this.productos = res.lista;
        // this.cargando = false;
        // console.log(this.productos);

        this.operaconFinancieraDetalle = res;
        // this.operaconFinanciera = res.modelo;

        this.cargandoDetalle = false;

        console.log(res)

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

    // console.log(document.getElementById('md_checkbox_21'));

    // console.log(event);

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

    // console.log(this.listaCuotasPagar)
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
        console.log(document.getElementById(item.id));
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

    // console.log(this.listaCuotasPagar);

    // // console.log(event);

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

    // // console.log(this.listaCuotasPagar)
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

    // console.log('Pagando...')    

    const modelo: OperaconFinancieraPago = this.form.value;

    // console.log(modelo);

    // modelo.monto_ahorro_voluntario = this.form.get('monto_ahorro_voluntario').value;
    // modelo.monto_recibido = this.form.get('monto_recibido').value
    modelo.operacion_financiera = this.id_operacion_financiera;
    modelo.cuotas = this.listaCuotasPagar;
    modelo.id_socio = this.sesionSocio.id;
    modelo.documento_identidad_socio = this.sesionSocio.documento_identidad;
    modelo.nombres_apellidos_socio = this.sesionSocio.getNombreCompleto();

    // this.imprimirRecibo();

    this.serviceOperacionFinancieraPago.pagarProducto(modelo)
      .subscribe(res => {

        console.log(res);
        Swal.fire({
          text: 'El pago se realizó satisfactoriamente.', icon: 'success'
        });

        this.imprimirRecibo(res);

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

    // console.log(this.form.get('monto_ahorro_voluntario').value)
    // console.log(this.form.get('monto_recibido').value)

    const monto_cancelar = this.form.get('monto_cancelar').value;
    const monto_ahorro_voluntario = this.form.get('monto_ahorro_voluntario').value || 0;

    const monto_total = Number(monto_cancelar) + Number(monto_ahorro_voluntario);
    // const monto_total = this.form.get('monto_total').value;
    // console.log(monto_total)

    const monto_recibido = this.form.get('monto_recibido').value || 0;
    // const monto_vuelto = this.form.get('monto_vuelto').value;
    let monto_vuelto = Number(monto_recibido) - monto_total;

    if (monto_vuelto < 0)
      monto_vuelto = 0;

    this.form.controls.monto_total.setValue(monto_total.toFixed(2));
    this.form.controls.monto_vuelto.setValue(monto_vuelto.toFixed(2));
  }

  imprimirRecibo(recibo: []) {

    const opciones: any = {
      orientation: 'p',
      unit: 'mm',
      format: [150, 140]
    };

    // var doc = new jsPDF(opciones);

    // doc.setFontSize(10);
    // doc.text('       Buenavista La Bolsa S.A.C.', 10, 30);
    // doc.text('            Agencia Ayacucho', 10, 35);
    // doc.text('------------------------------------------', 10, 40);
    // doc.text('RUC: 20574744599                I-00000009', 10, 45);
    // doc.text('', 10, 55);
    // doc.text('DNI: 44684165', 10, 60);
    // doc.text('Socio: Jorge Flores Quispe', 10, 65);
    // doc.text('Analista: Jorge Flores Quispe', 10, 70);
    // doc.text('Producto: Créditos Personales', 10, 90);
    // doc.text('Operación en Soles', 10, 95);
    // doc.text('', 10, 100);
    // doc.text('Detalle Operación', 10, 105);
    // doc.text('------------------------------------------', 10, 110);
    // doc.text('Ahorro voluntario', 10, 115);
    // doc.text('Amortización Capital', 10, 120);
    // doc.text('Interés', 10, 125);
    // doc.text('------------------------------------------', 10, 130);
    // doc.text('Total', 10, 135);
    // doc.text('', 10, 140);
    // doc.text('Usuario: 44684165', 10, 145);
    // doc.text('Fecha: 09/09/2020 06:15:56 pm', 10, 150);
    // doc.text('Recibo: Original', 10, 155);
    // doc.text('** Frase **', 10, 160);

    // doc.autoPrint({ variant: 'non-conform' });
    // doc.save('comprobante.pdf');

    var doc: any = new jsPDF(opciones)

    // doc.setFontSize(12);

    // doc.text('Theme "striped"', 14, 16)
    // doc.autoTable({ head: headRows(), body: bodyRows(5), startY: 20 })

    // doc.text('Theme "grid"', 14, doc.lastAutoTable.finalY + 10)
    // doc.autoTable({
    //   head: headRows(),
    //   body: bodyRows(5),
    //   startY: doc.lastAutoTable.finalY + 14,
    //   theme: 'grid',
    // })

    // doc.text('Theme "plain"', 14, 16)
    // doc.text('Theme "plain"', 14, doc.lastAutoTable.finalY + 10)


    // doc.autoTable({
    //   head: this.headRows(),
    //   body: this.bodyRows(5),
    //   startY: 20,
    //   // startY: doc.lastAutoTable.finalY + 14,
    //   theme: 'plain',
    // })

    // const body = [
    //   [
    //     {
    //       content: 'Buenavista La Bolsa S.A.C.',
    //       colSpan: 3,
    //       styles: { halign: 'center' },
    //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
    //     },
    //   ],
    //   [
    //     {
    //       content: 'Agencia Ayacucho',
    //       colSpan: 3,
    //       styles: { halign: 'center' },
    //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
    //     },
    //   ],
    //   // [
    //   //   {
    //   //     content: 'RUC: 20574744599',
    //   //     colSpan: 3,
    //   //     styles: { halign: 'center' },
    //   //     // styles: { halign: 'center', fillColor: [22, 160, 133] },
    //   //   },
    //   // ],
    //   [
    //     {
    //       content: '------------------------------------',
    //       colSpan: 3,
    //       styles: { halign: 'center' },
    //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
    //     },
    //   ],
    //   [
    //     {
    //       content: 'RUC: 20574744599',
    //       colSpan: 1,
    //       styles: { halign: 'left' },
    //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
    //     },
    //     {
    //       content: '',
    //       colSpan: 1,
    //       // styles: { halign: 'left' },
    //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
    //     },
    //     {
    //       content: 'I-00000009',
    //       colSpan: 1,
    //       styles: { halign: 'right' },
    //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
    //     },
    //   ],
    //   [

    //   ],
    //   [
    //     {
    //       content: 'DNI: 44684165',
    //       colSpan: 3,
    //       styles: { halign: 'left' },
    //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
    //     }
    //   ],
    //   [
    //     {
    //       content: 'Socio: Jorge Flores Quispe',
    //       colSpan: 3,
    //       styles: { halign: 'left' },
    //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
    //     }
    //   ],
    //   [
    //     {
    //       content: 'Analista: Jorge Flores Quispe',
    //       colSpan: 3,
    //       styles: { halign: 'left' },
    //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
    //     }
    //   ],
    //   [
    //     {
    //       content: 'Producto: Créditos Personales',
    //       colSpan: 3,
    //       styles: { halign: 'left' },
    //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
    //     }
    //   ],
    //   [

    //   ],
    //   [
    //     {
    //       content: 'Operaciones en Soles',
    //       colSpan: 3,
    //       styles: { halign: 'left' },
    //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
    //     }
    //   ],
    //   [
    //     {
    //       content: '------------------------------------',
    //       colSpan: 3,
    //       styles: { halign: 'center' },
    //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
    //     },
    //   ],
    //   [
    //     {
    //       content: 'Detalle Operación',
    //       colSpan: 2,
    //       styles: { halign: 'center' },
    //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
    //     },
    //     {
    //       content: 'Monto',
    //       colSpan: 1,
    //       styles: { halign: 'right' },
    //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
    //     }
    //   ],
    //   [
    //     {
    //       content: '------------------------------------',
    //       colSpan: 3,
    //       styles: { halign: 'center' },
    //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
    //     },
    //   ],
    //   [
    //     {
    //       content: 'Ahorro Voluntario es la prueba para ver como entra cuando es tet largo...',
    //       colSpan: 2,
    //       styles: { halign: 'left' },
    //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
    //     },
    //     {
    //       content: '999.00',
    //       colSpan: 1,
    //       styles: { halign: 'right' },
    //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
    //     }
    //   ],
    //   [
    //     {
    //       content: 'Amortización Capital',
    //       colSpan: 2,
    //       styles: { halign: 'left' },
    //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
    //     },
    //     {
    //       content: '9999.99',
    //       colSpan: 1,
    //       styles: { halign: 'right' },
    //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
    //     }
    //   ],
    //   [
    //     {
    //       content: '------------------------------------',
    //       colSpan: 3,
    //       styles: { halign: 'center' },
    //       // rowHeight: 2
    //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
    //     },
    //   ],
    //   [
    //     {
    //       content: 'Total: S/.',
    //       colSpan: 2,
    //       styles: { halign: 'center' },
    //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
    //     },
    //     {
    //       content: '99999.99',
    //       colSpan: 1,
    //       styles: { halign: 'right' },
    //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
    //     }
    //   ],
    //   [
    //     // {
    //     //   colSpan: 3
    //     // }
    //   ],
    //   [
    //     {
    //       content: 'Usuario: 44684165',
    //       colSpan: 3,
    //       styles: { halign: 'left' },
    //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
    //     }
    //   ],
    //   [
    //     {
    //       content: 'Fecha: 03/09/2020 12:44:58',
    //       colSpan: 3,
    //       styles: { halign: 'left' },
    //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
    //     }
    //   ],
    //   [
    //     {
    //       content: 'Recibo: Original',
    //       colSpan: 3,
    //       styles: { halign: 'left' },
    //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
    //     }
    //   ],
    //   [
    //     // {
    //     //   colSpan: 3
    //     // }
    //   ],
    //   [
    //     {
    //       content: '** **',
    //       colSpan: 3,
    //       styles: { halign: 'center' },
    //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
    //     }
    //   ],
    // ];


    // const body = this.bodyRows(5);

    // console.log('body');
    // console.log(body);

    // doc.text('Theme "striped"', 0, 5)

    doc.autoTable({
      // startX: 0,
      startY: 5,
      margin: {
        right: 0,
        left: 0
      },
      styles: {
        valign: 'middle',
        font: 'courier',
        fontSize: 12,
        // fontSize: 10,
        fontStyle: 'bold',
        // fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        // lineColor: [0, 0, 0],
        rowHeight: 4,
        cellPadding: 0,
        // lineWidth: 1
      },
      // head: [
      //   [
      //     {
      //       content: 'Buenavista La Bolsa S.A.C.',
      //       colSpan: 3,
      //       styles: { halign: 'center' },
      //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
      //       columnHeight: 35
      //     },
      //   ],
      // ],
      body: recibo,
      theme: 'plain',
      // theme: 'grid',
    })


    doc.autoPrint();//<- para llamar a imprimir    
    doc.output('dataurlnewwindow');//<-- para ver pdf en nueva pestaña
    // doc.output('save', 'filename.pdf'); //Try to save PDF as a file (not works on ie before 10, and some mobile devices)
    // doc.output('datauristring');        //returns the data uri string
    // doc.output('datauri');              //opens the data uri in current window
    // doc.output('dataurlnewwindow');     //opens the data uri in new window
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

  // cancelar() {    

  //   this.formSubmitted=false
  //   this.form.reset()
  // }

}
