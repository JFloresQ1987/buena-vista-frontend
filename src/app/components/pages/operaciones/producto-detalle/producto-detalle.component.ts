import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
// import {imageToBase64} from 'image-to-base64';
import { OperacionFinancieraService } from '../../../../services/core/registro/operacion-financiera.service';
import { OperacionFinancieraDetalleService } from '../../../../services/core/registro/operacion-financiera-detalle.service';
import { delay } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { OperaconFinanciera } from '../../../../interfaces/core/registro/operacion-financiera.interface';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent implements OnInit {

  // private id_operacion_financiera: string;
  public operaconFinanciera: OperaconFinanciera;
  public operaconFinancieraDetalle: [];
  public cargando: boolean = true;
  public cargandoDetalle: boolean = true;
  
  constructor(private activatedRoute: ActivatedRoute,
    private serviceOperacionFinanciera: OperacionFinancieraService,
    private serviceOperacionFinancieraDetalle: OperacionFinancieraDetalleService) { }

  ngOnInit(): void {

    // this.id_operacion_financiera = this.route.snapshot.params.id

    // this.listarProducto();

    this.activatedRoute.params.subscribe( ({ id }) => {
      
      this.listarProducto(id);
      this.listarProductoDetalle(id);
    })

    // setTimeout(() => {
    //   // console.log(this.socio.getNombreCompleto());
    //   this.listarProducto();
    // }, 100);
  }

  // verPDF() {

  //   // this.htmlToPdf('#example', '', '#cabecera');

  // //   var opciones = {
  // //     orientation: 'p',
  // //     unit: 'mm',
  // //     format: [240, 300]
  // // };

  // // var doc = new jsPDF(opciones);

  //   const doc: any = new jsPDF()

  //   autoTable(doc, { html: '#example' })
  //   // doc.save('table.pdf')//<-- para guardar pdf    

  //   let finalY = doc.previousAutoTable.finalY; // esto le da el valor de la posición final del eje y del autotable anterior.
  //   doc.text('Texto que se mostrará en relación con la tabla', 12, finalY + 10);

  //   // // doc.autoTable({ html: '#table' });
  //   // let finalY = doc.lastAutoTable.finalY; // The y position on the page
  //   // doc.text(20, finalY, "Hello!")

  //   // doc.autoPrint();//<- para llamar a imprimir    
  //   doc.output('dataurlnewwindow');//<-- para ver pdf en nueva pestaña

  //   // doc.output('save', 'filename.pdf'); //Try to save PDF as a file (not works on ie before 10, and some mobile devices)
  //   // doc.output('datauristring');        //returns the data uri string
  //   // doc.output('datauri');              //opens the data uri in current window
  //   // doc.output('dataurlnewwindow');     //opens the data uri in new window

  // }

  verPDF() {

    var doc: any = new jsPDF()
    var totalPagesExp = '{ total_pages_count_string }'

    const autoTablex: any = {
      // head: this.headRows(),
      // body: this.bodyRows(120),
      html: '#example',
      didDrawPage: async (data) => {
        // Header
        doc.setFontSize(20)
        doc.setTextColor(40)

        // console.log(this.base64Img);

        var img = new Image();
        img.src = "https://images.pexels.com/photos/209640/pexels-photo-209640.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=300";
        // img.src = path.resolve('sample.jpg');

        // var doc = new jsPDF('p', 'mm', 'a3');  // optional parameters
        // doc.addImage(img, 'PNG', data.settings.margin.left, 15, 10, 10);
        // doc.addImage(img, 'PNG', 1, 2);
        // doc.save("new.pdf");

        if (img.src) {
          // console.log('entroo') 
          // doc.addImage(imgg, 'JPEG', data.settings.margin.left, 15, 10, 10)
          doc.addImage(img, 'PNG', data.settings.margin.left, 15, 10, 10);
        }

        // const imgg = this.getBase64ImageFromURL(
        //   "https://images.pexels.com/photos/209640/pexels-photo-209640.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=300"
        // )

        // console.log(imgg);

        //         if (imgg) {
        //           console.log('entroo') 
        //           doc.addImage(imgg, 'JPEG', data.settings.margin.left, 15, 10, 10)
        //         }
        // if (base64Img {
        //    doc.addImage(base64Img, 'JPEG', data.settings.margin.left, 15, 10, 10)
        // }

        doc.text('Report', data.settings.margin.left + 15, 22)

        // Footer
        var str = 'Page ' + doc.internal.getNumberOfPages()
        // // Total page number plugin only available in jspdf v1.0+
        // if (typeof doc.putTotalPages === 'function') {
        str = str + ' of ' + totalPagesExp
        // }
        doc.setFontSize(10)

        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageSize = doc.internal.pageSize
        var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
        doc.text(str, data.settings.margin.left, pageHeight - 10)
      },
      margin: { top: 30 },
    };

    // autoTable(doc, { html: '#example' })
    autoTable(doc, autoTablex);

    // doc.autoTable({
    //   head: this.headRows(),
    //   body: this.bodyRows(40),
    //   didDrawPage: async (data) => {
    //     // Header
    //     doc.setFontSize(20)
    //     doc.setTextColor(40)
    //     if (this.base64Img) {
    //       doc.addImage(this.base64Img, 'JPEG', data.settings.margin.left, 15, 10, 10)
    //     }
    //     doc.text('Report', data.settings.margin.left + 15, 22)

    //     // Footer
    //     var str = 'Page ' + doc.internal.getNumberOfPages()
    //     // Total page number plugin only available in jspdf v1.0+
    //     if (typeof doc.putTotalPages === 'function') {
    //       str = str + ' of ' + totalPagesExp
    //     }
    //     doc.setFontSize(10)

    //     // jsPDF 1.4+ uses getWidth, <1.4 uses .width
    //     var pageSize = doc.internal.pageSize
    //     var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
    //     doc.text(str, data.settings.margin.left, pageHeight - 10)
    //   },
    //   margin: { top: 30 },
    // })

    // Total page number plugin only available in jspdf v1.0+
    if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages(totalPagesExp)
    }

    // return doc
    doc.output('dataurlnewwindow');
  }

  headRows() {
    return [
      { id: 'ID', name: 'Name', email: 'Email', city: 'City', expenses: 'Sum' },
    ]
  }

  footRows() {
    return [
      { id: 'ID', name: 'Name', email: 'Email', city: 'City', expenses: 'Sum' },
    ]
  }

  bodyRows(rowCount) {
    rowCount = rowCount || 10
    var body = []
    // var faker = window.faker
    for (var j = 1; j <= rowCount; j++) {
      body.push({
        id: j,
        name: 'Jorge',//faker.name.findName(),
        email: 'jfloresq1987@gmail.com',//faker.internet.email(),
        city: 'Ayacucho',//faker.address.city(),
        expenses: '1000',//faker.finance.amount(),
      })
    }
    return body
  }



  // getBase64ImageFromURL(url) {
  //   return new Promise((resolve, reject) => {
  //     var outputFormat = url.substr(-3) === 'png' ? 'image/png' : 'image/jpeg';

  //     console.log(outputFormat)

  //     var img = new Image();
  //     img.setAttribute("crossOrigin", "anonymous");

  //     img.onload = () => {
  //       var canvas = document.createElement("canvas");
  //       canvas.width = img.width;
  //       canvas.height = img.height;

  //       var ctx = canvas.getContext("2d");
  //       ctx.drawImage(img, 0, 0);

  //       var dataURL = canvas.toDataURL(outputFormat);
  //       // var dataURL = canvas.toDataURL("image/jpeg");

  //       resolve(dataURL);
  //     };

  //     img.onerror = error => {
  //       reject(error);
  //     };

  //     img.src = url;
  //   });
  // }



  // htmlToPdf(autoTableId = '', fileName = '', headerHtmlId = '', footerHtmlId = '', otherHtmlId = '') {
  //   //let doc = new jsPDF();
  //   let doc: any = new jsPDF('p', 'pt', 'a4', true);  //pt = px * .75

  //   let table = autoTableId || '';// ? ($("#" + autoTableId).get(0)) : document.getElementById("autoTableId");
  //   let newFileName = fileName || 'reporte.pdf';// ? (fileName + '.pdf') : 'report.pdf';
  //   let headerHtml = headerHtmlId || '';// ? ($("#" + headerHtmlId).get(0)) : document.getElementById("headerHtmlId");
  //   let footerHtml = footerHtmlId || '';// ? ($("#" + footerHtmlId).get(0)) : document.getElementById("footerHtmlId");
  //   let otherHtml = otherHtmlId || '';// ? ($("#" + otherHtmlId).get(0)) : document.getElementById("otherHtmlId");

  //   let startY = 30;
  //   // let finalY = doc.previousAutoTable.finalY;
  //   let pageNumber = doc.internal.getNumberOfPages();
  //   doc.setPage(pageNumber);
  //   let totalPagesExp = "{total_pages_count_string}";

  //   // Document default options
  //   doc.autoTableSetDefaults({
  //     //headStyles: {fillColor: [155, 89, 182]}, // Purple, fillColor: 0
  //     //margin: {top: 25},
  //   });

  //   // Document margin list
  //   let margins = { mTop: 10, mBottom: 60, mLeft: 50, pTop: 10, pBottom: 60, pLeft: 50, width: 800 };

  //   // Skip elements instead of display: none
  //   let specialElementHandlers = {
  //     '#skipText': function (element, renderer) {
  //       return true;
  //     }
  //   };

  //   // Other content options
  //   let otherContentOptions = {
  //     'width': margins.width, //max width of content on PDF
  //     'elementHandlers': specialElementHandlers,
  //     'pagesplit': true,
  //   };

  //   // Header content options
  //   let header = function (data) {
  //     doc.setFontSize(18);
  //     doc.setTextColor(40);
  //     doc.setFontStyle('normal');
  //     //doc.addImage(headerImgData, 'JPEG', data.settings.margin.left, 20, 50, 50);
  //     /*if (base64Img) {
  //         doc.addImage(base64Img, 'JPEG', data.settings.margin.left, 15, 10, 10);
  //     }*/

  //     //let headerHtml = '<header>Hello Header</header>';
  //     //doc.text(headerHtml, data.settings.margin.left + 15, 22);
  //     doc.fromHTML(
  //       headerHtml,
  //       margins.mLeft, //x coord
  //       margins.mTop, //y coord
  //       otherContentOptions, //options object
  //       margins
  //     );
  //   };

  //   // Footer content options
  //   let footer = function (data) {
  //     let str = "Page " + doc.internal.getNumberOfPages();
  //     // Total page number plugin only available in jspdf v1.0+
  //     if (typeof doc.putTotalPages === 'function') {
  //       str = str + " of " + totalPagesExp;
  //     }
  //     doc.setFontSize(10);

  //     // jsPDF 1.4+ uses getWidth, <1.4 uses .width
  //     let pageSize = doc.internal.pageSize;
  //     let pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
  //     doc.text(str, data.settings.margin.left, pageHeight - 10);
  //   };

  //   // Auto table content options
  //   let autoTableOptions = {
  //     html: table,
  //     startY: startY, //false
  //     //margin: {top: 30},
  //     theme: 'plain', //striped, plain, grid
  //     cellWidth: 'auto',
  //     useCss: true,
  //     //tableWidth: 'wrap',
  //     margin: { bottom: 20 },
  //     tableLineWidth: .75,
  //     tableLineColor: [0, 0, 0],
  //     styles: {
  //       fontSize: 10.5, //14px
  //       font: 'helvetica', //helvetica, times, courier
  //       lineColor: [0, 0, 0], //or single value ie. lineColor: 255,
  //       lineWidth: .75, //1px
  //       cellPadding: 1.5,
  //       textColor: [0, 0, 0],
  //       fillColor: [255, 255, 255], //false for transparent or number or array of number
  //       valign: 'middle', //top, middle, bottom
  //       halign: 'left', //left, center, right
  //       cellWidth: 'auto', //'auto', 'wrap' or a number
  //       overflow: 'ellipsize', //visible, hidden, ellipsize or linebreak
  //       fontStyle: 'normal', //normal, bold, italic, bolditalic
  //     },

  //     // Header & Footer
  //     didDrawPage: function (data) {
  //       // Header Content
  //       header(data);

  //       // Footer Content
  //       footer(data);
  //     },

  //   };

  //   // Auto table content
  //   doc.autoTable(autoTableOptions);

  //   // Total page number
  //   if (typeof doc.putTotalPages === 'function') {
  //     doc.putTotalPages(totalPagesExp);
  //   }


  //   // Output
  //   //doc.save(newFileName);
  //   doc.output("dataurlnewwindow");
  // }

  listarProducto(id_operacion_financiera: string) {

    // this.cargando = true;
    // // this.sesionSocio = this.sesionSocioService.sesionSocio;
    // // console.log(this.sesionSocioService.sesionSocio);
    // // console.log(this.socio.getId());
    // // console.log(this.socio.getNombreCompleto());
    
    // if (this.socio.getId() === '0') {
    //   Swal.fire({
    //     text: "Primero debe buscar un socio.", icon: 'warning'
    //   });
    //   return;
    // }

    this.cargando = true;

    // console.log(this.id_operacion_financiera)

    this.serviceOperacionFinanciera.listarProducto(id_operacion_financiera)
      // .pipe(
      //   delay(100)
      // )
      .subscribe((res: any) => {

        // console.log(res)
        // this.productos = res.lista;
        // this.cargando = false;
        // console.log(this.productos);

        this.operaconFinanciera = res;
        // this.operaconFinanciera = res.modelo;

        this.cargando = false;

        console.log(res)

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

  listarProductoDetalle(id_operacion_financiera: string) {

    // this.cargando = true;
    // // this.sesionSocio = this.sesionSocioService.sesionSocio;
    // // console.log(this.sesionSocioService.sesionSocio);
    // // console.log(this.socio.getId());
    // // console.log(this.socio.getNombreCompleto());
    
    // if (this.socio.getId() === '0') {
    //   Swal.fire({
    //     text: "Primero debe buscar un socio.", icon: 'warning'
    //   });
    //   return;
    // }

    this.cargandoDetalle = true;

    // console.log(this.id_operacion_financiera)

    this.serviceOperacionFinancieraDetalle.listarProductoDetalle(id_operacion_financiera)
      // .pipe(
      //   delay(100)
      // )
      .subscribe((res: any) => {

        // console.log(res)
        // this.productos = res.lista;
        // this.cargando = false;
        // console.log(this.productos);

        this.operaconFinancieraDetalle = res;
        // this.operaconFinanciera = res.modelo;

        this.cargandoDetalle = false;

        console.log(res)

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
