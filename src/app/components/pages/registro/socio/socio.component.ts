import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../../../services/core/registro/persona.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Persona } from '../../../../interfaces/core/registro/persona.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-socio',
  templateUrl: './socio.component.html',
  styles: [
  ]
})
export class SocioComponent implements OnInit {

  public persona: Persona[] = [];
  public cargando: boolean = false;
  public form: FormGroup;
  public formSubmitted = false;
  public personaSeleccionada: Persona;

  constructor(private service: PersonaService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( ({id}) => {
      this.carga(id)
    })

    this.form = this.formBuilder.group({
      documento_identidad: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      apellido_paterno: ['', [Validators.required, Validators.maxLength(50)]],
      apellido_materno: ['', [Validators.required, Validators.maxLength(50)]],
      fecha_nacimiento: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      es_masculino: [true, Validators.required],
      numero_telefono: ['', [Validators.maxLength(15)]],
      numero_celular: ['', [Validators.maxLength(15)]],
      correo_electronico: ['', [Validators.email, Validators.maxLength(150)]],
      domicilio: ['', [Validators.required, Validators.maxLength(200)]],
      referencia_domicilio: ['', [Validators.required, Validators.maxLength(200)]],
      //avatar: [''],
      comentario: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  guardar() {
    if ( this.personaSeleccionada){
      const data = {
        ...this.form.value,
        id: this.personaSeleccionada.id
      }
      console.log(data);
      this.service.actualizar(data)
          .subscribe(resp => {
            console.log("Estas aquiiiiiiiiiiiiiiiiiiiiii:", resp);
            Swal.fire({
              text: 'La información se actualizó satisfactoriamente.', icon: 'success'
            });
          })

    } else {
      this.formSubmitted = true;
      if (!this.form.valid) {
        Swal.fire({
          text: "Validar la información proporcionada.", icon: 'warning'
        });
        return;
      }
      
      this.service.crear(this.form.value)
        .subscribe(res => {  
          // console.log(res);
          Swal.fire({
            text: 'La información se guardó satisfactoriamente.', icon: 'success'
          });  
          this.cancelar();          
        });

    }

  } 

  cancelar() {    
    
    this.formSubmitted=false;
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

  carga(id: String){

    this.service.obtenerPersona(id)
      .subscribe( persona => {
        const {          
          documento_identidad, 
          nombre, 
          apellido_materno, 
          apellido_paterno,
          fecha_nacimiento,
          es_masculino,
          numero_telefono,
          numero_celular,
          correo_electronico,
          domicilio,
          referencia_domicilio,
          comentario               
          } = persona
        this.personaSeleccionada = persona
        this.form.setValue({
          documento_identidad, 
          nombre, 
          apellido_materno, 
          apellido_paterno,
          fecha_nacimiento,
          es_masculino,
          numero_telefono,
          numero_celular,
          correo_electronico,
          domicilio,
          referencia_domicilio,
          comentario        
        } )
      })

  }



}
