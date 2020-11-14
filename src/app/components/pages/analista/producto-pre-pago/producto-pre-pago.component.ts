import { Component, OnInit } from '@angular/core';
import { OperacionFinancieraService } from '../../../../services/core/registro/operacion-financiera.service';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { OperacionFinancieraPagoService } from '../../../../services/core/caja/operacion-financiera-pago.service';

@Component({
  selector: 'app-producto-pre-pago',
  templateUrl: './producto-pre-pago.component.html',
  styles: [
  ]
})
export class ProductoPrePagoComponent implements OnInit {

  public lista = [];
  public listaPago = [];
  public cargando: boolean = true;

  constructor(private service: OperacionFinancieraService,
    private serviceOperacionFinancieraPago: OperacionFinancieraPagoService) {

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

    this.service.listarProductosXAnalista()
      .pipe(
        delay(100)
      )
      .subscribe((res: []) => {

        // console.log(res)
        this.lista = res;
        // this.productos = res.lista;
        this.cargando = false;
        // console.log(this.lista);

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

    // console.log(this.listaPago);

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

    // // console.log('Pagando...')    

    // const modelo: OperaconFinancieraPago = this.form.value;

    // // console.log(modelo);

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

    //     // console.log(res);
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

          });
      }
    })
  }

  cancelar() {


  }

  verReporte() {

  }

}
