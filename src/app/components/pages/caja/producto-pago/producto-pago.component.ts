import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';
import { SesionSocioService } from '../../../../services/shared/sesion-socio.service';
import { OperacionFinancieraService } from '../../../../services/core/registro/operacion-financiera.service';
import { Socio } from '../../../../models/core/socio.model';
import { OperacionFinancieraDetalleService } from '../../../../services/core/registro/operacion-financiera-detalle.service';
import { OperacionFinancieraPagoService } from '../../../../services/core/caja/operacion-financiera-pago.service';
import jsPDF from 'jspdf';
import { OperaconFinancieraPago } from '../../../../interfaces/core/registro/operacion-financiera-pago';

@Component({
  selector: 'app-producto-pago',
  templateUrl: './producto-pago.component.html',
  styleUrls: ['./producto-pago.component.css']
})
export class ProductoPagoComponent implements OnInit {

  public socio: Socio;
  public productos = [];
  public cargando: boolean = true;
  // public sesionSocio: Socio;

  constructor(private service: OperacionFinancieraService,
    private sesionSocioService: SesionSocioService,
    private operacionFinancieraPagoService: OperacionFinancieraPagoService) {

    this.socio = sesionSocioService.sesionSocio;
  }

  ngOnInit(): void {

    // this.cargando = true;
    // this.sesionSocio = this.sesionSocioService.sesionSocio;
    setTimeout(() => {
      // console.log(this.socio.getNombreCompleto());
      this.listarProductos();
    }, 100);

    // this.listarProductos();
  }

  listarProductos() {

    this.cargando = true;
    // this.sesionSocio = this.sesionSocioService.sesionSocio;
    // console.log(this.sesionSocioService.sesionSocio);
    // console.log(this.socio.getId());
    // console.log(this.socio.getNombreCompleto());

    if (this.socio.getId() === '0') {
      Swal.fire({
        text: "Primero debe buscar un socio.", icon: 'warning'
      });
      return;
    }

    this.service.listarProductos(this.socio.id)
      .pipe(
        delay(100)
      )
      .subscribe((res: []) => {

        // console.log(res)
        this.productos = res;
        // this.productos = res.lista;
        this.cargando = false;
        console.log(this.productos);

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

  realizarDesembolsoPago(id: string) {

    // Swal.fire({
    //   text: 'El pago se realizó satisfactoriamente.', icon: 'success'
    // });

    Swal.fire({
      // title: '¿Esta seguro de realizar el desembolso?',
      text: "¿Esta seguro de realizar el desembolso?",
      icon: 'warning',
      showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, desembolsar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        const modelo: OperaconFinancieraPago = {
          // id_socio: this.socio.id,
          // documento_identidad_socio: this.socio.documento_identidad,
          // nombres_apellidos_socio: this.socio.getNombreCompleto()

          operacion_financiera: '',
          monto_recibido: 0,
          monto_ahorro_voluntario: 0,
          cuotas: [],
          id_socio: this.socio.id,
          documento_identidad_socio: this.socio.documento_identidad,
          nombres_apellidos_socio: this.socio.getNombreCompleto()
        }

        this.operacionFinancieraPagoService.desembolsarProducto(id, modelo)
          .subscribe(res => {

            Swal.fire({
              text: 'El desembolso se realizó satisfactoriamente.', icon: 'success'
            });

            this.listarProductos();
            // this.imprimirRecibo(res);
          });
      }
    })
  }

  imprimirRecibo(recibo: []) {

    const opciones: any = {
      orientation: 'p',
      unit: 'mm',
      format: [150, 140]
    };

    var doc: any = new jsPDF(opciones)

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
}
