import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../../../../services/core/registro/usuario.service';
import { PagoConceptoService } from '../../../../../services/core/configuracion/pago-concepto.service';
import { OperacionFinancieraPagoService } from '../../../../../services/core/caja/operacion-financiera-pago.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import { Recibo } from '../../../../../helpers/core/recibo';

@Component({
  selector: 'app-ingresos-egresos',
  templateUrl: './ingresos-egresos.component.html',
  styles: [
  ]
})
export class IngresosEgresosComponent implements OnInit {
  public usuarios: any = [];
  public conceptos: any = [];
  public subconceptos: any = [];
  public form: FormGroup;
  public formSubmitted = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private usuarioService: UsuarioService, private pagoConcepto: PagoConceptoService, private operacionFinancieraPagoService: OperacionFinancieraPagoService) { }

  ngOnInit(): void {

    this.cargarUsuarios();

    this.form = this.formBuilder.group({
      operacion: ['', [Validators.required]],
      concepto: ['', [Validators.required]],
      sub_concepto: ['', [Validators.required]],
      detalle: ['',],
      numero_comprobante: ['',],
      responsable: ['',],
      monto: ['', [Validators.required]]
    });

    this.form.controls['operacion'].valueChanges.subscribe(data => {
      if (data == "") {
        this.conceptos = [];
        this.subconceptos = [];
        return
      }
      this.pagoConcepto.listarConceptos(data).subscribe(res => {
        this.conceptos = res['conceptos'];
      })
      this.form.controls['concepto'].setValue("");
      this.validar();
    });

    this.form.controls['concepto'].valueChanges.subscribe(data => {
      if (data == "") {
        this.subconceptos = [];
        return
      }
      this.pagoConcepto.listarSubConceptos(data).subscribe(res => {
        this.subconceptos = res['sub_conceptos'];
        this.form.controls['sub_concepto'].enable();
        if (this.subconceptos.length == 0) {
          this.form.controls['sub_concepto'].disable();
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

    this.formSubmitted = true;

    if (!this.form.valid) {
      return Swal.fire({
        text: "Necesita completar toda la informacion", icon: 'error'
      })
    }

    let es_ingreso = false;
    const form = this.form.value;
    const { operacion } = form;
    const monto = parseFloat(this.form.controls['monto'].value);
    if (operacion == 'i') {
      es_ingreso = true
    }
    delete form['operacion'];
    delete form['monto'];

    const id_responsable = this.form.get('responsable').value;
    if (!id_responsable)
      delete form['responsable'];

    const data: any = {
      es_ingreso,
      concepto: form,
      monto
    }

    const id_concepto = this.form.get('concepto').value;
    const concepto = this.conceptos.find(item => item._id === id_concepto);
    data.concepto.codigo_concepto = concepto.codigo;
    data.concepto.descripcion = concepto.descripcion;

    const id_sub_concepto = this.form.get('sub_concepto').value;
    if (id_sub_concepto) {

      const sub_concepto = this.subconceptos.find(item => item._id === id_sub_concepto);
      data.concepto.codigo_sub_concepto = sub_concepto.codigo;
      data.concepto.descripcion_sub_concepto = sub_concepto.descripcion;
    }

    // const id_responsable = this.form.get('responsable').value;
    if (id_responsable) {

      const responsable = this.usuarios.find(item => item.id === id_responsable);
      data.concepto.nombre_responsable = responsable.persona.apellido_paterno + ' ' + responsable.persona.apellido_materno + ', ' + responsable.persona.nombre;
      data.concepto.documento_identidad_responsable = responsable.persona.documento_identidad;
    }
    // else{
    //   // delete data['concepto.responsable'];
    //   // console.log(data)
    //   delete form['responsable'];
    // }

    // console.log(id_responsable)

    this.operacionFinancieraPagoService.registrarIngresoEgreso(data).subscribe(res => {
      Swal.fire({
        text: 'El pago se realizó satisfactoriamente.', icon: 'success'
      });
      // this.router.navigateByUrl('/dashboard');
      // this.imprimirRecibo(res);
      // this.router.navigateByUrl('/dashboard');
      const recibo = new Recibo();
      recibo.imprimirRecibo(res)
      // this.router.navigateByUrl('/dashboard');
      this.cancelar();
    })
  }

  cancelar() {
    //this.router.navigateByUrl('caja/gestion/ingresos-egresos');
    this.formSubmitted = false;
    // this.conceptos = [];
    this.form.reset();
  }

  validar() {
    if (this.form.controls['operacion'].value === 'i') {
      this.form.controls['responsable'].setValidators(null);
    } else {
      this.form.controls['responsable'].setValidators(Validators.required);
    }
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
