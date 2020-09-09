import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';
import { SesionSocioService } from '../../../../services/shared/sesion-socio.service';
import { OperacionFinancieraService } from '../../../../services/core/registro/operacion-financiera.service';
import { Socio } from '../../../../models/core/socio.model';

@Component({
  selector: 'app-producto-pago',
  templateUrl: './producto-pago.component.html',
  styleUrls: ['./producto-pago.component.css']
})
export class ProductoPagoComponent implements OnInit {

  public socio: Socio;
  public productos = [];
  public cargando: boolean = true;

  constructor(private service: OperacionFinancieraService,
    private sesionSocioService: SesionSocioService) {

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
      .subscribe((res: any) => {

        // console.log(res)
        this.productos = res.lista;
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

}
