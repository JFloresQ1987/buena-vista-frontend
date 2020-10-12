import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import Swal from 'sweetalert2';

import { Seguridad } from 'src/app/models/auth/seguridad.model';
import { Usuario } from './../../../../interfaces/core/registro/usuario.interface';
import { CierreCajaIndividual } from './../../../../interfaces/core/registro/cierre-caja.interface';

import { SeguridadService } from './../../../../services/auth/seguridad.service';
import { CierreCajaIndividualService } from './../../../../services/core/caja/cierre-caja-individual.service';
import { UsuarioService } from 'src/app/services/core/registro/usuario.service';
import { Router } from '@angular/router';
// import * as jsPDF from 'jspdf'
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as dayjs from 'dayjs';


@Component({
  selector: 'app-cierre-caja-individual',
  templateUrl: './cierre-caja-individual.component.html',
  styles: [
  ]
})

export class CierreCajaIndividualComponent {


  public cargando: boolean = true;
  public form: FormGroup;
  public formSubmitted = false;
  public usuarios: [] = [];
  public fechas: [] = [];
  private seguridad: Seguridad;
  public cajaID: string;

  constructor(
    private usuarioService: UsuarioService,
    private cierreCajaIndividualService: CierreCajaIndividualService,
    private formBuilder: FormBuilder,
    private seguridadService: SeguridadService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.cargarCajeros()
    this.seguridad = this.seguridadService.seguridad;
    this.form = this.formBuilder.group({
      //cajero : ['', [Validators.required]],
      local_atencion: ['', [Validators.required]],
      fecha_apertura: ['', [Validators.required]],
      monto_total_apertura: ['', [Validators.required]],
      monto_total_operaciones: ['', [Validators.required]],
      cant_operaciones: ['', [Validators.required]],
      saldo: ['', [Validators.required]],
      cantidad_doscientos_soles_cierre: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      cantidad_cien_soles_cierre: ['', [Validators.required]],
      cantidad_cincuenta_soles_cierre: ['', [Validators.required]],
      cantidad_veinte_soles_cierre: ['', [Validators.required]],
      cantidad_diez_soles_cierre: ['', [Validators.required]],
      cantidad_cinco_soles_cierre: ['', [Validators.required]],
      cantidad_dos_soles_cierre: ['', [Validators.required]],
      cantidad_un_sol_cierre: ['', [Validators.required]],
      cantidad_cincuenta_centimos_cierre: ['', [Validators.required]],
      cantidad_veinte_centimos_cierre: ['', [Validators.required]],
      cantidad_diez_centimos_cierre: ['', [Validators.required]],
      comentario: ['', [Validators.required]],
    });

    console.log('aqui el id del sesion', this.seguridad.usuario);
    /* this.form.controls['cajero'].setValue(this.seguridad.id);
    this.form.controls['cajero'].disable(); */

    this.cargarCajaDiario();

  };

  cargarCajaDiario() {
    this.cierreCajaIndividualService.getOperacionesCajaInd()
      .subscribe(res => {

        this.cajaID = res["idCaja"]

        this.form.controls['fecha_apertura'].setValue(res['fecha_apertura']);
        this.form.controls['fecha_apertura'].disable();

        this.form.controls['monto_total_apertura'].setValue(res["monto_total_apertura"]);
        this.form.controls['monto_total_apertura'].disable();

        this.form.controls['monto_total_operaciones'].setValue(res["monto_total_operaciones"]);
        this.form.controls['monto_total_operaciones'].disable();

        this.form.controls['cant_operaciones'].setValue(res["cant_operaciones"]);
        this.form.controls['cant_operaciones'].disable();

        const saldo = this.form.controls['monto_total_apertura'].value + this.form.controls['monto_total_operaciones'].value;
        this.form.controls['saldo'].setValue(saldo);
        this.form.controls['saldo'].disable();
      })
  }

  cargarCajeros() {
    this.usuarioService.listarxrol("Cajero").subscribe(res => {
      this.usuarios = res['usuarios'];
    })
  }

  guardar() {

    const data = {
      id: this.cajaID,
      fecha_apertura: this.form.controls['fecha_apertura'].value,
      cantidad_doscientos_soles_cierre: parseFloat(this.form.controls['cantidad_doscientos_soles_cierre'].value),
      cantidad_cien_soles_cierre: parseFloat(this.form.controls['cantidad_cien_soles_cierre'].value),
      cantidad_cincuenta_soles_cierre: parseFloat(this.form.controls['cantidad_cincuenta_soles_cierre'].value),
      cantidad_veinte_soles_cierre: parseFloat(this.form.controls['cantidad_veinte_soles_cierre'].value),
      cantidad_diez_soles_cierre: parseFloat(this.form.controls['cantidad_diez_soles_cierre'].value),
      cantidad_cinco_soles_cierre: parseFloat(this.form.controls['cantidad_cinco_soles_cierre'].value),
      cantidad_dos_soles_cierre: parseFloat(this.form.controls['cantidad_dos_soles_cierre'].value),
      cantidad_un_sol_cierre: parseFloat(this.form.controls['cantidad_un_sol_cierre'].value),
      cantidad_cincuenta_centimos_cierre: parseFloat(this.form.controls['cantidad_cincuenta_centimos_cierre'].value),
      cantidad_veinte_centimos_cierre: parseFloat(this.form.controls['cantidad_veinte_centimos_cierre'].value),
      cantidad_diez_centimos_cierre: parseFloat(this.form.controls['cantidad_diez_centimos_cierre'].value),
      comentario: this.form.controls['comentario'].value,
    }
    console.log(data)
    this.cierreCajaIndividualService.getCierreCaja(data)
      .subscribe(res => {
        Swal.fire({
          text: 'La informaciónse actualizó correctamente', icon: 'success'
        })
      })
    setTimeout(() => {
      // this.pdf()
      this.verPDF()
      this.router.navigateByUrl('/dashboard/socio');
    }, 1000);
  }

  cancelar() {

    this.form.controls['cantidad_doscientos_soles_cierre'].setValue('0'),
      this.form.controls['cantidad_cien_soles_cierre'].setValue('0'),
      this.form.controls['cantidad_cincuenta_soles_cierre'].setValue('0'),
      this.form.controls['cantidad_veinte_soles_cierre'].setValue('0'),
      this.form.controls['cantidad_diez_soles_cierre'].setValue('0'),
      this.form.controls['cantidad_cinco_soles_cierre'].setValue('0'),
      this.form.controls['cantidad_dos_soles_cierre'].setValue('0'),
      this.form.controls['cantidad_un_sol_cierre'].setValue('0'),
      this.form.controls['cantidad_cincuenta_centimos_cierre'].setValue('0'),
      this.form.controls['cantidad_veinte_centimos_cierre'].setValue('0'),
      this.form.controls['cantidad_diez_centimos_cierre'].setValue('0'),
      this.form.controls['comentario'].setValue('')

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


  cantidad_doscientos: number = 0
  cantidad_cien: number = 0
  cantidad_cincuenta: number = 0
  cantidad_veinte: number = 0
  cantidad_diez: number = 0
  cantidad_cinco: number = 0
  cantidad_uno: number = 0
  cantidad_dos: number = 0
  cantidad_cincuenta_cent: number = 0
  cantidad_veint_cent: number = 0
  cantidad_diez_cent: number = 0

  validarNumero(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode
    if (charCode >= 48 && charCode <= 57) {
      return true
    }

    return false
  }

  obtenerMonto(cantidad: number, multiplicador: number) {
    if (cantidad <= 0) {
      cantidad = 0
      return cantidad
    } else {
      return Number((cantidad * multiplicador).toFixed(1))
    }
  }


  get monto_total() {
    return (this.obtenerMonto(this.cantidad_doscientos, 200) + this.obtenerMonto(this.cantidad_cien, 100) + this.obtenerMonto(this.cantidad_cincuenta, 50) +
      this.obtenerMonto(this.cantidad_veinte, 20) + this.obtenerMonto(this.cantidad_diez, 10) + this.obtenerMonto(this.cantidad_cinco, 5) +
      this.obtenerMonto(this.cantidad_dos, 2) + this.obtenerMonto(this.cantidad_uno, 1) + this.obtenerMonto(this.cantidad_cincuenta_cent, 0.5) +
      this.obtenerMonto(this.cantidad_veint_cent, 0.2) + this.obtenerMonto(this.cantidad_diez_cent, 0.1)).toFixed(1)
  }

  get dif() {
    return Number((this.form.controls['saldo'].value - Number((this.monto_total))).toFixed(1))
  }




  // @ViewChild('content', {static: false}) content: ElementRef;



  // public pdf(){
  //   // const doc = new jsPDF('l')
  //   var doc: any = new jsPDF()
  //   var pageNumber = doc.internal.getNumberOfPages()

  verPDF() {

    let fecha = new Date()
    var doc: any = new jsPDF('l')
    var totalPagesExp = '{ total_pages_count_string }'

    const autoTablex: any = {

      didDrawPage: async (data) => {
        // Header
        doc.setFontSize(20)
        doc.setTextColor(40)

        var img = new Image();
        //img.src = "https://images.pexels.com/photos/209640/pexels-photo-209640.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=300";
        //img.src = "data:image/jpeg;base64,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"
        img.src = "data:image/jpeg;base64,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"

        if (img.src) {
          doc.addImage(img, /* 'PNG', */ data.settings.margin.right + 200, 10, 70, 20);
        }

        doc.autoTable({
          styles: { overflow: 'hidden', cellWidth: ['wrap'] },
          columnStyles: { '3': { font: 'bold' } }, // Cells in first column centered and green
          margin: { right: 250 },
          body: [
            [this.seguridad.usuario],
            [this.seguridad.apellido_paterno + ' ' + this.seguridad.apellido_materno + ', ' + this.seguridad.nombre],
            [dayjs().format('DD/MM/YYYY hh:mm:ss a')],
            ['___________________________________________________________________________________________________']
          ],
          startY: 10,
          showHead: 'firstPage',
          theme: 'plain'
        })

        doc.autoTable({
          styles: { overflow: 'visible', cellWidth: ['wrap'], fontSize: [25] },
          /* styles: {  overflow: 'visible',  cellWidth: ['wrap'], fontStyle: ['bold'], 
                      fontSize: [25], halign: ['center'], valign:['middle'],
                        }, */
          columns: [
            { header: '' },
            { header: 'Control de Saldos' },
            { header: '' },
          ],
          startY: 40,
        })
        doc.autoTable({
          // head: headRows(),
          // body: bodyRows(),
          showHead: false,
          styles: { overflow: 'visible', cellWidth: ['wrap'] },
          //columnStyles: { '': { halign: 'center', minCellWidth: [5] } }, // Cells in first column centered and green
          columnStyles: {
            0: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold', cellWidth: 40 },
          },
          margin: { right: 150 },
          body: [
            ['Cajero: ', this.seguridad.apellido_paterno + ' ' + this.seguridad.apellido_materno + ', ' + this.seguridad.nombre],
            ['Fecha de Apertura: ', this.form.controls['fecha_apertura'].value],
            ['Apertura (S/.): ', this.form.controls['monto_total_apertura'].value],
            ['Operaciones (S/.): ', this.form.controls['monto_total_operaciones'].value],
            ['N° de operaciones: ', this.form.controls['cant_operaciones'].value],
          ],
          startY: 70,
          // showHead: 'firstPage', 
          theme: 'grid'
        })
        doc.autoTable({
          styles: { overflow: 'hidden', cellWidth: ['wrap'] },
          //columnStyles: { '': { halign: 'center' } }, // Cells in first column centered and green
          columnStyles: {
            0: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold', cellWidth: 40 },
          },
          margin: { left: 150 },
          body: [
            ['Saldo final (S/.): ', this.form.controls['saldo'].value],
            ['Efectivo (S/.) ', this.monto_total],
            ['Diferencia (S/.): ', this.dif],
          ],
          startY: 70,
          showHead: 'firstPage',
          theme: 'grid'
        })
        doc.autoTable({
          styles: { overflow: 'visible', cellWidth: ['wrap'] },
          //columnStyles: { '': { halign: 'center', minCellWidth: [5] } }, // Cells in first column centered and green
          margin: { right: 150 },
          columns: [
            { header: 'MONTO' },
            { header: 'CANTIDAD' },
            { header: 'VALOR' },
          ],
          body: [
            ['S/. 200.00', this.cantidad_doscientos, this.obtenerMonto(this.cantidad_doscientos, 200)],
            ['S/. 100.00', this.cantidad_cien, this.obtenerMonto(this.cantidad_cien, 100)],
            ['S/. 50.00', this.cantidad_cincuenta, this.obtenerMonto(this.cantidad_cincuenta, 50)],
            ['S/. 20.00', this.cantidad_veinte, this.obtenerMonto(this.cantidad_veinte, 20)],
            ['S/. 10.00', this.cantidad_diez, this.obtenerMonto(this.cantidad_diez, 10)],
            ['S/. 5.00', this.cantidad_cinco, this.obtenerMonto(this.cantidad_cinco, 5)]
          ],
          startY: 120,
          showHead: 'firstPage',
        })
        doc.autoTable({

          styles: { overflow: 'hidden', cellWidth: ['wrap'] },
          //columnStyles: { '': { halign: 'center' } }, // Cells in first column centered and green
          margin: { left: 150 },
          columns: [
            { header: 'MONTO' },
            { header: 'CANTIDAD' },
            { header: 'VALOR' },
          ],
          body: [
            ['S/. 2.00', this.cantidad_dos, this.obtenerMonto(this.cantidad_dos, 2)],
            ['S/. 1.00', this.cantidad_uno, this.obtenerMonto(this.cantidad_uno, 1)],
            ['S/. 0.50', this.cantidad_cincuenta_cent, this.obtenerMonto(this.cantidad_cincuenta_cent, 0.5)],
            ['S/. 0.20', this.cantidad_veint_cent, this.obtenerMonto(this.cantidad_veint_cent, 0.2)],
            ['S/. 0.10', this.cantidad_diez_cent, this.obtenerMonto(this.cantidad_diez_cent, 0.1)],
          ],
          startY: 120,
          showHead: 'firstPage',
        })

        doc.autoTable({
          styles: { overflow: 'visible', cellWidth: ['wrap'], fontStyle: ['bold'], halign: ['center'], valign: ['middle'] },
          margin: { top: 40 },
          body: [
            ['Comentario: ', this.form.controls['comentario'].value],
          ],
          startY: 180,
        })



        // Footer
        var str = 'Page ' + doc.internal.getNumberOfPages()
        str = str + ' of ' + totalPagesExp
        doc.setFontSize(10)

        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageSize = doc.internal.pageSize
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
        doc.text(str, data.settings.margin.left, pageHeight - 10)
      },
      margin: { top: 30 },
    };


    autoTable(doc, autoTablex);

    // Total page number plugin only available in jspdf v1.0+
    if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages(totalPagesExp)
    }

    // return doc
    doc.output('dataurlnewwindow');
  }

  // @ViewChild('content', {static: false}) content: ElementRef;
  // public pdf(){
  //   const doc = new jsPDF('l')
  //   var pageNumber = doc.internal.getNumberOfPages()
  //   let fecha = new Date()

  //     doc.autoTable({
  //         styles: {  overflow: 'hidden',  cellWidth: ['wrap'] },
  //     //columnStyles: { '': { halign: 'center' } }, // Cells in first column centered and green
  //     margin: { right: 250 },
  //     body: [        
  //       [ this.seguridad.usuario ],
  //       [this.seguridad.apellido_paterno+ ' '+ this.seguridad.apellido_materno+', '+this.seguridad.nombre  ],
  //       [ fecha.getFullYear()+ '/'+ fecha.getDate()+'/'+fecha.getMonth() +'   '+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds() ],
  //     ],
  //     startY: 10,
  //     showHead: 'firstPage',  
  //     theme: 'plain' 
  //   })
  //   doc.autoTable({
  //     styles: {  overflow: 'visible',  cellWidth: ['wrap'], fontStyle: ['bold'], 
  //                 fontSize: [25], halign: ['center'], valign:['middle'],
  //                 fillColor: [151, 87, 176 ], textColor: 255  },
  //    /*  margin: { top: 50 }, */
  //     /* columnStyles: {
  //       0: { fillColor: [151, 87, 176 ], textColor: 255, fontStyle: 'bold' },
  //     }, */
  //     columns: [        
  //       {header: 'Control de Saldos'}        
  //     ],
  //     startY: 45,
  //   })
  // doc.autoTable({
  //         styles: {  overflow: 'visible',  cellWidth: ['wrap'] },
  //     //columnStyles: { '': { halign: 'center', minCellWidth: [5] } }, // Cells in first column centered and green
  //     margin: { right: 150 },
  //     body: [        
  //       ['Cajero: ', this.seguridad.apellido_paterno+ ' '+ this.seguridad.apellido_materno+', '+this.seguridad.nombre   ],
  //       ['Fecha de Apertura: ', this.form.controls['fecha_apertura'].value],
  //       ['Apertura (S/.): ', this.form.controls['monto_total_apertura'].value],
  //       ['Operaciones (S/.): ', this.form.controls['monto_total_operaciones'].value ],
  //       ['N° de operaciones: ', this.form.controls['cant_operaciones'].value ],
  //     ],
  //     startY: 70,
  //     showHead: 'firstPage', 
  //     theme: 'plain' 
  //   })
  //     doc.autoTable({
  //         styles: {  overflow: 'hidden',  cellWidth: ['wrap'] },
  //     //columnStyles: { '': { halign: 'center' } }, // Cells in first column centered and green
  //     margin: { left: 150 },
  //     body: [        
  //       ['Saldo final (S/.): ', this.form.controls['saldo'].value ],
  //       ['Efectivo (S/.) ', this.monto_total],
  //       ['Diferencia (S/.): ', this.dif ],
  //     ],
  //     startY: 70,
  //     showHead: 'firstPage',  
  //     theme: 'plain' 
  //   })
  // doc.autoTable({
  //         styles: {  overflow: 'visible',  cellWidth: ['wrap'] },
  //     //columnStyles: { '': { halign: 'center', minCellWidth: [5] } }, // Cells in first column centered and green
  //     margin: { right: 150 },
  //     columns: [
  //       {  header: 'MONTO' },
  //       {  header: 'CANTIDAD' },
  //       {  header: 'VALOR' },
  //     ],
  //     body: [        
  //       ['S/. 200.00', this.cantidad_doscientos, this.obtenerMonto(this.cantidad_doscientos, 200)],
  //       ['S/. 100.00', this.cantidad_cien, this.obtenerMonto(this.cantidad_cien, 100)],
  //       ['S/. 50.00', this.cantidad_cincuenta, this.obtenerMonto(this.cantidad_cincuenta, 50)],
  //       ['S/. 20.00', this.cantidad_veinte, this.obtenerMonto(this.cantidad_veinte, 20) ],
  //       ['S/. 10.00', this.cantidad_diez, this.obtenerMonto(this.cantidad_diez, 10) ],
  //       ['S/. 5.00', this.cantidad_cinco, this.obtenerMonto(this.cantidad_cinco, 5)]
  //     ],
  //     startY: 120,
  //     showHead: 'firstPage',  
  //   })
  //     doc.autoTable({

  //     styles: {  overflow: 'hidden',  cellWidth: ['wrap'] },
  //     //columnStyles: { '': { halign: 'center' } }, // Cells in first column centered and green
  //     margin: { left: 150 },
  //     columns: [
  //       {  header: 'MONTO' },
  //       {  header: 'CANTIDAD' },
  //       {  header: 'VALOR' },
  //     ],
  //     body: [        
  //       ['S/. 2.00', this.cantidad_dos, this.obtenerMonto(this.cantidad_dos, 2) ],
  //       ['S/. 1.00', this.cantidad_uno, this.obtenerMonto(this.cantidad_uno, 1)],
  //       ['S/. 0.50', this.cantidad_cincuenta_cent, this.obtenerMonto(this.cantidad_cincuenta_cent, 0.5)],
  //       ['S/. 0.20', this.cantidad_veint_cent, this.obtenerMonto(this.cantidad_veint_cent, 0.2)],
  //       ['S/. 0.10', this.cantidad_diez_cent, this.obtenerMonto(this.cantidad_diez_cent, 0.1)],
  //     ],
  //     startY: 120,
  //     showHead: 'firstPage',  
  //   })

  //   doc.autoTable({
  //     styles: {  overflow: 'visible',  cellWidth: ['wrap'], fontStyle: ['bold'],  halign: ['center'], valign:['middle'] },
  //     margin: { top: 40 },
  //     body: [        
  //       ['Comentario: ', this.form.controls['comentario'].value],        
  //     ],
  //     startY: 180,
  //   })

  // }



}






