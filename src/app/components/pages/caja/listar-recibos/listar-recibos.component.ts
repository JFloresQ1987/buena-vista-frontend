import { Component, OnInit } from '@angular/core';
import { OperacionFinancieraPagoService } from '../../../../services/core/caja/operacion-financiera-pago.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-recibos',
  templateUrl: './listar-recibos.component.html',
  styleUrls: ['./listar-recibos.component.css']
})
export class ListarRecibosComponent implements OnInit {

  public cargando: boolean = true;
  public lista: [];

  constructor(private service: OperacionFinancieraPagoService) { }

  ngOnInit(): void {

    this.listarRecibos();
  }

  listarRecibos() {

    this.service.listarPagos()
      // .pipe(
      //   delay(100)
      // )
      .subscribe((res: []) => {

        console.log(res)
        this.lista = res;
        // this.productos = res.lista;
        this.cargando = false;
        // console.log(this.productos);

      });
  }

  anularRecibo(id) {
  // async anularRecibo(id) {

    // const { value: comentario } = await Swal.fire({
    //   // title: 'Comentario: ' + id,
    //   // text: "Comentario xxx",
    //   icon: 'warning',
    //   // input: 'text',
    //   // inputAttributes: {
    //   //   autocapitalize: 'off'
    //   // },
    //   input: 'textarea',
    //   inputPlaceholder: 'Escriba un comentario',
    //   // inputAttributes: {
    //   //   'aria-label': 'Type your message here'
    //   // },
    //   // html:
    //   //   'Comentario' +
    //   //   '<input id="swal-input1" class="swal2-input">' +
    //   //   '<input id="swal-input2" class="swal2-input">',
    //   showCancelButton: true,
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Si, anular recibo',
    //   showLoaderOnConfirm: true,
    //   preConfirm: (login) => {
    //     return fetch(`//api.github.com/users/${login}`)
    //       .then(response => {
    //         if (!response.ok) {
    //           throw new Error(response.statusText)
    //         }
    //         return response.json()
    //       })
    //       .catch(error => {
    //         Swal.showValidationMessage(
    //           `Request failed: ${error}`
    //         )
    //       })
    //   },
    //   allowOutsideClick: () => !Swal.isLoading()
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     Swal.fire({
    //       title: `${result.value.login}'s avatar`,
    //       imageUrl: result.value.avatar_url
    //     })
    //   }
    // })

    // if (comentario) {
    //   Swal.fire(`Ingrese un comentario: ${comentario}`)
    // }

    Swal.fire({
      // title: 'Comentario: ' + id,
      // text: "Comentario xxx",
      icon: 'warning',
      // input: 'text',
      // inputAttributes: {
      //   autocapitalize: 'off'
      // },
      input: 'textarea',
      inputPlaceholder: 'Escriba un comentario aquí...',
      // inputAttributes: {
      //   'aria-label': 'Type your message here'
      // },
      // html:
      //   'Comentario' +
      //   '<input id="swal-input1" class="swal2-input">' +
      //   '<input id="swal-input2" class="swal2-input">',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, anular recibo',
      showLoaderOnConfirm: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Ingrese un comentario correcto.'
        }
      },
      preConfirm: (value) => {

        // console.log(value)

        const comentario: string = value;

        // const modelo: OperaconFinancieraPago = {
        //   // id_socio: this.socio.id,
        //   // documento_identidad_socio: this.socio.documento_identidad,
        //   // nombres_apellidos_socio: this.socio.getNombreCompleto()

        //   operacion_financiera: '',
        //   monto_recibido: 0,
        //   monto_ahorro_voluntario: 0,
        //   cuotas: [],
        //   id_socio: this.socio.id,
        //   documento_identidad_socio: this.socio.documento_identidad,
        //   nombres_apellidos_socio: this.socio.getNombreCompleto()
        // }

        this.service.anularRecibo(id, comentario)
          .subscribe(res => {

            Swal.fire({
              text: 'La anulación del recibo se realizó satisfactoriamente.', icon: 'success'
            });

            this.listarRecibos();
            // this.imprimirRecibo(res);
          });

        // Swal.fire({
        //   text: 'La anulación del recibo se realizó satisfactoriamente.', icon: 'success'
        // });
        
        // if (result.isConfirmed) {
          
        //   console.log('entrooo a eliminar')
        // }
        
      //   return fetch(`//api.github.com/users/${login}`)
      //     .then(response => {
      //       if (!response.ok) {
      //         throw new Error(response.statusText)
      //       }
      //       return response.json()
      //     })
      //     .catch(error => {
      //       Swal.showValidationMessage(
      //         `Request failed: ${error}`
      //       )
      //     })
      // },
      }
      // allowOutsideClick: () => !Swal.isLoading()
    });
    // .then((result) => {
    //   if (result.isConfirmed) {
    //     Swal.fire({
    //       title: `${result.value.login}'s avatar`,
    //       imageUrl: result.value.avatar_url
    //     })
    //   }
    // })
  }

  emitirDuplicado(id) {

  }

}
