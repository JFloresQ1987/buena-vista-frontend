import { Component, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Caja } from '../../../../../../interfaces/core/registro/caja.interface';
import { Usuario } from '../../../../../../interfaces/core/registro/usuario.interface';

import { CajaService } from '../../../../../../services/core/registro/caja.service';
import { UsuarioService } from '../../../../../../services/core/registro/usuario.service';


@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styles: [
  ]
})

export class CrearCajaComponent {
  public cargando: boolean = false;
  public form: FormGroup;
  public formSubmitted = false;

  public usuarios: any = [];
  public cajaSeleccionada: Caja

  constructor(
    private service: CajaService,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ id }) => {
      this.carga(id)
    })

    this.cargarUsuarios()

    this.form = this.formBuilder.group({
      descripcion: ['', [Validators.required, Validators.maxLength(200)]],
      ip: ['', [Validators.required, Validators.maxLength(15)]],
      pc_nombre: ['', [Validators.required, Validators.maxLength(50)]],
      codigo: ['', [Validators.required, Validators.maxLength(50)]],
      usuario: ['', [Validators.required, Validators.maxLength(50)]],
      comentario: ['', [Validators.required, Validators.maxLength(200)]],
      serie: ['', [Validators.required, Validators.maxLength(10)]],
      es_caja_principal: [false, [Validators.required]],
      local_atencion: ['', [Validators.required]],
    });

  }

  cargarUsuarios() {
    this.usuarioService.listarxrol("Cajero").subscribe(res => {
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

    const id_usuario = this.form.get('usuario').value;
    const usuario = this.usuarios.find(item => item.id === id_usuario);

    const data: Caja = this.form.value;

    data.nombre_usuario = usuario.persona.apellido_paterno + ' ' + usuario.persona.apellido_materno + ', ' + usuario.persona.nombre;
    data.documento_identidad_usuario = usuario.persona.documento_identidad;

    if (this.cajaSeleccionada) {

      // const data:Caja = {
      //   ...this.form.value,
      //   id: this.cajaSeleccionada.id
      // }

      data.id = this.cajaSeleccionada.id;

      this.service.actualizar(data)
        .subscribe(resp => {
          Swal.fire({
            text: 'La información se actualizó satisfactoriamente.', icon: 'success'
          });
          this.router.navigateByUrl('seguridad/gestion/caja');
        })

    } else {
      this.formSubmitted = true;
      // if (!this.form.valid) {
      //   Swal.fire({
      //     text: "Validar la información proporcionada.", icon: 'warning'
      //   });
      //   return;
      // }

      // const data = this.form.value;

      // this.service.crear(this.form.value)
      this.service.crear(data)
        .subscribe(res => {
          Swal.fire({
            text: 'La información se guardó satisfactoriamente.', icon: 'success'
          });

          this.cancelar();
        });

    }

  }

  carga(id: String) {
    if (id != 'nuevo') {
      this.service.obtenerCaja(id)
        .subscribe(caja => {
          const {
            codigo,
            descripcion,
            ip,
            pc_nombre,
            usuario,
            serie,
            es_caja_principal,
            local_atencion,
            comentario
          } = caja
          this.cajaSeleccionada = caja
          this.form.setValue({
            codigo,
            descripcion,
            ip,
            pc_nombre,
            usuario,
            serie,
            es_caja_principal,
            local_atencion,
            comentario: ''
          })
        })
    }


  }

  cancelar() {

    this.formSubmitted = false;
    this.form.reset();
    this.router.navigateByUrl('/seguridad/gestion/caja');
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

  validarNumero(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode
    if (charCode >= 48 && charCode <= 57) {
      return true
    }

    return false
  }
}
