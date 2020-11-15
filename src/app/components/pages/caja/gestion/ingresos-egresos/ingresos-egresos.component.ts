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
  public usuarios: [] = [];
  public conceptos: [] = [];
  public subconceptos: [] = [];
  public form: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private usuarioService: UsuarioService, private pagoConcepto: PagoConceptoService, private operacionFinancieraPagoService: OperacionFinancieraPagoService) { }

  ngOnInit(): void {

    this.cargarUsuarios();

    this.form = this.formBuilder.group({
      operacion: ['', [Validators.required]],
      concepto: ['', [Validators.required]],
      sub_concepto: ['', [Validators.required]],
      detalle: ['',],
      numero_comprobante: ['',],
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
      this.validar();
    });

    this.form.controls['concepto'].valueChanges.subscribe(data => {
      if (data == "") {
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
    if (!this.form.valid) { 
      return Swal.fire({
        text:"Necesita completar toda la informacion", icon:'error'
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
    const data = {
      es_ingreso,
      concepto: form,
      monto
    }

    this.operacionFinancieraPagoService.registrarIngresoEgreso(data).subscribe(res => {
      Swal.fire({
        text: 'El pago se realizó satisfactoriamente.', icon: 'success'
      });
      // this.router.navigateByUrl('/dashboard');
      // this.imprimirRecibo(res);
      const recibo = new Recibo();

      recibo.imprimirRecibo(res)

      // this.router.navigateByUrl('/dashboard');
    })
  }

  // imprimirRecibo(recibo: []) {

  //   const opciones: any = {
  //     orientation: 'p',
  //     unit: 'mm',
  //     format: [76, 140]
  //   };

  //   // var doc = new jsPDF(opciones);

  //   // doc.setFontSize(10);
  //   // doc.text('       Buenavista La Bolsa S.A.C.', 10, 30);
  //   // doc.text('            Agencia Ayacucho', 10, 35);
  //   // doc.text('------------------------------------------', 10, 40);
  //   // doc.text('RUC: 20574744599                I-00000009', 10, 45);
  //   // doc.text('', 10, 55);
  //   // doc.text('DNI: 44684165', 10, 60);
  //   // doc.text('Socio: Jorge Flores Quispe', 10, 65);
  //   // doc.text('Analista: Jorge Flores Quispe', 10, 70);
  //   // doc.text('Producto: Créditos Personales', 10, 90);
  //   // doc.text('Operación en Soles', 10, 95);
  //   // doc.text('', 10, 100);
  //   // doc.text('Detalle Operación', 10, 105);
  //   // doc.text('------------------------------------------', 10, 110);
  //   // doc.text('Ahorro voluntario', 10, 115);
  //   // doc.text('Amortización Capital', 10, 120);
  //   // doc.text('Interés', 10, 125);
  //   // doc.text('------------------------------------------', 10, 130);
  //   // doc.text('Total', 10, 135);
  //   // doc.text('', 10, 140);
  //   // doc.text('Usuario: 44684165', 10, 145);
  //   // doc.text('Fecha: 09/09/2020 06:15:56 pm', 10, 150);
  //   // doc.text('Recibo: Original', 10, 155);
  //   // doc.text('** Frase **', 10, 160);

  //   // doc.autoPrint({ variant: 'non-conform' });
  //   // doc.save('comprobante.pdf');

  //   var doc: any = new jsPDF(opciones)

  //   // doc.setFontSize(12);

  //   // doc.text('Theme "striped"', 14, 16)
  //   // doc.autoTable({ head: headRows(), body: bodyRows(5), startY: 20 })

  //   // doc.text('Theme "grid"', 14, doc.lastAutoTable.finalY + 10)
  //   // doc.autoTable({
  //   //   head: headRows(),
  //   //   body: bodyRows(5),
  //   //   startY: doc.lastAutoTable.finalY + 14,
  //   //   theme: 'grid',
  //   // })

  //   // doc.text('Theme "plain"', 14, 16)
  //   // doc.text('Theme "plain"', 14, doc.lastAutoTable.finalY + 10)


  //   // doc.autoTable({
  //   //   head: this.headRows(),
  //   //   body: this.bodyRows(5),
  //   //   startY: 20,
  //   //   // startY: doc.lastAutoTable.finalY + 14,
  //   //   theme: 'plain',
  //   // })

  //   // const body = [
  //   //   [
  //   //     {
  //   //       content: 'Buenavista La Bolsa S.A.C.',
  //   //       colSpan: 3,
  //   //       styles: { halign: 'center' },
  //   //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
  //   //     },
  //   //   ],
  //   //   [
  //   //     {
  //   //       content: 'Agencia Ayacucho',
  //   //       colSpan: 3,
  //   //       styles: { halign: 'center' },
  //   //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
  //   //     },
  //   //   ],
  //   //   // [
  //   //   //   {
  //   //   //     content: 'RUC: 20574744599',
  //   //   //     colSpan: 3,
  //   //   //     styles: { halign: 'center' },
  //   //   //     // styles: { halign: 'center', fillColor: [22, 160, 133] },
  //   //   //   },
  //   //   // ],
  //   //   [
  //   //     {
  //   //       content: '------------------------------------',
  //   //       colSpan: 3,
  //   //       styles: { halign: 'center' },
  //   //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
  //   //     },
  //   //   ],
  //   //   [
  //   //     {
  //   //       content: 'RUC: 20574744599',
  //   //       colSpan: 1,
  //   //       styles: { halign: 'left' },
  //   //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
  //   //     },
  //   //     {
  //   //       content: '',
  //   //       colSpan: 1,
  //   //       // styles: { halign: 'left' },
  //   //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
  //   //     },
  //   //     {
  //   //       content: 'I-00000009',
  //   //       colSpan: 1,
  //   //       styles: { halign: 'right' },
  //   //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
  //   //     },
  //   //   ],
  //   //   [

  //   //   ],
  //   //   [
  //   //     {
  //   //       content: 'DNI: 44684165',
  //   //       colSpan: 3,
  //   //       styles: { halign: 'left' },
  //   //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
  //   //     }
  //   //   ],
  //   //   [
  //   //     {
  //   //       content: 'Socio: Jorge Flores Quispe',
  //   //       colSpan: 3,
  //   //       styles: { halign: 'left' },
  //   //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
  //   //     }
  //   //   ],
  //   //   [
  //   //     {
  //   //       content: 'Analista: Jorge Flores Quispe',
  //   //       colSpan: 3,
  //   //       styles: { halign: 'left' },
  //   //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
  //   //     }
  //   //   ],
  //   //   [
  //   //     {
  //   //       content: 'Producto: Créditos Personales',
  //   //       colSpan: 3,
  //   //       styles: { halign: 'left' },
  //   //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
  //   //     }
  //   //   ],
  //   //   [

  //   //   ],
  //   //   [
  //   //     {
  //   //       content: 'Operaciones en Soles',
  //   //       colSpan: 3,
  //   //       styles: { halign: 'left' },
  //   //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
  //   //     }
  //   //   ],
  //   //   [
  //   //     {
  //   //       content: '------------------------------------',
  //   //       colSpan: 3,
  //   //       styles: { halign: 'center' },
  //   //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
  //   //     },
  //   //   ],
  //   //   [
  //   //     {
  //   //       content: 'Detalle Operación',
  //   //       colSpan: 2,
  //   //       styles: { halign: 'center' },
  //   //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
  //   //     },
  //   //     {
  //   //       content: 'Monto',
  //   //       colSpan: 1,
  //   //       styles: { halign: 'right' },
  //   //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
  //   //     }
  //   //   ],
  //   //   [
  //   //     {
  //   //       content: '------------------------------------',
  //   //       colSpan: 3,
  //   //       styles: { halign: 'center' },
  //   //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
  //   //     },
  //   //   ],
  //   //   [
  //   //     {
  //   //       content: 'Ahorro Voluntario es la prueba para ver como entra cuando es tet largo...',
  //   //       colSpan: 2,
  //   //       styles: { halign: 'left' },
  //   //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
  //   //     },
  //   //     {
  //   //       content: '999.00',
  //   //       colSpan: 1,
  //   //       styles: { halign: 'right' },
  //   //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
  //   //     }
  //   //   ],
  //   //   [
  //   //     {
  //   //       content: 'Amortización Capital',
  //   //       colSpan: 2,
  //   //       styles: { halign: 'left' },
  //   //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
  //   //     },
  //   //     {
  //   //       content: '9999.99',
  //   //       colSpan: 1,
  //   //       styles: { halign: 'right' },
  //   //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
  //   //     }
  //   //   ],
  //   //   [
  //   //     {
  //   //       content: '------------------------------------',
  //   //       colSpan: 3,
  //   //       styles: { halign: 'center' },
  //   //       // rowHeight: 2
  //   //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
  //   //     },
  //   //   ],
  //   //   [
  //   //     {
  //   //       content: 'Total: S/.',
  //   //       colSpan: 2,
  //   //       styles: { halign: 'center' },
  //   //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
  //   //     },
  //   //     {
  //   //       content: '99999.99',
  //   //       colSpan: 1,
  //   //       styles: { halign: 'right' },
  //   //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
  //   //     }
  //   //   ],
  //   //   [
  //   //     // {
  //   //     //   colSpan: 3
  //   //     // }
  //   //   ],
  //   //   [
  //   //     {
  //   //       content: 'Usuario: 44684165',
  //   //       colSpan: 3,
  //   //       styles: { halign: 'left' },
  //   //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
  //   //     }
  //   //   ],
  //   //   [
  //   //     {
  //   //       content: 'Fecha: 03/09/2020 12:44:58',
  //   //       colSpan: 3,
  //   //       styles: { halign: 'left' },
  //   //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
  //   //     }
  //   //   ],
  //   //   [
  //   //     {
  //   //       content: 'Recibo: Original',
  //   //       colSpan: 3,
  //   //       styles: { halign: 'left' },
  //   //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
  //   //     }
  //   //   ],
  //   //   [
  //   //     // {
  //   //     //   colSpan: 3
  //   //     // }
  //   //   ],
  //   //   [
  //   //     {
  //   //       content: '** **',
  //   //       colSpan: 3,
  //   //       styles: { halign: 'center' },
  //   //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
  //   //     }
  //   //   ],
  //   // ];


  //   // const body = this.bodyRows(5);

  //   // doc.text('Theme "striped"', 0, 5)

  //   doc.autoTable({
  //     // startX: 0,
  //     startY: 5,
  //     margin: {
  //       right: 0,
  //       left: 0
  //     },
  //     styles: {
  //       valign: 'middle',
  //       font: 'courier',
  //       fontSize: 10,
  //       fontStyle: 'bold',
  //       // fillColor: [255, 255, 255],
  //       textColor: [0, 0, 0],
  //       // lineColor: [0, 0, 0],
  //       rowHeight: 4,
  //       cellPadding: 0,
  //       // lineWidth: 1
  //     },
  //     // head: [
  //     //   [
  //     //     {
  //     //       content: 'Buenavista La Bolsa S.A.C.',
  //     //       colSpan: 3,
  //     //       styles: { halign: 'center' },
  //     //       // styles: { halign: 'center', fillColor: [22, 160, 133] },
  //     //       columnHeight: 35
  //     //     },
  //     //   ],
  //     // ],
  //     body: recibo,
  //     theme: 'plain',
  //     // theme: 'grid',
  //   })


  //   doc.autoPrint();//<- para llamar a imprimir    
  //   doc.output('dataurlnewwindow');//<-- para ver pdf en nueva pestaña
  // }

  cancelar() {
    //this.router.navigateByUrl('caja/gestion/ingresos-egresos');
    this.form.reset();
  }

  validar(){
    if(this.form.controls['operacion'].value === 'i'){
      this.form.controls['responsable'].setValidators(null);
    } else {
      this.form.controls['responsable'].setValidators(Validators.required);
    }
  }
}
