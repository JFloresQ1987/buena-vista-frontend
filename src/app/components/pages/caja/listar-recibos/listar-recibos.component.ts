import { Component, OnInit } from '@angular/core';
import { OperacionFinancieraPagoService } from '../../../../services/core/caja/operacion-financiera-pago.service';
import Swal from 'sweetalert2';
import { AnalistaService } from '../../../../services/core/registro/analista.service';
import { UsuarioService } from '../../../../services/core/registro/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-listar-recibos',
  templateUrl: './listar-recibos.component.html',
  styleUrls: ['./listar-recibos.component.css']
})
export class ListarRecibosComponent implements OnInit {

  public cargando: boolean = true;
  public lista: [];
  public analistas: [] = [];
  public analista: string = '0';
  public form: FormGroup;
  public formSubmitted = false;

  constructor(private service: OperacionFinancieraPagoService,
    private analistaService: AnalistaService,
    // private usuarioService: UsuarioService,
    private operacionFinancieraPagoService: OperacionFinancieraPagoService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.cargarAnalistas();

    this.form = this.formBuilder.group({
      analista_confirmar: ['', [Validators.required]]
    });

    this.listarRecibos('0');
  }

  cargarAnalistas() {

    this.analistaService.getListaDesplegable().subscribe(res => {
      this.analistas = res;
    })
  }

  listarRecibos(analista: string) {

    this.service.listarPagos(analista)
      // .pipe(
      //   delay(100)
      // )
      .subscribe((res: []) => {

        this.lista = res;
        // this.productos = res.lista;
        this.cargando = false;
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

            this.listarRecibos('0');
            // this.imprimirRecibo(res);
          });

        // Swal.fire({
        //   text: 'La anulación del recibo se realizó satisfactoriamente.', icon: 'success'
        // });

        // if (result.isConfirmed) {

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

  buscarRecibos(id) {

    const analista = id || 0;
    this.listarRecibos(analista);
    this.analista = id;
  }

  emitirDuplicado(id) {

  }

  confirmarPagos() {

    // console.log(this.lista)

    this.formSubmitted = true;

    if (!this.form.valid) {
      return Swal.fire({
        text: "Es necesario seleccionar un analista.", icon: 'warning'
      })
    }

    if (this.lista.length == 0) {
      return Swal.fire({
        text: "Para este analista, no existen pagos a confirmar.", icon: 'warning'
      })
    }

    Swal.fire({
      // title: '¿Esta seguro de realizar el desembolso?',
      text: "¿Esta seguro de confirmar los pagos?",
      icon: 'warning',
      showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, confirmar pagos',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        // const analista = '0';
        const analista = this.analista || '0';

        this.operacionFinancieraPagoService.confirmarPagoAnalista(analista)
          .subscribe(res => {

            Swal.fire({
              text: 'La confirmación de los pagos se realizó satisfactoriamente.', icon: 'success'
            });

            // this.listarProductos();
            this.listarRecibos('0');
            // this.imprimirRecibo(res);
          });
      }
    })
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
