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
  public usuarios:[] = [];
  public fechas:[] = [];
  private seguridad: Seguridad;
  public cajaID: string;
  
  public activarGuardado = true;
  
  
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
      fecha_apertura : ['', [Validators.required]],
      monto_total_apertura : ['', [Validators.required]],
      monto_total_operaciones : ['', [Validators.required]],
      cant_operaciones : ['', [Validators.required]],
      saldo : ['', [Validators.required]],
      cantidad_doscientos_soles_cierre : ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      cantidad_cien_soles_cierre : ['', [Validators.required]],
      cantidad_cincuenta_soles_cierre : ['', [Validators.required]],
      cantidad_veinte_soles_cierre : ['', [Validators.required]],
      cantidad_diez_soles_cierre : ['', [Validators.required]],
      cantidad_cinco_soles_cierre : ['', [Validators.required]],
      cantidad_dos_soles_cierre : ['', [Validators.required]],
      cantidad_un_sol_cierre : ['', [Validators.required]],
      cantidad_cincuenta_centimos_cierre : ['', [Validators.required]],
      cantidad_veinte_centimos_cierre : ['', [Validators.required]],
      cantidad_diez_centimos_cierre : ['', [Validators.required]],      
      comentario : ['', [Validators.required]],
    });
    
    console.log('aqui el id del sesion', this.seguridad.usuario);
    /* this.form.controls['cajero'].setValue(this.seguridad.id);
    this.form.controls['cajero'].disable(); */

    this.cargarCajaDiario();
    
  };

  cargarCajaDiario(){
    this.cierreCajaIndividualService.getOperacionesCajaInd('sss')
        .subscribe(res=>{
          
          this.cajaID= res["idCaja"]
          
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
    this.usuarioService.listarxrol("Cajero").subscribe(res=>{
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
        this.pdf()
        this.router.navigateByUrl('/dashboard/socio');
      }, 4000);
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
  cantidad_cien : number = 0
  cantidad_cincuenta : number = 0
  cantidad_veinte : number = 0
  cantidad_diez : number = 0
  cantidad_cinco : number = 0 
  cantidad_uno : number = 0
  cantidad_dos : number = 0
  cantidad_cincuenta_cent : number = 0
  cantidad_veint_cent : number = 0
  cantidad_diez_cent : number = 0
  
  validarNumero(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode
    if (charCode >= 48 && charCode <= 57){
      return true
    }

    return false
  }

  obtenerMonto(cantidad: number, multiplicador: number){
    if (cantidad <= 0 ){
      cantidad = 0
      return cantidad
    } else {
      return Number((cantidad * multiplicador).toFixed(1))
    }
  }

  
  get monto_total(){
    return (this.obtenerMonto(this.cantidad_doscientos, 200) + this.obtenerMonto(this.cantidad_cien, 100) + this.obtenerMonto(this.cantidad_cincuenta, 50) +
            this.obtenerMonto(this.cantidad_veinte, 20) + this.obtenerMonto(this.cantidad_diez, 10) + this.obtenerMonto(this.cantidad_cinco, 5) +
            this.obtenerMonto(this.cantidad_dos, 2) + this.obtenerMonto(this.cantidad_uno, 1) + this.obtenerMonto(this.cantidad_cincuenta_cent, 0.5) +
            this.obtenerMonto(this.cantidad_veint_cent, 0.2) + this.obtenerMonto(this.cantidad_diez_cent, 0.1)).toFixed(1)
  }

  get dif(){
    return  Number((this.form.controls['saldo'].value - Number((this.monto_total))).toFixed(1))
  }

 

  @ViewChild('content', {static: false}) content: ElementRef;

 

  public pdf(){
    // const doc = new jsPDF('l')
    var doc: any = new jsPDF()
    var pageNumber = doc.internal.getNumberOfPages()
    let fecha = new Date()
    
    

    doc.autoTable({
      
      styles: {  overflow: 'hidden',  cellWidth: ['wrap'] },
      //columnStyles: { '': { halign: 'center' } }, // Cells in first column centered and green
      margin: { right: 250 },
      body: [        
        [ this.seguridad.usuario ],
        [this.seguridad.apellido_paterno+ ' '+ this.seguridad.apellido_materno+', '+this.seguridad.nombre  ],
        [ fecha.getFullYear()+ '/'+ fecha.getDate()+'/'+fecha.getMonth() +'   '+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds() ],
      ],
      startY: 10,
      showHead: 'firstPage',  
      theme: 'plain' 
    })

    
    doc.autoTable({
      styles: {  overflow: 'visible',  cellWidth: ['wrap'], fontStyle: ['bold'], 
                  fontSize: [25], halign: ['center'], valign:['middle'],
                  fillColor: [151, 87, 176 ], textColor: 255  },
     /*  margin: { top: 50 }, */
      /* columnStyles: {
        0: { fillColor: [151, 87, 176 ], textColor: 255, fontStyle: 'bold' },
      }, */
      columns: [        
        {header: 'Control de Saldos'}        
      ],
      startY: 45,
    })

    doc.autoTable({
      
      styles: {  overflow: 'visible',  cellWidth: ['wrap'] },
      //columnStyles: { '': { halign: 'center', minCellWidth: [5] } }, // Cells in first column centered and green
      margin: { right: 150 },
      body: [        
        ['Cajero: ', this.seguridad.apellido_paterno+ ' '+ this.seguridad.apellido_materno+', '+this.seguridad.nombre   ],
        ['Fecha de Apertura: ', this.form.controls['fecha_apertura'].value],
        ['Apertura (S/.): ', this.form.controls['monto_total_apertura'].value],
        ['Operaciones (S/.): ', this.form.controls['monto_total_operaciones'].value ],
        ['N° de operaciones: ', this.form.controls['cant_operaciones'].value ],
      ],
      startY: 70,
      showHead: 'firstPage', 
      theme: 'plain' 
    })
    
    doc.autoTable({
      
      styles: {  overflow: 'hidden',  cellWidth: ['wrap'] },
      //columnStyles: { '': { halign: 'center' } }, // Cells in first column centered and green
      margin: { left: 150 },
      body: [        
        ['Saldo final (S/.): ', this.form.controls['saldo'].value ],
        ['Efectivo (S/.) ', this.monto_total],
        ['Diferencia (S/.): ', this.dif ],
      ],
      startY: 70,
      showHead: 'firstPage',  
      theme: 'plain' 
    })

    doc.autoTable({
      
      styles: {  overflow: 'visible',  cellWidth: ['wrap'] },
      //columnStyles: { '': { halign: 'center', minCellWidth: [5] } }, // Cells in first column centered and green
      margin: { right: 150 },
      columns: [
        {  header: 'MONTO' },
        {  header: 'CANTIDAD' },
        {  header: 'VALOR' },
      ],
      body: [        
        ['S/. 200.00', this.cantidad_doscientos, this.obtenerMonto(this.cantidad_doscientos, 200)],
        ['S/. 100.00', this.cantidad_cien, this.obtenerMonto(this.cantidad_cien, 100)],
        ['S/. 50.00', this.cantidad_cincuenta, this.obtenerMonto(this.cantidad_cincuenta, 50)],
        ['S/. 20.00', this.cantidad_veinte, this.obtenerMonto(this.cantidad_veinte, 20) ],
        ['S/. 10.00', this.cantidad_diez, this.obtenerMonto(this.cantidad_diez, 10) ],
        ['S/. 5.00', this.cantidad_cinco, this.obtenerMonto(this.cantidad_cinco, 5)]
      ],
      startY: 120,
      showHead: 'firstPage',  
    })
    
    doc.autoTable({
      
      styles: {  overflow: 'hidden',  cellWidth: ['wrap'] },
      //columnStyles: { '': { halign: 'center' } }, // Cells in first column centered and green
      margin: { left: 150 },
      columns: [
        {  header: 'MONTO' },
        {  header: 'CANTIDAD' },
        {  header: 'VALOR' },
      ],
      body: [        
        ['S/. 2.00', this.cantidad_dos, this.obtenerMonto(this.cantidad_dos, 2) ],
        ['S/. 1.00', this.cantidad_uno, this.obtenerMonto(this.cantidad_uno, 1)],
        ['S/. 0.50', this.cantidad_cincuenta_cent, this.obtenerMonto(this.cantidad_cincuenta_cent, 0.5)],
        ['S/. 0.20', this.cantidad_veint_cent, this.obtenerMonto(this.cantidad_veint_cent, 0.2)],
        ['S/. 0.10', this.cantidad_diez_cent, this.obtenerMonto(this.cantidad_diez_cent, 0.1)],
      ],
      startY: 120,
      showHead: 'firstPage',  
    })

    doc.autoTable({
      styles: {  overflow: 'visible',  cellWidth: ['wrap'], fontStyle: ['bold'],  halign: ['center'], valign:['middle'] },
      margin: { top: 40 },
      body: [        
        ['Comentario: ', this.form.controls['comentario'].value],        
      ],
      startY: 180,
    })
/* 

    let specialElementHandlers = {
      '#editor' : function(element, renderer){
        return true;
      }
    }

    var x = document.getElementById("input1")
    var y = document.getElementById("input2")
    x.innerHTML = this.cantidad_doscientos.toFixed(2)
    y.innerHTML = this.obtenerMonto(this.cantidad_doscientos, 200).toFixed(2)


    let content = this.content.nativeElement
    doc.fromHTML(content.innerHTML, 10, 10, {
      'width':100,
      'elementHandlers': specialElementHandlers
    }) */

    doc.output('dataurlnewwindow');  

  }
  

}



 