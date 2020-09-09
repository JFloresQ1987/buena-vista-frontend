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

  constructor(private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private serviceOperacionFinanciera: OperacionFinancieraService,
    private serviceOperacionFinancieraPago: OperacionFinancieraPagoService) { }

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
      this.form.controls.monto_cancelar.setValue(parseInt(monto_cancelar) + parseInt(cuota.monto_cuota));
    }
    else {

      this.listaCuotasPagar.splice(this.listaCuotasPagar.indexOf(id), 1);
      this.form.controls.monto_cancelar.setValue(parseInt(monto_cancelar) - parseInt(cuota.monto_cuota));
    }

    // console.log(this.listaCuotasPagar)
    this.calcularMontos();
  }

  realizarPago() {

    // console.log('Pagando...')    

    const modelo: OperaconFinancieraPago = this.form.value;

    // console.log(modelo);

    // modelo.monto_ahorro_voluntario = this.form.get('monto_ahorro_voluntario').value;
    // modelo.monto_recibido = this.form.get('monto_recibido').value
    modelo.operacion_financiera = this.id_operacion_financiera;
    modelo.cuotas = this.listaCuotasPagar;

    this.serviceOperacionFinancieraPago.pagarProducto(modelo)
      .subscribe(res => {

        console.log(res);
        Swal.fire({
          text: 'El pago se realizó satisfactoriamente.', icon: 'success'
        });

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

    // this.formSubmitted = false;
    // this.form.reset();

    this.listarProductoDetalle(this.id_operacion_financiera);

    this.form.get('monto_cancelar').setValue(0);
    this.form.get('monto_ahorro_voluntario').setValue(0);
    this.form.get('monto_total').setValue(0);
    this.form.get('monto_recibido').setValue(0);
    this.form.get('monto_vuelto').setValue(0);
  }

  calcularMontos() {


    const monto_cancelar = this.form.get('monto_cancelar').value;
    const monto_ahorro_voluntario = this.form.get('monto_ahorro_voluntario').value;

    const monto_total = parseInt(monto_cancelar) + parseInt(monto_ahorro_voluntario);
    // const monto_total = this.form.get('monto_total').value;
    // console.log(monto_total)

    const monto_recibido = this.form.get('monto_recibido').value;
    // const monto_vuelto = this.form.get('monto_vuelto').value;
    let monto_vuelto = parseInt(monto_recibido) - monto_total;

    if (monto_vuelto < 0)
      monto_vuelto = 0;

    this.form.controls.monto_total.setValue(monto_total);
    this.form.controls.monto_vuelto.setValue(monto_vuelto);
  }

}
