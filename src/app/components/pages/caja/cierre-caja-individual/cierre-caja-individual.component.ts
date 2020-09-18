import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { UsuarioService } from 'src/app/services/core/registro/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

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
 
  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute, 
    private router: Router
  ) { }

  ngOnInit(): void {

    this.cargarCajeros()

    this.form = this.formBuilder.group({      
      cajero : ['', [Validators.required]],
      fecha_apertura : ['', [Validators.required]],
      cantidad_doscientos_soles_cierre : ['', [Validators.required]],
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
    
  }

  cargarCajeros() {
    this.usuarioService.listarxrol("Cajero").subscribe(res=>{
      this.usuarios = res['usuarios'];      
    })
  }

  guardar() {
    this.formSubmitted = true;
      if (!this.form.valid) {
        Swal.fire({
          text: "Validar la información proporcionada.", icon: 'warning'
        });
        return;
      }
    console.log(this.formSubmitted);
  }

  cancelar() {

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

  get monto_doscientos(){
    if (this.cantidad_doscientos <= 0){
      this.cantidad_doscientos = 0
    }
    return this.cantidad_doscientos * 200    
  }
  
  get monto_cien(){
    if (this.cantidad_cien <= 0){
      this.cantidad_cien = 0
    }
    return this.cantidad_cien * 100    
  }

  get monto_cincuenta(){
    if (this.cantidad_cincuenta <= 0){
      this.cantidad_cincuenta = 0
    }
    return this.cantidad_cincuenta * 50     
  }

  get monto_veinte(){
    if (this.cantidad_veinte <= 0){
      this.cantidad_veinte = 0
    }
    return this.cantidad_veinte * 20     
  }

  get monto_diez(){
    if (this.cantidad_diez <= 0){
      this.cantidad_diez = 0
    }
    return this.cantidad_diez * 10     
  }

  get monto_cinco(){
    if (this.cantidad_cinco <= 0){
      this.cantidad_cinco = 0
    }
    return this.cantidad_cinco * 5     
  }

  get monto_dos(){
    if (this.cantidad_dos <= 0){
      this.cantidad_dos = 0
    }
    return this.cantidad_dos * 2     
  }

  get monto_uno(){
    if (this.cantidad_uno <= 0){
      this.cantidad_uno = 0
    }
    return this.cantidad_uno     
  }

  get monto_cincuenta_cent(){
    if (this.cantidad_cincuenta_cent <= 0){
      this.cantidad_cincuenta_cent = 0
    }
    return this.cantidad_cincuenta_cent / 2   
  }

  get monto_veinte_cent(){
    if (this.cantidad_veint_cent <= 0){
      this.cantidad_veint_cent = 0
    }
    return this.cantidad_veint_cent / 5   
  }

  get monto_diez_cent(){
    if (this.cantidad_diez_cent <= 0){
      this.cantidad_diez_cent = 0
    }
    return this.cantidad_diez_cent / 10    
  }

  get monto_total(){
    return this.monto_doscientos + this.monto_cien +this.monto_cincuenta+ this.monto_veinte + 
            this.monto_diez + this.monto_cinco + this.monto_dos + this.monto_uno +  
            this.monto_cincuenta_cent + this.monto_veinte_cent + this.monto_diez_cent
  }


}



  /* cantidad_doscientos : number = 0
  
  cantidad_cincuenta : number = 0
  cantidad_veinte : number = 0
  cantidad_diez : number = 0
  cantidad_cinco : number = 0
  
  
  cantidad_cin_cent : number = 0
  cantidad_veint_cent : number = 0
  cantidad_diez_cent : number = 0 */