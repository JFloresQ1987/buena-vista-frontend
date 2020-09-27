import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../../../../services/core/registro/usuario.service';
import { PagoConceptoService } from '../../../../../services/core/configuracion/pago-concepto.service';
import { OperacionFinancieraPagoService } from '../../../../../services/core/caja/operacion-financiera-pago.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresos-egresos',
  templateUrl: './ingresos-egresos.component.html',
  styles: [
  ]
})
export class IngresosEgresosComponent implements OnInit {
  public usuarios: [] = [];
  public conceptos: [] = [];
  public subconceptos: [] = [];
  public form: FormGroup;

  constructor(private router: Router,private formBuilder: FormBuilder, private usuarioService: UsuarioService, private pagoConcepto: PagoConceptoService, private operacionFinancieraPagoService: OperacionFinancieraPagoService) { }

  ngOnInit(): void {

    this.cargarUsuarios();

    this.form = this.formBuilder.group({
      operacion: ['', [Validators.required]],
      concepto: ['', [Validators.required]],
      subconcepto: ['', [Validators.required]],
      detalle: ['', [Validators.required]],
      comprobante: ['', [Validators.required]],
      responsable: ['', [Validators.required]],
      monto: ['', [Validators.required]]
    });

    this.form.controls['operacion'].valueChanges.subscribe(data => {
      if (data == "") {
        return
      }
      this.pagoConcepto.listarConceptos(data).subscribe(res => {
        this.conceptos = res['conceptos'];
      })
      this.form.controls['concepto'].setValue("");
    });

    this.form.controls['concepto'].valueChanges.subscribe(data => {
      console.log(data);
      if (data == "") {
        return
      }
      this.pagoConcepto.listarSubConceptos(data).subscribe(res => {
        this.subconceptos = res['sub_conceptos'];
        this.form.controls['subconcepto'].enable();
        if (this.subconceptos.length == 0) {
          console.log(this.subconceptos);
          this.form.controls['subconcepto'].disable();
        }
      })
    });
  }


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode <= 45 || charCode > 57)) {
      return false;
    }
    return true;
  }

  cargarUsuarios() {
    this.usuarioService.listar().subscribe(res => {
      this.usuarios = res['usuarios'];
    })
  }

  guardar() {
    if (this.form.valid) {
      let es_ingreso = false;
      const form = this.form.value;
      const { operacion } = form;
      form['monto'] = parseFloat(form['monto'])
      if(operacion=='i'){
        es_ingreso=true
      }
      delete form['operacion'];
      const data = {
          es_ingreso,
          concepto: form
      }
      
      this.operacionFinancieraPagoService.registrarIngresoEgreso(data).subscribe(res => {
        if (res['ok']) {
          Swal.fire({
            text: res['msg'], icon: 'success'
          });
          this.cancelar();
        } else {
          Swal.fire({
            text: res['msg'], icon: 'error'
          });
        }

      })
    }
  }

  cancelar() {
    this.router.navigateByUrl('caja/gestion/ingresos-egresos');
    //this.form.reset();
  }
}
