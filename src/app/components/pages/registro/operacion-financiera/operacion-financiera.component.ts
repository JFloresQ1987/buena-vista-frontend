import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonaService } from '../../../../services/core/registro/persona.service';
import Swal from 'sweetalert2';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-operacion-financiera',
  templateUrl: './operacion-financiera.component.html',
  styleUrls: ['./operacion-financiera.component.css']
})
export class OperacionFinancieraComponent implements OnInit {

  public cargando: boolean = false;
  public form: FormGroup;
  public formSubmitted = false;
  // public cantidad_cuotas: number;
  public programacion_pago = [];
  public cuotas = [];

  constructor(private service: PersonaService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      tipo_operacion_financiera: ['', [Validators.required]],
      monto_capital: ['', [Validators.required, Validators.min(1), Validators.maxLength(10)]],
      tasa_interes: ['6', [Validators.required, Validators.min(0), Validators.maxLength(10)]],
      programacion_pago: ['', [Validators.required]],
      monto_ahorro_inicial: ['', [Validators.required, Validators.min(0), Validators.maxLength(10)]],
      tasa_ahorro_programado: ['20', [Validators.required, Validators.min(0), Validators.maxLength(10)]],
      // cantidad_cuotas: ['', [Validators.required, Validators.min(1), Validators.maxLength(3)]],
      fecha_inicio_pago: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      incluir_sabados: [true, Validators.required],
      comentario: ['', [Validators.required, Validators.maxLength(200)]]
    });

    // this.cantidad_cuotas = 10;//this.form.get('cantidad_cuotas').value || 10;
  }

  buscarProgramacionPago(tipo_operacion_financiera: number) {

    // this.programacion_pago = [];

    // console.log(tipo_operacion_financiera)

    if (tipo_operacion_financiera == 1) {

      this.programacion_pago = [
        { id: 20, programacion: '20 días' },
        { id: 40, programacion: '40 días' },
        { id: 60, programacion: '60 días' },
        { id: 90, programacion: '90 días' },
        { id: 120, programacion: '120 días' },
        { id: 150, programacion: '150 días' },
        { id: 180, programacion: '180 días' }
      ]
      // console.log(this.programacion_pago)
      return this.programacion_pago
    }
    else if (tipo_operacion_financiera == 2) {

      this.programacion_pago = [
        { id: 4, programacion: '1 mes - semanal' },
        { id: 2, programacion: '1 mes - quincenal' },
        { id: 8, programacion: '2 mes - semanal' },
        { id: 4, programacion: '2 mes - quincenal' },
        { id: 12, programacion: '3 mes - semanal' },
        { id: 6, programacion: '3 mes - quincenal' },
        { id: 16, programacion: '4 mes - semanal' },
        { id: 8, programacion: '4 mes - quincenal' },
        { id: 20, programacion: '5 mes - semanal' },
        { id: 10, programacion: '5 mes - quincenal' },
        { id: 24, programacion: '6 mes - semanal' },
        { id: 12, programacion: '6 mes - quincenal' },
        { id: 28, programacion: '7 mes - semanal' },
        { id: 14, programacion: '7 mes - quincenal' },
        { id: 32, programacion: '8 mes - semanal' },
        { id: 16, programacion: '8 mes - quincenal' },
        { id: 36, programacion: '9 mes - semanal' },
        { id: 18, programacion: '9 mes - quincenal' },
        { id: 40, programacion: '10 meses - semanal' },
        { id: 20, programacion: '10 meses - quincenal' }
      ]
      // console.log(this.programacion_pago)
      return this.programacion_pago
    }
    else {
      // console.log(this.programacion_pago)
      this.programacion_pago = [];
      return this.programacion_pago
    }
  }

  calcular() {

    this.formSubmitted = true;
    if (!this.form.valid) {
      Swal.fire({
        text: "Validar la información proporcionada.", icon: 'warning'
      });
      return;
    }

    const capital = this.form.get('monto_capital').value;
    const cantidad_cuotas = this.form.get('programacion_pago').value;
    // const cantidad_cuotas = this.form.get('cantidad_cuotas').value;
    const tasa_interes = this.form.get('tasa_interes').value;
    const tasa_ahorro_programado = this.form.get('tasa_ahorro_programado').value;
    const now = dayjs(this.form.get('fecha_inicio_pago').value);
    // const now = dayjs();

    // console.log(this.form.get('fecha_inicio_pago').value)//fecha_inicio_pago

    // console.log(dayjs(this.form.get('fecha_inicio_pago').value))

    // let dias = [];

    this.cuotas = [];

    for (let i = 1; i <= cantidad_cuotas; i++) {
      let fecha: any;
      // let fecha = now.add(i, 'day');

      if (this.form.get('tipo_operacion_financiera').value == 1)
        fecha = now.add(i, 'day');
      else if (this.form.get('tipo_operacion_financiera').value == 2)
        fecha = now.add((i * 7), 'day');

      if ((fecha.format('d') != '0' && this.form.get('tipo_operacion_financiera').value == 1)
        // || (fecha.format('d') != '6' && !this.form.get('incluir_sabados').value && this.form.get('tipo_operacion_financiera').value == 1))
        || this.form.get('tipo_operacion_financiera').value == 2) {

        if ((((fecha.format('d') != '6'
          || fecha.format('d') == '6' && this.form.get('incluir_sabados').value)
          && this.form.get('tipo_operacion_financiera').value == 1))
          || this.form.get('tipo_operacion_financiera').value == 2) {

          if (fecha.format('d') == '0')
            fecha = now.add(1, 'day');
          else if (fecha.format('d') == '6' && !this.form.get('incluir_sabados').value)
            fecha = now.add(2, 'day');

          let fecha_formateada = '';

          switch (fecha.format('d')) {
            case '1': fecha_formateada = 'LU - ' + fecha.format('DD/MM/YYYY')
              break;
            case '2': fecha_formateada = 'MA - ' + fecha.format('DD/MM/YYYY')
              break;
            case '3': fecha_formateada = 'MI - ' + fecha.format('DD/MM/YYYY')
              break;
            case '4': fecha_formateada = 'JU - ' + fecha.format('DD/MM/YYYY')
              break;
            case '5': fecha_formateada = 'VI - ' + fecha.format('DD/MM/YYYY')
              break;
            case '6': fecha_formateada = 'SA - ' + fecha.format('DD/MM/YYYY')
              break;
          }

          if (fecha.format('d') == '0')
            fecha = now.add(-1, 'day');
          else if (fecha.format('d') == '6' && !this.form.get('incluir_sabados').value)
            fecha = now.add(-2, 'day');

          this.cuotas.push({ fecha: fecha_formateada });
          // this.cuotas.push({ fecha: fecha.format('DD/MM/YYYY') });
        }

      }
    }

    const cantidad_cuotas_calculada = this.cuotas.length;

    const monto_cuota_capital = capital / cantidad_cuotas_calculada;
    // const monto_cuota_capital = capital / cantidad_cuotas;
    const monto_cuota_capital_visual = Math.round((capital / cantidad_cuotas_calculada) * 100) / 100;

    const monto_cuota_interes = (capital * (tasa_interes / 100)) / cantidad_cuotas_calculada;
    const monto_cuota_interes_visual = Math.round(((capital * (tasa_interes / 100)) / cantidad_cuotas_calculada) * 100) / 100;

    const monto_cuota = Math.ceil((monto_cuota_capital + monto_cuota_interes) * 10) / 10;

    const monto_cuota_ahorro_programado = Math.ceil((monto_cuota * (tasa_ahorro_programado / 100)) * 10) / 10;

    const monto_cuota_total = monto_cuota + monto_cuota_ahorro_programado;

    // console.log(dias);

    // this.cuotas = [];

    for (let i = 1; i <= cantidad_cuotas_calculada; i++) {

      // let fecha = now.add(i, 'day')
      let cuota = {
        cuota: i,
        // fecha: fecha.format('DD/MM/YYYY'),
        monto_cuota_capital,
        monto_cuota_capital_visual,
        monto_cuota_interes,
        monto_cuota_interes_visual,
        monto_cuota,
        monto_cuota_ahorro_programado,
        monto_cuota_total
      };

      // this.cuotas.push({
      //   cuota: i,
      //   fecha: fecha.format('DD/MM/YYYY'),
      //   monto_cuota_capital,
      //   monto_cuota_capital_visual,
      //   monto_cuota_interes,
      //   monto_cuota_interes_visual,
      //   monto_cuota,
      //   monto_cuota_ahorro_programado,
      //   monto_cuota_total
      // });

      this.cuotas[i - 1] = Object.assign(cuota, this.cuotas[i - 1]);
    }


  }

  guardar() {

    this.formSubmitted = true;
    if (!this.form.valid) {
      Swal.fire({
        text: "Validar la información proporcionada.", icon: 'warning'
      });
      return;
    }
  }

  cancelar() {

    this.cuotas = [];

    this.formSubmitted = false;
    this.form.reset();
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
