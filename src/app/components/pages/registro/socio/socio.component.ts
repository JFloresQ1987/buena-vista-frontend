import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../../../../services/core/registro/persona.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-socio',
  templateUrl: './socio.component.html',
  styles: [
  ]
})
export class SocioComponent implements OnInit {

  public cargando: boolean = false;
  public form: FormGroup;

  constructor(private service: PersonaService,
    private fb: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      documento_identidad: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido_paterno: ['', Validators.required],
      apellido_materno: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      es_masculino: [true, Validators.required],
      numero_telefono: ['', Validators.required],
      numero_celular: ['', Validators.required],
      correo_electronico: ['', Validators.required],
      domicilio: ['', Validators.required],
      referencia_domicilio: ['', Validators.required],
      // avatar: ['']
    })
  }

  guardar() {

    // console.log(this.form.value);
    
    this.service.crear(this.form.value)
      .subscribe(res => {

        console.log(res);
        Swal.fire({
          text: 'Socio creado satisfactoriamente.', icon: 'success'
        });
        
      });
  }

}
