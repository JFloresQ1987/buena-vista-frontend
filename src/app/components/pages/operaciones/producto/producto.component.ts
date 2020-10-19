import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SesionSocioService } from '../../../../services/shared/sesion-socio.service';
import { OperacionFinancieraService } from '../../../../services/core/registro/operacion-financiera.service';
import { Socio } from 'src/app/models/core/socio.model';
import { delay } from 'rxjs/operators';
import { AnalistaService } from '../../../../services/core/registro/analista.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  public socio: Socio;
  public productos = [];
  public analistas = [];
  public cargando: boolean = true;

  constructor(private service: OperacionFinancieraService,
    private sesionSocioService: SesionSocioService,
    private analistaService: AnalistaService) {

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

  async cambiarAnalista(id, id_analista, tipo) {

    this.analistaService.getListaDesplegablexProducto(tipo)
      .subscribe(res => {
        this.analistas = res;
        // console.log(this.analistas)

        let controls = '';
        controls += '<select id="analista" class="swal2-input" autofocus>';

        for (let i = 0; i < this.analistas.length; i++) {

          // controls += '<option value="'+ this.analistas[i].id +'">Analista 1</option>';

          if (id_analista === this.analistas[i].id)
            controls += '<option selected value="' + this.analistas[i].id + '">';
          else
            controls += '<option value="' + this.analistas[i].id + '">';

          controls += this.analistas[i].usuario.persona.nombre;
          controls += ' ' + this.analistas[i].usuario.persona.apellido_paterno;
          controls += ' ' + this.analistas[i].usuario.persona.apellido_materno;
          controls += '</option>';
        }

        controls += '</select>';
        controls += '<textarea id="comentario" class="form-control" rows="5" placeholder="Escriba un comentario aquí...">';

        // const controls = '';

        Swal.fire({
          // title: 'Cambiar analista',
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
          confirmButtonText: 'Si, cambiar',
          showCancelButton: true,
          cancelButtonColor: '#d33',
          preConfirm: () => {
            // return [
            //   // document.getElementById('swal-input1').value,
            //   // document.getElementById('swal-input2').value
            //   (<HTMLInputElement>document.getElementById('analista')).value,
            //   (<HTMLInputElement>document.getElementById('comentario')).value
            // ]
            
            const analista = (<HTMLInputElement>document.getElementById('analista')).value;
            const comentario = (<HTMLInputElement>document.getElementById('comentario')).value;

            this.service.cambiarAnalista(id, analista, comentario)
              .subscribe(res => {

                Swal.fire({
                  text: 'El cambio de analista se realizó satisfactoriamente.', icon: 'success'
                });

                this.listarProductos();
                // this.imprimirRecibo(res);
              });
          }
        })

        // if (formValues) {
        //   Swal.fire(JSON.stringify(formValues))
        // }


      });

    // const controls = '<select id="analista" class="swal2-input" autofocus>' +
    // // '<select id="analista" class="swal2-input" autofocus>' +
    // '<option value="1">Analista 1</option>' +
    // '<option value="2" selected>Analista 2</option>' +
    // '</select>' +
    // '<textarea id="comentario" class="form-control" rows="5" placeholder="Escriba un comentario aquí...">'

    // const { value: formValues } = await Swal.fire({
    //   // title: 'Cambiar analista',
    //   icon: 'info',
    //   html: controls,
    //   // html:
    //   //   // '<select id="analista" class="swal2-input" autofocus>' +
    //   //   // // '<select id="analista" class="swal2-input" autofocus>' +
    //   //   // '<option value="1">Analista 1</option>' +
    //   //   // '<option value="2" selected>Analista 2</option>' +
    //   //   // '</select>' +

    //   //   '<select id="analista" class="swal2-input" autofocus>' +
    //   //   '<option *ngFor="let item of analistas" value="{{item.id}}">' +
    //   //   '{{item.usuario.persona.nombre}}' +
    //   //   '{{item.usuario.persona.apellido_paterno}}' +
    //   //   '{{item.usuario.persona.apellido_materno}}' +
    //   //   '</option>' +
    //   //   '</select>' +

    //   //   '<textarea id="comentario" class="form-control" rows="5" placeholder="Escriba un comentario aquí...">',

    //   focusConfirm: false,
    //   confirmButtonText: 'Si, cambiar',
    //   showCancelButton: true,
    //   cancelButtonColor: '#d33',
    //   preConfirm: () => {
    //     return [
    //       // document.getElementById('swal-input1').value,
    //       // document.getElementById('swal-input2').value
    //       (<HTMLInputElement>document.getElementById('analista')).value,
    //       (<HTMLInputElement>document.getElementById('comentario')).value
    //     ]
    //   }
    // })

    // if (formValues) {
    //   Swal.fire(JSON.stringify(formValues))
    // }






    // const { value: fruit } = await Swal.fire({
    //   title: 'Select field validation',
    //   input: 'select',
    //   inputOptions: {
    //     // 'Fruits': {
    //     //   apples: 'Apples',
    //     //   bananas: 'Bananas',
    //     //   grapes: 'Grapes',
    //     //   oranges: 'Oranges'
    //     // },
    //     // 'Vegetables': {
    //     //   potato: 'Potato',
    //     //   broccoli: 'Broccoli',
    //     //   carrot: 'Carrot'
    //     // },
    //     'icecream': 'Ice cream'
    //   },
    //   inputPlaceholder: '--Seleccionar--',
    //   showCancelButton: true,
    //   inputValidator: (value) => {
    //     return new Promise((resolve) => {
    //       if (value === 'oranges') {
    //         resolve()
    //       } else {
    //         resolve('You need to select oranges :)')
    //       }
    //     })
    //   }
    // })

    // // if (fruit) {
    // //   Swal.fire(`You selected: ${fruit}`)
    // // }

    // Swal.fire({
    //   // title: 'Comentario: ' + id,
    //   // text: "Comentario xxx",
    //   icon: 'warning',
    //   // input: 'text',
    //   // inputAttributes: {
    //   //   autocapitalize: 'off'
    //   // },
    //   input: 'textarea',
    //   inputPlaceholder: 'Escriba un comentario aquí...',
    //   // inputAttributes: {
    //   //   'aria-label': 'Type your message here'
    //   // },
    //   // html:
    //   //   'Comentario' +
    //   //   '<input id="swal-input1" class="swal2-input">' +
    //   //   '<input id="swal-input2" class="swal2-input">',
    //   showCancelButton: true,
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Si, cambiar analista',
    //   showLoaderOnConfirm: true,
    //   inputValidator: (value) => {
    //     if (!value) {
    //       return 'Ingrese un comentario correcto.'
    //     }
    //   },
    //   preConfirm: (value) => {

    //     // console.log(value)

    //     const comentario: string = value;


    //     this.service.cambiarAnalista(id, '', comentario)
    //       .subscribe(res => {

    //         Swal.fire({
    //           text: 'La anulación del recibo se realizó satisfactoriamente.', icon: 'success'
    //         });

    //         this.listarProductos();
    //         // this.imprimirRecibo(res);
    //       });

    //   }
    // });
  }

  anular(id) {

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
      confirmButtonText: 'Si, anular',
      showLoaderOnConfirm: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Ingrese un comentario correcto.'
        }
      },
      preConfirm: (value) => {

        // console.log(value)

        const comentario: string = value;


        this.service.anular(id, comentario)
          .subscribe(res => {

            Swal.fire({
              text: 'La anulación del recibo se realizó satisfactoriamente.', icon: 'success'
            });

            this.listarProductos();
            // this.imprimirRecibo(res);
          });

      }
    });
  }

}
