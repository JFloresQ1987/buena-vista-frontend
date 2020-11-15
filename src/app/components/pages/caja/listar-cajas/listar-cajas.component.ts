import { Component, OnInit } from '@angular/core';
import { CierreCajaIndividualService } from '../../../../services/core/caja/cierre-caja-individual.service';

import { Seguridad } from 'src/app/models/auth/seguridad.model';
import { SeguridadService } from './../../../../services/auth/seguridad.service';

import * as jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-listar-cajas',
  templateUrl: './listar-cajas.component.html',
  styles: [
  ]
})
export class ListarCajasComponent implements OnInit {

  cajas:[] = [];

  desde: string  = '1969-01-01' 
  hasta: string  = '2050-01-01' 

  private seguridad: Seguridad;

  constructor(
    private listarCajas: CierreCajaIndividualService,
    private seguridadService: SeguridadService,
  ) { }

  ngOnInit(): void {

    this.seguridad = this.seguridadService.seguridad;

    this.listarCajas.getCajas(this.desde, this.hasta).subscribe(res=>{
      this.cajas = res['cajas'];
    })    
  }

  elegirFecha(desde: string, hasta: string){
    desde = this.desde
    hasta= this.hasta
    this.listarCajas.getCajas(desde, hasta).subscribe(res=>{
      this.cajas = res['cajas'];
    })
  }

  cargarReporte(fecha_apertura: string){
    this.listarCajas.getCajasFecha(fecha_apertura).subscribe(res=>{
      // this.cajas = res{['cajas']};


      // Reporte      
      let saldoFinal = res['cajasFecha']['monto_total_apertura'] - res['cajasFecha']['monto_total_operaciones']
      let nombre = res['cajasFecha']['caja']['usuario']['persona']['nombre'] + ' '+ 
                    res['cajasFecha']['caja']['usuario']['persona']['apellido_paterno'] + ' '+
                    res['cajasFecha']['caja']['usuario']['persona']['apellido_materno'] 
      let fecha = new Date()
      var doc: any = new jsPDF()
      var totalPagesExp = '{ total_pages_count_string }'
    
      const autoTablex: any = {
             
        didDrawPage: async (data) => {
          // Header
          doc.setFontSize(8)
          doc.setTextColor(40)

          // Header
          
          
          var img = new Image();
          img.src = 'http://localhost:3000/api/upload/buenavista-logo.png'
          if (img.src) {         
            doc.addImage(img, /* 'PNG', */ data.settings.margin.right+110, 5, 70, 20);
          }
          doc.text(this.seguridad.usuario + '\n' + 
                  this.seguridad.apellido_paterno+ ' '+ this.seguridad.apellido_materno+', '+this.seguridad.nombre  + '\n' + 
                  dayjs().format('DD/MM/YYYY hh:mm:ss a')
                  , data.settings.margin.left , 10 )
         
          doc.autoTable({
            styles: {  overflow: 'visible',halign: ['center'],  cellWidth: ['wrap'], fontSize: [20] },            
            head: [
              [
                {
                  content: 'Control de Saldos',
                  colSpan: 3,
                  styles: { halign: 'center',  },
                },
              ],
            ],
            startY: 28,
          })
          doc.autoTable({
            // head: headRows(),
            // body: bodyRows(),
            showHead: false,
            styles: {  overflow: 'visible',  cellWidth: ['wrap'] },
            //columnStyles: { '': { halign: 'center', minCellWidth: [5] } }, // Cells in first column centered and green
            columnStyles: {
              0: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold', cellWidth: 40 },
            },
            margin: { right: 100 },
            body: [        
              ['Cajero: ',  nombre ],
              ['Fecha de Apertura: ', res['cajasFecha']['apertura']['fecha_apertura']],
              ['Apertura (S/.): ', (res['cajasFecha']['monto_total_apertura']*1).toFixed(1)],
              ['Operaciones (S/.): ',( res['cajasFecha']['monto_total_operaciones']*1).toFixed(1)],
              ['N° de operaciones: ', res['cajasFecha']['cantidad_operaciones']],
            ],
            startY: 45,
            // showHead: 'firstPage', 
            theme: 'grid' 
          })
          doc.autoTable({
            styles: {  overflow: 'hidden',  cellWidth: ['wrap'] },
          //columnStyles: { '': { halign: 'center' } }, // Cells in first column centered and green
            columnStyles: {
              0: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold', cellWidth: 40 },
            },
            margin: { left: 115 },
            body: [        
              ['Saldo final (S/.): ', (saldoFinal).toFixed(1) ],
              ['Efectivo (S/.) ', (res['cajasFecha']['monto_total_efectivo']*1).toFixed(1)],
              ['Diferencia (S/.): ', (saldoFinal - res['cajasFecha']['monto_total_efectivo']).toFixed(1) ],
            ],
            startY: 45,
            showHead: 'firstPage',  
            theme: 'grid' 
          })
          doc.autoTable({
            styles: {  overflow: 'visible',  cellWidth: ['wrap'] },
            //columnStyles: { '': { halign: 'center', minCellWidth: [5] } }, // Cells in first column centered and green
            margin: { right: 107.5 },
            columns: [
              {  header: 'MONTO' },
              {  header: 'CANTIDAD' },
              {  header: 'VALOR' },
            ],
            body: [        
              ['S/. 200.00',res['cajasFecha']['cierre']['cantidad_doscientos_soles_cierre'], 
                            (res['cajasFecha']['cierre']['cantidad_doscientos_soles_cierre'] * 200).toFixed(1)],
              ['S/. 100.00', res['cajasFecha']['cierre']['cantidad_cien_soles_cierre'], 
                            (res['cajasFecha']['cierre']['cantidad_cien_soles_cierre'] * 100).toFixed(1)],
              ['S/. 50.00', res['cajasFecha']['cierre']['cantidad_cincuenta_soles_cierre'], 
                            (res['cajasFecha']['cierre']['cantidad_cincuenta_soles_cierre'] * 50).toFixed(1)],
              ['S/. 20.00', res['cajasFecha']['cierre']['cantidad_veinte_soles_cierre'], 
                            (res['cajasFecha']['cierre']['cantidad_veinte_soles_cierre'] * 20).toFixed(1)],
              ['S/. 10.00', res['cajasFecha']['cierre']['cantidad_diez_soles_cierre'], 
                            (res['cajasFecha']['cierre']['cantidad_diez_soles_cierre'] * 10).toFixed(1)],
              ['S/. 5.00', res['cajasFecha']['cierre']['cantidad_cinco_soles_cierre'], 
                            (res['cajasFecha']['cierre']['cantidad_cinco_soles_cierre'] * 5).toFixed(1)]
            ],
            startY: 90,
            showHead: 'firstPage',  
          })
          doc.autoTable({
            
            styles: {  overflow: 'hidden',  cellWidth: ['wrap'] },
            //columnStyles: { '': { halign: 'center' } }, // Cells in first column centered and green
            margin: { left: 107.5 },
            columns: [
              {  header: 'MONTO' },
              {  header: 'CANTIDAD' },
              {  header: 'VALOR' },
            ],
            body: [        
              ['S/. 2.00',res['cajasFecha']['cierre']['cantidad_dos_soles_cierre'], 
                          (res['cajasFecha']['cierre']['cantidad_dos_soles_cierre'] * 2).toFixed(1)],
              ['S/. 1.00', res['cajasFecha']['cierre']['cantidad_un_sol_cierre'], 
                          (res['cajasFecha']['cierre']['cantidad_un_sol_cierre']).toFixed(1)],
              ['S/. 0.50', res['cajasFecha']['cierre']['cantidad_cincuenta_centimos_cierre'], 
                          (res['cajasFecha']['cierre']['cantidad_cincuenta_centimos_cierre'] * 0.5).toFixed(2)],
              ['S/. 0.20', res['cajasFecha']['cierre']['cantidad_veinte_centimos_cierre'], 
                          (res['cajasFecha']['cierre']['cantidad_veinte_centimos_cierre'] * 0.2).toFixed(2)],
              ['S/. 0.10',res['cajasFecha']['cierre']['cantidad_diez_centimos_cierre'], 
                          (res['cajasFecha']['cierre']['cantidad_diez_centimos_cierre'] * 0.1).toFixed(2)],
            ],
            startY: 90,
            showHead: 'firstPage',  
          })
          doc.autoTable({
            styles: {  overflow: 'visible',  cellWidth: ['wrap'], fontStyle: ['bold'],  halign: ['center'], valign:['middle'] },
            margin: { top: 40 },
            body: [        
              ['Comentario: ', res['cajasFecha']['comentario']],        
            ],
            startY: 145,
          })
          // doc.autoTable({
          //   styles: {  overflow: 'hidden',  cellWidth: ['wrap'], cellPadding: 0.5, fontSize: 8  },
          //   body: [       
          //     ['Fuente: Base de datos institucional' ],
          //     ['Oficina Principal: Jr. Miller N°334 Ayacucho, Huamanga, Ayacucho; Central Telefónica 066-311613.'],
          //     ['© 2017 BuenaVista La Bolsa S.A.C. Todos los derechos reservados.'],
          //     ['http://www.buenavistalabolsa.com/']
          //   ],
          //   startY: 175,
          //   tableWidth: 'wrap',
          //   showHead: 'firstPage',  
          //   theme: 'plain' 
          // }) 
          var str = 'Página ' + doc.internal.getNumberOfPages()
          var fuente = `Fuente: Base de datos institucional`
          var oficina = `Oficina Principal: Jr. Miller N°334 Ayacucho, Huamanga, Ayacucho; Central Telefónica 066-311613.`
          var año = `© 2020 BuenaVista La Bolsa S.A.C. Todos los derechos reservados.`
          var pagWeb = `http://www.buenavistalabolsa.com/`
          // Total page number plugin only available in jspdf v1.0+
          if (typeof doc.putTotalPages === 'function') {
            str = fuente + '\n' + 
                  oficina + '\n' +
                  año + '\n' +
                  pagWeb + '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t' + 
                  str + ' de ' + totalPagesExp
          }
          doc.setFontSize(8)

          // jsPDF 1.4+ uses getWidth, <1.4 uses .width
          var pageSize = doc.internal.pageSize
          var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
          doc.text(str, data.settings.margin.left, pageHeight - 20)
        },
      };
      
      autoTable(doc, autoTablex);
    
      // Total page number plugin only available in jspdf v1.0+
      if (typeof doc.putTotalPages === 'function') {
        doc.putTotalPages(totalPagesExp)
      }
    
      // return doc
      // doc.save('reporte.pdf')
      // doc.output('dataurlnewwindow');

      var blob = doc.output("blob");
      window.open(URL.createObjectURL(blob));

    })
  }


}
