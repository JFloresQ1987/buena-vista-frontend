import { Component, OnInit } from '@angular/core';

import { PersonaService } from '../../../../services/core/registro/persona.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Persona } from '../../../../interfaces/core/registro/persona.interface';
import { ActivatedRoute } from '@angular/router';
import { SesionSocioService } from '../../../../services/shared/sesion-socio.service';
import { Socio } from '../../../../models/core/socio.model';
import { UbigeoService } from '../../../../services/core/ubigeo.service';
import { Seguridad } from '../../../../models/auth/seguridad.model';
import { SeguridadService } from '../../../../services/auth/seguridad.service';

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
  public sesionSocio: Socio

  public departamentos: [] = [];
  public provincias: [] = [];
  public distritos: [] = [];
  private seguridad: Seguridad;

  public buttonName = true;


  constructor(private service: PersonaService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private ubigeoService : UbigeoService,
    private sesionSocioService: SesionSocioService,
    private seguridadService: SeguridadService) {
      this.sesionSocio = this.sesionSocioService.sesionSocio;
    }

  ngOnInit(): void {
    this.seguridad = this.seguridadService.seguridad;
    console.log(this.seguridad.id);

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
      departamento: ['', []],
      provincia: ['', []],
      distrito: ['', []],
      //avatar: [''],
      comentario: ['', [Validators.required, Validators.maxLength(200)]]
    });

    this.form.controls['departamento'].valueChanges.subscribe(departamento =>{
      this.ubigeoService.listarProvinciasxDepartamento(departamento).subscribe(res=>{
        //this.form.controls['provincia'].setValue("");
        this.provincias = res['provincias'];
        //this.form.controls['distrito'].setValue("");
        this.distritos = [];
      })
    });

    this.form.controls['provincia'].valueChanges.subscribe(provincia =>{
      const departamento = this.form.controls['departamento'].value;
      //this.form.controls['distrito'].setValue("");
      this.ubigeoService.listarDistritosxProvincia(departamento, provincia).subscribe(res=>{
        this.distritos = res['distritos'];
      })
    })

    this.cargarDepartamentos();
    
  }
  
  cargarDepartamentos() {
    this.ubigeoService.listarDepartamentos().subscribe(res => {
      this.departamentos = res['departamentos'];
    })
  }

  guardar() {
    if ( this.personaSeleccionada){
      const data = {
        ...this.form.value,
        id: this.personaSeleccionada.id        
      }
      this.service.actualizar(data)
          .subscribe(resp => {
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

    let id_persona = localStorage.getItem('socio')? localStorage.getItem('socio') : '0'

    if(id_persona === '0'){
      this.formSubmitted=false
      // this.form.reset()
    } else {
      this.service.obtenerPersona(id_persona)
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
            ubigeo,
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
            departamento: ubigeo.departamento,
            provincia : ubigeo.provincia,
            distrito: ubigeo.distrito,
            comentario:''    
          })
          this.form.disable();
        })
    }
    
  }

  editar(){
    this.form.enable();
  }

  cambiarFuncion(){
    if (this.buttonName === false){
      if ( this.personaSeleccionada){
        const data = {
          ...this.form.value,
          id: this.personaSeleccionada.id
        }
        console.log(data);
        this.service.actualizar(data)
            .subscribe(resp => {
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
      this.form.disable();
    } else {
      this.form.enable();
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

  carga(id: String){
    let id_persona = localStorage.getItem('socio')? localStorage.getItem('socio') : '0'

    if(id_persona === '0'){
      return
    } else {
      this.service.obtenerPersona(id_persona)
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
            ubigeo,
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
            departamento: ubigeo.departamento,
            provincia : ubigeo.provincia,
            distrito: ubigeo.distrito,
            comentario:''    
          })
          this.form.disable();
        })
    }


  }



}
