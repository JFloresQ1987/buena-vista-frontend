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
        .subscribe(res=>{
          if (!res['ok']) {
            this.cargando = false
            
          } else {
            this.cargando = true
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
          }
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
        img.src =  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgICAYGBgUIBQUFCAoICAcICBsICQgKIB0iIiAdExMZHTQwJCY0JxMTLUUtKDo3QEBAIys/TUU4NzQ5LjcBCgoKDg0OGhAQGisdHx8tKysrKysrLS0tLS0tKy0tLS0tLSstLS0tLS0tLS0rLS0rLS0tLS0tKystLS0tLS0tK//AABEIAFoBTwMBEQACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAQMEBgcCBf/EAEMQAAEEAQMBBAgDBgQDCQEAAAECAwQFAAYREiETMWGRBxQVIkFRUnGBodEjMkJVlLEWNmJ1NVaTNGNkc4Kiw+HwM//EABoBAQADAQEBAAAAAAAAAAAAAAABAgMEBQb/xAAnEQACAgICAgIDAAMBAQAAAAAAAQIRAxIEIRMxQVEFIjIjM2EUBv/aAAwDAQACEQMRAD8AqXJX1nzz3KOAOSvrPnigdoStXcT55AJTMFxe3VXXxyrZNE9mkcXsTyyjmi2o8qgWBuArI3GrIb9U6jf97zy2yDiQXY7iN/ePTLpplaGCVDoVHzySBOSvrPnk0A5K+o+eRSAclfUfPFIByV9Z88UgHJX1HzyegHJX1HzyKQDkr6z54pAOSvrPnikA5K+s+eKQDkr6z54pAOSvrPnikA5K+s+eKQDkr6z54pAOSvrPnikA5K+s+eKQDkr6z54pAOSvrPnikA5K+s+eKQDkr6z54pAOSvrPnk0A5K+s+eKAclfWfPIpAOSvrPnikA5K+o+eKQDkr6j54pAOSvrPnikA5K+s+eKQDkr6j54pAOSvrPnikA5K+s+eKQsOSvrPnihYclfWfPJoByV9Z88ATAHWGisjpkMHuV1cVke7+WZSkXSLdVUBXxJa/LOeWQ0UT0pCqStG1ldw4ax3oU7uofgMKE5ekS3FfJHReaVdIbRqWIFHoORKQfyyzwZV8FfJEkuVMSY2XYMpic0RvyZcDn9spco+y3TKzZ0pQVfs9vwzWOSyjiVmXAIVxCdic1UijQjdM4sbgHyyXManfsNzx8seRDU5VSOgb7KP4Y8iGojdO4vfbfp4Y3Q1O/Ybvj5ZHkQ1D2G54+WT5ENQ9huePljyIah7Dc8fLHkQ1D2G74+WPIhqHsN3x8seRDUPYbvj5Y8iGpyqlcTt+918MeRDU69huePljyIaiKpHAN+vljyIai+w3PHyx5ENQ9hu+PljyIaiexHdyOvljyIai+w3fHyx5ENRPYbvXv8ALHkQ1F9hu+PlkbjUPYbvj5Y3Goho3Op69PDJ3Q1EbpnFEjZXTwxuhqdexHNyNldPDHkRNCCkcO/f08MeRChfYbnj5Y8iI1D2G74+WPIhqcmkcGw97r4Y8iGp17Dc8fLHkQ1D2G74+WR5ENRl6qW3vvv08MspoakF1otnY5ZMqN5IADcgfPAPbqonMp93ffMpMukXykqkhPau7NMtDmtaugSnOWcndGsUit6g1NcWy3arRdfK9lMng5OjtnnIP326DO3DhxwW0zCc5SdRKXP03fMhcibSTSD1W6Wy75nO2GbF6Rg8cjxyCCQU8SnvB6EZv00ZemTKy1nVrqZFbPdhOoO/uK90/cZSeGM1TLxnKJqelNWx9RJFbZobh3yU+4sdG5X28c8rkcZ4/wBo+jrx5t+mdz6ri+hJb/i27swjPo0aPXYrYkZhD0+UxBacPFK31hoKPhvlLk3SJ6+ReFJ/Pq/+qT+uTpk+iLiKmJVv/s41rDkuK7kNvpUo/nhqa+CbiI1UMR0vPTHmokdsgF15QbQPxORs30TVBwpf57X/ANSn9cnWf0RtE7XGqkIbdct4TbMnctOKfSEufY74qd+hcUI1GqnlBqNbwpDxBIQ2+lSiPsDhqa9oJxfRzwpf57X/ANUn9cazfwNohwpf57X/ANUn9cnXJ9C4nTUaqfWliNbQpMh3ohpt9K1q+wByGpr2gnERTVOkqQu7gIcQdlJMlIIPnhRn9BuKD2bDlAKgS485KFgLLDgcCT47ZDbXvonp+hXI9SytTL9xBYfaOy21yAlSD4jfJSm/SItLoG4NfK5IgWEWc6jZSkMOhxSR+ByHtH+kFT9A4xUNKUy/cQWH2ui21yEpUk+I3ydZv0g3FHPCl/n1f/VJ/XGuT6IuP2OGDXpaE1djFRAdPFEkugNLPgd/A5H7ekTaob4Uv8+r/wCqT+uTpP6I2jR2qLVobRIXbQkRZBIadU+kIcI+R3yKk36LXGrOUt0yilCLuvUtZ2CRJSST55Os/lEXEQt0wJBva8KHQgyU9PzxrP4QuIqI9S6oMx7iC++70Q2iQlS1nwG+GppdoWn6D2bDhpU9Yy2IDJOwW+4GwfPIW0vQdL2L2FT2YlG4giK6eKHjIT2aj4HfJqd+gnH2dOV8COkPSp0aLHkHdpx10IQ59iTlf3vpDpdsb4Uv8+rv6pP65bWf0RcQ4Uv8+rv6pP640n9C4nbdbDl7LgTI85tpWzimHA4EHx2yG5RdMt0/RwW6UEhV7XpUnoQZKRt+eTrP6IbiHCl/n1d/VJ/XGuT6I2iQripQEdq0UOMuJCkLR1SoeByYTt9ktKigXLPZqI22651QZi0eVmhUcYTyWn5bjIYRd9OwwooJGc2Rm0UXSwru3hNwVumPXyNlTFIPFbjY/hB8c54zrs0aTGIz4RwhVcVuJFZ91CGkcEAfhkuTfshRomPTGIKQbS3biqUP/wCSzyUR9s55Z4xOzFwsuXuKKhqej07qFtx2onxoWoUglvZPYplK+ShnVxfyOrpsjk/iMyV6mSyWHI7z0WQ2WZEZZbcQe9Khn0EJKcbR4UoOLpiMPOMOtSGHVMvsKC0LSeKknEopxohOjcqWxTe08K32AmI/ZSUj+F0fr354ObH48lHoY5bKxdRUrOo6xiEqauCqucVI5ITy5Hbuxx8jxyJyR2j0Y1R1wsbWDULfUwic+WS6kblPf+mezOWsN6OCMXKVHta10o5plcFxi1VKZncihW3ZuIUPt98ywZlm6aNMkNC9adQ7qzSKIFlMcZkLf7FUsDktYSem++cGWsOa0dEP3iZU9X9nbLpg+VIRP9S7X47ctt9s9RSTx7HI1+1Gi6w0c1G07GWi0ccVpRlfEFGwe5Ed+efgz3lqvZ0ZMdRsg+jDTbUhs6jdsHGlx3HogYCd0ndPfv8Ajl+Zm1dJEYIWrKxragTQWSK9qauah2MiT2ixxI336flnTxsiyRujLNHVlnofRtHsq6us3Lx6O5YtBzs0tBQQfvnPl5ahJqjWGFtWQNL071ZrWFDCHn4sCU6gSFNkJUOJ65ObJGeG0VjBqVDHpE0yilkR5TM9yZ7bceeKVJ49md/hmnEzKfVEZoasZ9H985RW6GZhU3X2BDEltX8CvgcnlYVOForinrLs9T0o6bbgOHULU9cg3szYtEbJR036H8My4mTb9WvRpmjT2LL6PNPMVEePemwXIdvYbRMco2S38ehzm5eXd1Xo1ww1VsqnpQo2K+Yi0RYOPytQPOPGOU8Q0n/8c6+Fk2VNejHPCnZVm65TdhFrbNaoCZC2w4vvLaD8c65SWraRik/RsUvSEd+hg6QNs62mvf7dMrhupZ3J7v8A1Z40c+uTeju8f6UY7JrvVLZdPOeUwmPLEd50D3ko37/LPXU1LHtRxNNOjS9SaQiR9MsNOXLvYaYS/KQ5wG8gq+GebizXl9ezpljqBV/R/pT2x2trJnLgRauQ12ZSnl2yu8j+2dXJzrHSSMsWNyGteaVaoDDfYsXJwtFuEhaePDLcXMslpojNBxPY9GelWpgg6lcsXGnYMxSUxgjdK9vH8cw5eZL9KNMEL7PJ1I+7fasdrrCxMKAJnqjfI+5HR4DNcMVDFa7KTe0tWO6x0RMqExBVPyrqrl8lBITuW3PsMjFyYz6kqZM8TVUez6TkqRp7STa0ltxCW0qSehB4/HMuLXkkXzdRSK3qTSaKinprtFi5JXc8QplSdkt9N+/OjDmU5uNGU4UkzrS+kkXFVcW67FyKuoStSWkp3Dmw364zZlCajQhByTZa/QwraDfknoZTA/8Aac5OdVxZtx/TKfrXTzdTbMVkOcuxk2KUuqChxLa1HoP7Z18XIpwtoxyxp9EGgpkzblqisZS61bji2VLSORS4PhmuWajC4opBPajYrEtQ4UWuC1OCAwljmobFe2eJ/UrO/wBKjN79wKUdvnnXjMpHi5qZk6qa7Rzbv65WTLI0CgrXFcOBKd9u7OOcjeKLM5CfWgNLkjin/VmSX/C3RDs30Uda/MSUKmrPYsbnlss/H8sxzuaj0jv/AB+GOXKk2UeHCkWjq5D7q3nXjuVqO5OeUlKT7PsJZIceNIfsaByMntE7gp64cNeyMfKjkdFG1G2syEPrJW48nZRPUkjPpvxHIcoayfo+R/8AoOGoZN4r2eRxV9J8s9raNHzdM0/0PvLVHv4K9+yb7J9APwJ3B/sM8rn1aaOzj3XZeK8bJmAfBtz+2cK9o3fowerE02kYU/I25kq9V4EBXPr3b/jnvScfH+3o85Xt0ejqpnUSHozurW5JKujZcWCnb48SOmZ4ZY2qgWybfJrOgZVdJqoApG1R4cJRbeYcO7iHvjufHPK5UZKf7HZif6mSTP8ANT3++f8AyZ6q/wBByP8A2Gva7/y5f/8AlN/3GeVx/wDajsydwPE9FX+XX/8AcVf2Gac6tynH/krHpi/49G/21j+5zr/H/wCsx5H9Dmnjrv1Ws9mJf9he52PHhx7Lfx6/PK51gt37Jx+Q1eQqQNihG44jkrbrvnlNnWjOPTF3ac37+Ln989Hg+mc2f4IXpH092cOo1JDa4tvxY7MwJH7q9uhzXjZns4Mplx9WjybvUXtXTFTXyXOVnTTOCie9xridjmsMGmRtfJWU9o0zU9OI50umE9+8Fj+2eVn/ANjOzH/KM29JNk1I1Mhp/dyupQywtCP4gDudvPPS4uOsRyZZXKjy9a3cK5sWLKrjOxAiO00tLoAO6e4jbNcGNxjq3ZXJK3ZrlJYe0Kmltwrkt1lKHT/rHQ/2zx88HGbR2QdxM/8AS5W9hZxLhlPFq5Z3WR0/ajPR4M7hqzmzqnY5qfU3rekKCCh3lOm7NygD72yOnX75GPA45XJiWS4JFx0vBFXp+qhlPGRLSJT3ipX/ANbZxcie2RnTjWsSuemP/s+n/u5nV+P+THkHqei1Sk6d5IG6kz3NvyzHnf2X4/8AJE1voCRYPPXtInjNk/tJENZ481/NBzTjcpRWsvRXLit2iq0+rr7TcgQJ/bPRmTxcgy9ypKf9JOdU8EMquJlHJKHTNQlt1N/X10yfDFlXPD1hjkopKCfnsc8q54W0jrpTRWvS0htuiomWG+yjsy1IbbH8KOOdXAbeRsx5H8h6JQhVLdNvIDsd6QW3EH+JBHXJ517pjj/yWuhr62B2semgphR5Kw4/soq5EffOKc5TfZvGKXoyeyvYytYP3c9C5NfBmHihvqVoT0G2/wBhnr48X+HX5OKUrmefcXLD+oHNQVTTkZpUpuUhtzooKH2+2aQx/wCLV9lXL9rNftuzmRI85n3mprCXkn5gjPG/mVM7vizO7WGeayR7oOdUWZNHhrTxUR8s1soejRqAd6/MZnMtE1TTLg/Zj5jOKfs3XoxS/VLi2lrFXLfQpiW6Nu1Pz++e5hhCWNOjz8jaZ5ypDyui5TriR12U4VdcvLFBxqiceaUGmmafoi2ZEeOtZHJIAUD88+R5OPxZWmfcYG+Tx0z3tQ3DDzR48QeO3TObJNM24fFlF9nl6Eih+xkzXGEuRojK9ytHJPI93fluI5bdE/mpR8Sj8lpXMZDimkwGFqB6bMD9M9VOVez5ClZzJlqbHZIiojKe6EobCN/LC79jpeiLbW0PT8BE6w7V0WKlMI7Icjz2+OaYcbyS6KTlrExnTtgzX3VdayQtUWHJLywgbrKev657WSDlj1RwwlUrZZvSDrOFexYldWxX0Nx5HrC3nwASdiNgB985uLx3ik22a5cm/SLP6JYL0GskTJiFR0W0lKmEL90lA+O2cvNmpS6+DbAqiUHVkZ+p1JNeeZPETvXWVbe66gnl0Od+CSnio5si1nZadWa/rbGkfrYDMj2hZpbS6HEbIZ27+vx7s5sPFccts1nluNHv+jWE5E04lUtCmfWXnZoSRsvstvl+Gc3LalkpGuFawszr0g3sS8tW59elxEdqI3HPap4q5An9c9LiY3jhTOXNLaVlu036QaaBVVVfLblmTXshtzs0AoJ88483ElKbaN4ZklRA0/qibZ6xjJYtJRo50pzhEcVsnhxPQjNMmCMMX/SsMjlMhekzUUK2fgRoKXkrplutPdoniCd/h5Zbh4XGLf2VzZE2X3T9lW6nqH65Dbvq7MZuHJDqdhy27xnFljLDPY3g940YxeVj1TPmVklJDsRwgK+tHwIz2cWRThZxTi4yo2GPfwqHTel51gh1z1iE22ylpPL3wPjnjvC8mVo7FNRh2Z1pW5rm76ZcX0dctM5bqmmgjtAHFH4g/fPRzQksesDnhJOdssPpVl06Wm6ePBEa6jFmUHG2QhtTah3E5z8PdvZvo0z610M+jbU8WNHGnLBLy3JkseqKQN0p3+eTzMDb3QwZOqZavSHV+vafmJSOcmiX60j58R3/AJb5ycTJrM1zRuJk+lK9VpcVVf1U04+FOfEJQOpz1+RPWDZx41cjd+xRIkBsHizGTsE/IDPA7Z6Jk/pH1LAuvZ8auQ8k1a3EuF5PHf7Z63DwuCtnFnnsex6MNTQI0eJp19D5sZs1Sm1JTu31+Z/DMubhblui+HIkqPKe1NJqNX2ct55+ZWxpbrbkYL3AbI26DNFgU8X/AEh5HGYz6RNS1985WirjOFcRCg4+4jite/wy/FwvEnsyuWe/o0XRsBxihpYEsFuQpBdUg96ATnm8iSlkdHTiVRKV6TdSQLBhikhIeEqnmudqpxOyD026Z28LBKL2ZjnmmqOfRrqSvr2XaWah4yreYgMltO6Bv065PMwuT2XwME0lRctWaghaaYXEWh1dnaRXjGKBugK7up/HOPj4Xkl18G2WajGih+jKdVMzX41pEMyxuHUMxuTQcbR4nfO/lxlr+rOfC1fYelCbUvzGodZD9Un1C1sSuLQbbcHhtjhqdW2Rm1vosPo91JEnQq/TEpLqrWOhxLbm37Mtju65zcvA4y2RthyX+rJGooKG+02+G+YY5F5Iz6YNnVjxzrRkxyvc4OA93UZEgjQ9NT9i2CrOTIjaLKz6WKQty2tRRW+UK0SESCkdG3/H7538DLa1ZzciFO0Z9nonMejUWCorgQpfGO8QFHf9zxzzPyHB88bXs9v8T+U/80ql6NLqdKSLFtqWq5irrnAFdow56wrb7Z80+FOLqR9PP83i1uCLWxCRBjCuqo6kNd63VDdbivmc7MWOMEfO8rly5ErkMqLNYW1SVB+ymrCI0RJ3deX9vlnRra/4cd0zu9lJQlAXxLyAnkUjYb5EY/RLZFcXWWkVqLbw25zEdfaIQtW3FX4ZZOcHaKtJkX2DpT/l9j/qH9c0/wDRl+yvjgONVmmopDsfT8QOJ6grHabH8ch5cj+SdIDNhdAuICFBKUEbJT0AyFBv2LokqdrLVlDFvAZsEIHulwe+j7HEXOH8ktKXsZYo9LQ1iTHoWe2Qd0lxwvJB+yjlpZ8r6sr44ImMXDannEL4llSS2Udw45m4v2XshGh0p1J0+xuf+8P65p58n2U8cBfYOlP+X2P+of1x/wCjL9jxwHoVdp2A+1OgUzMabGJLboWSUn8T45EsuSSpslQiht2l0u6tbztCwt55RWtXaHqrzyVmyR6TIcIsfj+yqll1ungtwESVAuBCieR/HKSc5/0WSjH0cToNDbqal29WibMQgN9r2hQSnx2OTHJPH6ZDjGXsdksUkqNGq5da3IrqvZMZlSzs0PvvkRnKL2TJcYsiJotLJIWnT7AUg7g9oeh88v5sr+SPHH6JE+Dp+xe9csahmXLKEt9opZB4ju7jlY5MkVUWHGL+BqPU6ajOtSotGyzKjKC21hZJSvzyZZsrVNhQivgmosEurkIkM9rFlpLbiSPdWk9+Zeuy3T6IsOvoapxc6rqUQpvBSA72hVsk/c5pLLOapsqoqPaFgXCUvrJIIUco4NFrsZVR6WUpS1afYUpZJJ7Q9T55qs+VdWVcIMciVWnIjzUyFRtMzIqubbiVklCvPIlmnJU2THHFdjqoNEX5E9VIy5Oncg+4vdXaA9+4OQss6qw4q7IzNPpmE567FomUSknkkrWXEoPgCct5sklTZHjinY9HugZRWVbjMnAspHD9LpqQ67JfoGnX5CitxfMjkrzzRZprqyukX7QjNNpmO43IYomWpEZQcbVzO6VD8cPNkaqwscV6RIsG6a3LLtvWtz3ooUhtS1kcU/gcrCc4fyyWlIYjVWmorrUuJRssyoqubbgWSUq88s82SS7ZChFCyqrTUt52ZLpGX5clXNxwrIK1eeI5skekw4RbtixIOn65z12tqGoc1pJSh1KySPM5EsmSXTYUYp2jw7+xDvPYjrlscSJMoktXJ1Z+edaMWNtq4qBwwWKom8Cj3tu7MpxNEy7xX4tlEdq7FtMmFLRxWk948RnP3CVo06aozLVmjJ1K4t9lCrGkWd25bad+I+SwO7PWwcuM+mcU8TRWPyzrVfBj2Tqy6sqxXOss3oJJ3KUL9w/gemZSwQl7LxnKPoscPV+sbJaIVfOfkvudP2LA328TtnNLBgj2zVZJsu1BTOU4Xb3s5VrqeUgjm4vmIqfknxzgy5VJ1H0dEINds868sisr9/8APIhAmTPATdLa3RyPnmuiaKWdf4gX9Rx4ydjhd8sjYKOPGRsRHLNaiCVHLakWSGLpTfTkch4xsx9d+pQI5nIWMnYjt3KkqKtz1ydBsP8A+IF/UcjxjYT/ABAr6jjxjYDfq2/eOPGNg/xAr6jjxjY5cvVLGxUcaDYcRfqSAOR6Y0G4hv1bkhR648aobCf4gX9Rx40xsds3bjig2lR5K8cPGNi2UTIfKC87y3+ec8+jWJM1DqOuoHURp9NOdaUE8JbTY7BxXyBJy2LA8q6ZE8ij7JER+PcQVTmayVWtkgNolN8FOp+Y8MzlFwlRMXZxFoOQ5lPHkd+vTDm2KGplQtkpVyIRv12ONhRKlOx6muNk7AkWTaDstEVHNaE/M+HTEFu6DairPGZ1zUvsvS2dOWrsKKf20hDIUhr7nfN3xJJ9sz8yfZ6Mb1G8iN2NQ4XYrqyhSSnittXyIzGcHB0zRNSVklNAEcFcRunbf4nIcmSkhjUF3X6f9UROqpclmUPdksoBaCvluT35bFheT0VnNR6ZLdrESwzIYSpLMhtDo36EAj45S6dMt17GHaFSUEp3HX4HG1E0dpoTx6nqR8TjZkUePZ1z8flwWtO2aRab7Kv0VqZYyGeSVkkdc2UV8FG2jx5FiXN9yc0USlkBR3JPzy5AmASIz5QR72VaJTLDW2ZRx9/bbxzGUS6Zb6y9SU9k6UutqGxQsckn8MxcWjSzmVp3S1gS6/TNx3V9SqMrsNz+GWjnyx+SrxQY0zpLScchYqjII67PPFxPkcs+Tll8kLFBE4z4Fe0WKyFHr2h/Cw2G9/LMnvL2XpIrdpclzl7+aRhRSUmVebMKyfe783SKNnmqO5JOaFRMAMAMAMAMAMAMAMAMAMAMAMAMAMAfhAl5AB2OVZKND06w6ez4rO3TOTIbRRA9L0pj1GprjLQuyjSu1cjhW7iEEHqc6ODF22zLkfBPm6xhVunKx2snQ7G4jx4rJiLXuU9Ou4yngc8rv0W8lRR519bNWNpDgriqS8YLTznrdkqFCBKd/cA++aY8eq9lJSs49GlopyZdU82x7RhQ3hR3X+2HPf8AgJ8McvHFJOIwy/amXC4eag01wubJRFbkRnmGuatubhB2Azkwq5qjefoyrTvZGjvG3dYqoyrurQfdm9D3jPUy9ZF1Zxx9PssmnLCwY0TbOVVYYUyE8EokNpPN5J23UPHOfLGLzKzWLageXJegs0UG4r9UzXNbOup7RpMpSnCrfqCjyy+r3aa6Iv8AW/k9f0izVOad0w1YupZvHltSZEc9Fjp37Znxo/5JV6LZH0rJGr5Ifg6QXD1C0zGkM8fU1PFiPLUAAeSx3bZGFLZ2hN3E50XPSxdTYchh4yDCWsCLPM+KhIG/Qn49MnPBapoY5Ffnz0TodvaR0riux3yltyVbqM9J8Eb+Oawgk0mUky6aQmm209FU/MTPs4gKJBUrk6kfDlnHyIqGTo3xPaPZXdQxOJcJTttl8b7KyVFQV0Kh8jnQZiYAYAYA428pG2xyKFk5izU2R7xGVcS1nos36kgAr7szeMlSO3NQkjos48RO5AfuFr/i78uoFdiA7KWvfr35dKiLGCSepO+CBMkBgBgBgBgBgBgBgBgBgBgBgBgBgBgD0NXF1JyGgi80Vn2XD3ttts5ZwNossjsuskkPzKuHMkKSAXXmA4sj7nMk5LpFun7OeVL/ACGv/pU/pk7TGsTtyXWyOJlVcOUY4CWy4wF8E/IbjIWyHQiZNWyr1iPUw48pHVLzccIWD99sm5/ISS7OW7OLJbWzNjMzWefMNvNhxO/2ORTXaJuwC6UdRQ14I/8ACp/TJ2n9kVFB7bbQ6hppKGo6RxDSE8UAfbI1l7JTS6F7apbV601SwW5XeHUxkhQV5ZNz+yKidOTa+WEOTq6LOeSOIW8yHFAfjkftH0Gov2CpNWtDTDlTDcjxt+xaVHBQ0D37DbC2XZPRymbXwv8Ah1fFgFw++WGg2VffbJez9kdIC9UKUp5dLBW89++sxkkq+/TFzS9ikcuT4UVlxMCFHgh79/sGg1z++2KcvbHr0Uy9m9rz94HfN8caZnJ2VNXUk/M50GYmAGAGAGAGAGAGAGAGAGAGAGAGAGAGAGAGAGAGAGAGAGAGAGAGAKklJBHwwCYzPU3tt8Mq4k2ShduAAdemU0J2F9uOeONBsILtwb9T1xoNgN24QR1xoNhEXLid9t+uNBsde3HPHGg2Gva7hVyJOToNh1V2sjjuceMbCJu3AAOuRoNhRdufM40Gwjl04rbv6Y0GwvttzYD3umNBscuXLihsd8nQbEJ6Wpzff45ZRIsjZYgMAMAMAMAMAMAMAMAMAMAMAMAMAMAT54AuAGAGAGAGAGAAwAOAGAGAGAGSAwAwAwAwAwAwAwAwAwAwAwAwAwAyAGAGAf/Z"
        
        if (img.src) {         
          doc.addImage(img, /* 'PNG', */ data.settings.margin.right+200, 10, 70, 20);
        }

        doc.autoTable({
          styles: { overflow: 'hidden', cellWidth: ['wrap'] },
          columnStyles: { '3': { font: 'bold' } }, // Cells in first column centered and green
          margin: { right: 240 },
          body: [        
            [ this.seguridad.usuario ],
            [this.seguridad.apellido_paterno+ ' '+ this.seguridad.apellido_materno+', '+this.seguridad.nombre  ],
            [ dayjs().format('DD/MM/YYYY hh:mm:ss a')],
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






