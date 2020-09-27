import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { Seguridad } from 'src/app/models/auth/seguridad.model';
import { Usuario } from './../../../../interfaces/core/registro/usuario.interface';
import { CierreCajaIndividual } from './../../../../interfaces/core/registro/cierre-caja.interface';

import { SeguridadService } from './../../../../services/auth/seguridad.service';
import { CierreCajaIndividualService } from './../../../../services/core/caja/cierre-caja-individual.service';
import { UsuarioService } from 'src/app/services/core/registro/usuario.service';

@Component({
  selector: 'app-cierre-caja-individual',
  templateUrl: './cierre-caja-individual.component.html',
  styles: [
  ]
})

export class CierreCajaIndividualComponent {

  public cargando: boolean = false;
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
    private seguridadService: SeguridadService
    ) { }
    
    
    
    ngOnInit(): void {
      
    /* this.activatedRoute.params.subscribe( ({id}) => {
      this.carga(id)
    }) */


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
    
    /* this.form.controls['cajero'].setValue(this.seguridad.id);
    console.log(this.seguridad.id);
    this.form.controls['cajero'].disable(); */

    this.cargarCajaDiario();
    
  };
  cargarCajaDiario(){
    this.cierreCajaIndividualService.getOperacionesCajaInd(this.seguridad.id)
        .subscribe(res=>{
          
          this.cajaID= res["idCaja"]
          
          this.form.controls['fecha_apertura'].setValue(res['fecha_apertura']);
          
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
        
        // id : "5f6e80d45ae4c62cf40c6972",
        //cajero: this.seguridad.id,
        id: this.cajaID,
        fecha_apertura: this.form.controls['fecha_apertura'].value,
        cantidad_doscientos_soles_cierre: this.form.controls['cantidad_doscientos_soles_cierre'].value,
        cantidad_cien_soles_cierre: this.form.controls['cantidad_cien_soles_cierre'].value,
        cantidad_cincuenta_soles_cierre: this.form.controls['cantidad_cincuenta_soles_cierre'].value,
        cantidad_veinte_soles_cierre: this.form.controls['cantidad_veinte_soles_cierre'].value,
        cantidad_diez_soles_cierre: this.form.controls['cantidad_diez_soles_cierre'].value,
        cantidad_cinco_soles_cierre: this.form.controls['cantidad_cinco_soles_cierre'].value,
        cantidad_dos_soles_cierre: this.form.controls['cantidad_dos_soles_cierre'].value,
        cantidad_un_sol_cierre: this.form.controls['cantidad_un_sol_cierre'].value,
        cantidad_cincuenta_centimos_cierre: this.form.controls['cantidad_cincuenta_centimos_cierre'].value,
        cantidad_veinte_centimos_cierre: this.form.controls['cantidad_veinte_centimos_cierre'].value,
        cantidad_diez_centimos_cierre: this.form.controls['cantidad_diez_centimos_cierre'].value,
        comentario: this.form.controls['comentario'].value,
      }
      console.log(data)      
      this.cierreCajaIndividualService.getCierreCaja(data)
                                    .subscribe(resp => {
                                      Swal.fire({
                                        text: 'La informaciónse actualizó correctamente', icon: 'success'
                                      })
                                    })
  }

  cancelar() {

      

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
    console.log(charCode)
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

  activarBoton(){
    if (this.dif == 0){
      this.activarGuardado = false
    }
  }

}



 