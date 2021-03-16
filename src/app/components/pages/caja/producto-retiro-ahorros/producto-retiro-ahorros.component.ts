import { Component, OnInit } from '@angular/core';
import { OperacionFinancieraService } from '../../../../services/core/registro/operacion-financiera.service';
import { SesionSocioService } from '../../../../services/shared/sesion-socio.service';
import { OperacionFinancieraPagoService } from '../../../../services/core/caja/operacion-financiera-pago.service';
import { OperacionFinancieraDetalleService } from '../../../../services/core/registro/operacion-financiera-detalle.service';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';
import { OperaconFinancieraPago } from '../../../../interfaces/core/registro/operacion-financiera-pago';
import { Recibo } from '../../../../helpers/core/recibo';
import { Socio } from '../../../../models/core/socio.model';

@Component({
  selector: 'app-producto-retiro-ahorros',
  templateUrl: './producto-retiro-ahorros.component.html',
  styleUrls: ['./producto-retiro-ahorros.component.css']
})
export class ProductoRetiroAhorrosComponent implements OnInit {

  public socio: Socio;
  public productos = [];
  public cargando: boolean = true;

  constructor(private service: OperacionFinancieraService,
    private sesionSocioService: SesionSocioService,
    private operacionFinancieraPagoService: OperacionFinancieraPagoService,
    private operacionFinancieraDetalleService: OperacionFinancieraDetalleService) {

    this.socio = sesionSocioService.sesionSocio;
  }

  ngOnInit(): void {

    // this.cargando = true;
    // this.sesionSocio = this.sesionSocioService.sesionSocio;
    setTimeout(() => {
      this.listarProductos();
    }, 100);

    // this.listarProductos();
  }

  listarProductos() {

    this.cargando = true;
    // this.sesionSocio = this.sesionSocioService.sesionSocio;

    if (this.socio.getId() === '0') {
      Swal.fire({
        text: "Primero debe buscar un socio.", icon: 'warning'
      });
      return;
    }

    this.service.obtenerProductosConAhorrosPorPersona(this.socio.id)
    // this.service.listarProductos(this.socio.id, 'credito', 'todos')
      // .pipe(
      //   delay(100)
      // )
      .subscribe((res: []) => {

        // console.log(res)

        this.productos = res;
        // this.productos = res.lista;
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

  // realizarDesembolsoPago(id: string) {

  //   // Swal.fire({
  //   //   text: 'El pago se realizó satisfactoriamente.', icon: 'success'
  //   // });

  //   Swal.fire({
  //     // title: '¿Esta seguro de realizar el desembolso?',
  //     text: "¿Esta seguro de realizar el desembolso?",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     // confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Si, desembolsar',
  //     cancelButtonText: 'Cancelar'
  //   }).then((result) => {
  //     if (result.isConfirmed) {

  //       const modelo: OperaconFinancieraPago = {
  //         // id_socio: this.socio.id,
  //         // documento_identidad_socio: this.socio.documento_identidad,
  //         // nombres_apellidos_socio: this.socio.getNombreCompleto()

  //         operacion_financiera: '',
  //         monto_recibido: 0,
  //         monto_ahorro_voluntario: 0,
  //         cuotas: [],
  //         id_socio: this.socio.id,
  //         documento_identidad_socio: this.socio.documento_identidad,
  //         nombres_apellidos_socio: this.socio.getNombreCompleto(),
  //         es_ingreso: true
  //       }

  //       this.operacionFinancieraPagoService.desembolsarProducto(id, modelo)
  //         .subscribe(res => {

  //           Swal.fire({
  //             text: 'El desembolso se realizó satisfactoriamente.', icon: 'success'
  //           });

  //           const recibo = new Recibo();

  //           console.log(res)

  //           recibo.imprimirRecibo(res)

  //           this.listarProductos();
  //           // this.imprimirRecibo(res);
  //         });
  //     }
  //   })
  // }

  async retirarAhorros(id: string) {

    this.operacionFinancieraDetalleService.obtenerAhorros(id)
      .subscribe(res => {
        // this.analistas = res;

        // console.log(res)

        let controls = '';

        // controls += '<label>Ahorro inicial: '+ res.monto_ahorro_inicial +'</label><input type="text" class="form-control">';
        // controls += '<br><label>Ahorro programado: '+ res.monto_ahorro_programado +'</label><input type="text" class="form-control">';
        // controls += '<br><label>Ahorro voluntario: '+ res.monto_ahorro_voluntario +'</label><input type="text" class="form-control">';

        controls += '<div class="form-group row">'
        controls += '<label class="col-8 col-form-label text-left">Ah. inicial: S/. ' + res.monto_ahorro_inicial.toFixed(2) + '</label>'
        controls += '<div class="col-md-4">'
        controls += '<input type="text" id="monto_retiro_ahorro_inicial" class="form-control" value=' + res.monto_ahorro_inicial.toFixed(2) + ' disabled>'
        controls += '</div>'
        controls += '</div>'

        controls += '<div class="form-group row">'
        controls += '<label class="col-8 col-form-label text-left">Ah. programado: S/. ' + res.monto_ahorro_programado.toFixed(2) + '</label>'
        controls += '<div class="col-md-4">'
        controls += '<input type="text" id="monto_retiro_ahorro_programado" class="form-control" value=' + res.monto_ahorro_programado.toFixed(2) + ' disabled>'
        controls += '</div>'
        controls += '</div>'

        controls += '<div class="form-group row">'
        controls += '<label class="col-8 col-form-label text-left">Ah. voluntario: S/. ' + res.monto_ahorro_voluntario.toFixed(2) + '</label>'
        controls += '<div class="col-md-4">'
        controls += '<input type="text" id="monto_retiro_ahorro_voluntario" class="form-control" value=' + res.monto_ahorro_voluntario.toFixed(2) + ' disabled>'
        controls += '</div>'
        controls += '</div>'

        // controls += '<select id="analista" class="swal2-input" autofocus>';

        // for (let i = 0; i < this.analistas.length; i++) {

        //   // controls += '<option value="'+ this.analistas[i].id +'">Analista 1</option>';

        //   if (id_analista === this.analistas[i].id)
        //     controls += '<option selected value="' + this.analistas[i].id + '">';
        //   else
        //     controls += '<option value="' + this.analistas[i].id + '">';

        //   controls += this.analistas[i].nombre_usuario;
        //   // controls += this.analistas[i].usuario.persona.nombre;
        //   // controls += ' ' + this.analistas[i].usuario.persona.apellido_paterno;
        //   // controls += ' ' + this.analistas[i].usuario.persona.apellido_materno;
        //   controls += '</option>';
        // }

        // controls += '</select>';
        // controls += '<textarea id="comentario" class="form-control" rows="5" placeholder="Escriba un comentario aquí...">';

        // const controls = '';

        Swal.fire({
          // title: 'Retirar ahorros',
          icon: 'info',
          html: controls,
          // html:
          //   // '<select id="analista" class="swal2-input" autofocus>' +
          //   // // '<select id="analista" class="swal2-input" autofocus>' +
          //   // '<option value="1">Analista 1</option>' +
          //   // '<option value="2" selected>Analista 2</option>' +
          //   // '</select>' +

          //   '<select id="analista" class="swal2-input" autofocus>' +
          //   '<option *ngFor="let item of analistas" value="{{item.id}}">' +
          //   '{{item.usuario.persona.nombre}}' +
          //   '{{item.usuario.persona.apellido_paterno}}' +
          //   '{{item.usuario.persona.apellido_materno}}' +
          //   '</option>' +
          //   '</select>' +

          //   '<textarea id="comentario" class="form-control" rows="5" placeholder="Escriba un comentario aquí...">',

          focusConfirm: false,
          confirmButtonText: 'Si, retirar ahorros',
          showCancelButton: true,
          cancelButtonColor: '#d33',
          preConfirm: () => {
            // return [
            //   // document.getElementById('swal-input1').value,
            //   // document.getElementById('swal-input2').value
            //   (<HTMLInputElement>document.getElementById('analista')).value,
            //   (<HTMLInputElement>document.getElementById('comentario')).value
            // ]

            // const analista = (<HTMLInputElement>document.getElementById('analista')).value;
            // const comentario = (<HTMLInputElement>document.getElementById('comentario')).value;

            const monto_retiro_ahorro_inicial = (<HTMLInputElement>document.getElementById('monto_retiro_ahorro_inicial')).value || 0;
            const monto_retiro_ahorro_programado = (<HTMLInputElement>document.getElementById('monto_retiro_ahorro_programado')).value || 0;
            const monto_retiro_ahorro_voluntario = (<HTMLInputElement>document.getElementById('monto_retiro_ahorro_voluntario')).value || 0;

            if (monto_retiro_ahorro_inicial <= 0 &&
              monto_retiro_ahorro_programado <= 0 &&
              monto_retiro_ahorro_voluntario <= 0) {

              Swal.fire({
                text: 'El retiro no se puede realizar, revisar los montos.', icon: 'success'
              });

              return;
            }


            // console.log(monto_retiro_ahorro_inicial)
            // console.log(monto_retiro_ahorro_programado)
            // console.log(monto_retiro_ahorro_voluntario)

            const modelo: any = {
              monto_retiro_ahorro_inicial,
              monto_retiro_ahorro_programado,
              monto_retiro_ahorro_voluntario,
              id_socio: this.socio.id,
              documento_identidad_socio: this.socio.documento_identidad,
              nombres_apellidos_socio: this.socio.getNombreCompleto(),
            }

            this.operacionFinancieraPagoService.retirarAhorrosProducto(id, modelo)
              .subscribe(res => {

                Swal.fire({
                  text: 'El retiro se realizó satisfactoriamente.', icon: 'success'
                });

                const recibo = new Recibo();

                console.log(res)

                recibo.imprimirRecibo(res)

                // this.listarProductos();
                // this.imprimirRecibo(res);
              });

            // this.service.cambiarAnalista(id, analista, comentario)
            //   .subscribe(res => {

            //     Swal.fire({
            //       text: 'El retiro se realizó satisfactoriamente.', icon: 'success'
            //     });

            //     // this.listarProductos();
            //     // this.imprimirRecibo(res);
            //   });
          }
        })

        // if (formValues) {
        //   Swal.fire(JSON.stringify(formValues))
        // }


      });

    // // Swal.fire({
    // //   text: 'El pago se realizó satisfactoriamente.', icon: 'success'
    // // });

    // Swal.fire({
    //   // title: '¿Esta seguro de realizar el desembolso?',
    //   text: "¿Esta seguro de retirar ahorros?",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   // confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Si, retirar ahorros',
    //   cancelButtonText: 'Cancelar'
    // }).then((result) => {
    //   if (result.isConfirmed) {

    //     const modelo: OperaconFinancieraPago = {
    //       // id_socio: this.socio.id,
    //       // documento_identidad_socio: this.socio.documento_identidad,
    //       // nombres_apellidos_socio: this.socio.getNombreCompleto()

    //       operacion_financiera: '',
    //       monto_recibido: 0,
    //       monto_ahorro_voluntario: 0,
    //       cuotas: [],
    //       id_socio: this.socio.id,
    //       documento_identidad_socio: this.socio.documento_identidad,
    //       nombres_apellidos_socio: this.socio.getNombreCompleto(),
    //       es_ingreso: true
    //     }

    //     this.operacionFinancieraPagoService.desembolsarProducto(id, modelo)
    //       .subscribe(res => {

    //         Swal.fire({
    //           text: 'El retiro se realizó satisfactoriamente.', icon: 'success'
    //         });

    //         const recibo = new Recibo();

    //         console.log(res)

    //         recibo.imprimirRecibo(res)

    //         this.listarProductos();
    //         // this.imprimirRecibo(res);
    //       });
    //   }
    // })
  }

  // imprimirRecibo(recibo: []) {

  //   const opciones: any = {
  //     orientation: 'p',
  //     unit: 'mm',
  //     format: [150, 140]
  //   };

  //   var doc: any = new jsPDF(opciones)

  //   doc.autoTable({
  //     // startX: 0,
  //     startY: 5,
  //     margin: {
  //       right: 0,
  //       left: 0
  //     },
  //     styles: {
  //       valign: 'middle',
  //       font: 'courier',
  //       fontSize: 12,
  //       // fontSize: 10,
  //       fontStyle: 'bold',
  //       // fillColor: [255, 255, 255],
  //       textColor: [0, 0, 0],
  //       // lineColor: [0, 0, 0],
  //       rowHeight: 4,
  //       cellPadding: 0,
  //       // lineWidth: 1
  //     },
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
  //   })


  //   doc.autoPrint();//<- para llamar a imprimir    
  //   doc.output('dataurlnewwindow');//<-- para ver pdf en nueva pestaña
  //   // doc.output('save', 'filename.pdf'); //Try to save PDF as a file (not works on ie before 10, and some mobile devices)
  //   // doc.output('datauristring');        //returns the data uri string
  //   // doc.output('datauri');              //opens the data uri in current window
  //   // doc.output('dataurlnewwindow');     //opens the data uri in new window
  // }
}
