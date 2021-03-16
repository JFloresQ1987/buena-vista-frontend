import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SesionSocioService } from '../../../../services/shared/sesion-socio.service';
import { OperacionFinancieraService } from '../../../../services/core/registro/operacion-financiera.service';
import { Socio } from 'src/app/models/core/socio.model';
import { delay } from 'rxjs/operators';
import { AnalistaService } from '../../../../services/core/registro/analista.service';

@Component({
  selector: 'app-ahorro-consulta',
  templateUrl: './ahorro-consulta.component.html',
  styleUrls: ['./ahorro-consulta.component.css']
})
export class AhorroConsultaComponent implements OnInit {

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

    this.service.listarProductos(this.socio.id, 'ahorro', 'vigente')
      .pipe(
        delay(100)
      )
      .subscribe((res: []) => {

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

  async cambiarAnalista(id, id_analista, tipo) {

    this.analistaService.getListaDesplegablexProducto(tipo)
      .subscribe(res => {
        this.analistas = res;

        let controls = '';
        controls += '<select id="analista" class="swal2-input" autofocus>';

        for (let i = 0; i < this.analistas.length; i++) {

          // controls += '<option value="'+ this.analistas[i].id +'">Analista 1</option>';

          if (id_analista === this.analistas[i].id)
            controls += '<option selected value="' + this.analistas[i].id + '">';
          else
            controls += '<option value="' + this.analistas[i].id + '">';

          controls += this.analistas[i].nombre_usuario;
          // controls += this.analistas[i].usuario.persona.nombre;
          // controls += ' ' + this.analistas[i].usuario.persona.apellido_paterno;
          // controls += ' ' + this.analistas[i].usuario.persona.apellido_materno;
          controls += '</option>';
        }

        controls += '</select>';
        controls += '<textarea id="comentario" class="form-control" rows="5" placeholder="Escriba un comentario aquí...">';

        // const controls = '';

        Swal.fire({
          // title: 'Cambiar analista',
          icon: 'info',
          html: controls,
          focusConfirm: false,
          confirmButtonText: 'Si, cambiar',
          showCancelButton: true,
          cancelButtonColor: '#d33',
          preConfirm: () => {
            
            const analista = (<HTMLInputElement>document.getElementById('analista')).value;
            const comentario = (<HTMLInputElement>document.getElementById('comentario')).value;

            if (!comentario)
              return Swal.showValidationMessage("Ingrese un comentario correcto.");

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
  }

  congelar(id, operacion) {

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
      confirmButtonText: 'Si, ' + operacion,
      showLoaderOnConfirm: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Ingrese un comentario correcto.'
        }
      },
      preConfirm: (value) => {

        const comentario: string = value;


        this.service.congelar_descongelar(id, comentario)
          .subscribe(res => {

            Swal.fire({
              text: 'El cambio se realizó satisfactoriamente.', icon: 'success'
            });

            this.listarProductos();
            // this.imprimirRecibo(res);
          });

      }
    });
  }

}