import { Component, OnInit } from '@angular/core';
import { ReporteService } from '../../../../services/core/reportes/reporte.service';
import Swal from 'sweetalert2';
import { AnalistaService } from '../../../../services/core/registro/analista.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-saldo-credito',
  templateUrl: './saldo-credito.component.html',
  styleUrls: ['./saldo-credito.component.css']
})
export class SaldoCreditoComponent implements OnInit {

  public lista: [];
  public resumen: any;
  public cargando: boolean = true;
  public analistas: [] = [];
  public form: FormGroup;

  public labels = ['CPP', 'Deficiente', 'Dudoso', 'Pérdida'];
  public data = [];
  // public data = [
  //   [350, 450, 100, 50],
  // ];
  public colors = [
    { backgroundColor: ['#06d79c', '#ffb22b', '#ea4c89', '#ef5350'] }
  ];

  constructor(private service: ReporteService,
    private analistaService: AnalistaService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      analista: ['', []],
      fecha_inicio: [dayjs().format('YYYY-MM-DD'), []],
      fecha_fin: [dayjs().format('YYYY-MM-DD'), []],
    });

    // this.consultarReporte('12345');

    this.analistaService.getListaDesplegable().subscribe(res => {
      this.analistas = res;
    })
  }

  consultarReporte() {

    // const modelo: any = this.form.value;

    // console.log(modelo)

    const { analista, fecha_inicio, fecha_fin } = this.form.value;
    // const fecha_inicio = dayjs(this.form.get('fecha_inicio').value).format('DD/MM/YYYY');
    // const fecha_fin = dayjs(this.form.get('fecha_fin').value).format('DD/MM/YYYY');

    this.cargando = true;
    // // this.sesionSocio = this.sesionSocioService.sesionSocio;

    // if (this.socio.getId() === '0') {
    //   Swal.fire({
    //     text: "Primero debe buscar un socio.", icon: 'warning'
    //   });
    //   return;
    // }

    // this.cargandoDetalle = true;

    this.service.consultarSaldoCredito(analista, fecha_inicio, fecha_fin)
      // .pipe(
      //   delay(100)
      // )
      .subscribe((res: any) => {

        // this.productos = res.lista;
        // this.cargando = false;

        // console.log(res);

        this.lista = res.lista;
        this.resumen = res.resumen;
        // this.productos = res.lista;

        this.data = [[
          this.resumen.total_monto_cpp,
          this.resumen.total_monto_deficiente,
          this.resumen.total_monto_dudoso,
          this.resumen.total_monto_perdida,
        ]];

        this.cargando = false;

        // this.operaconFinancieraDetalle = res;
        // // this.operaconFinanciera = res.modelo;

        // this.cargandoDetalle = false;

        // this.calcularMontos();

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

  cancelar() {

    this.lista = [];
    this.resumen = {};
    // this.formSubmitted = false;
    this.cargando = true;
    this.form.reset();
  }

}
