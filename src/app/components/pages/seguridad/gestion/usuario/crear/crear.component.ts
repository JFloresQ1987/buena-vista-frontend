import { Component, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../../../../../services/core/registro/usuario.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { UbigeoService } from '../../../../../../services/core/ubigeo.service';
import { Usuario } from 'src/app/interfaces/core/registro/usuario.interface';
import { ProductoService } from '../../../../../../services/core/configuracion/producto.service';

declare const $: any;

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styles: [
  ]
})

export class CrearComponent {
  public cargando: boolean = false;
  public form: FormGroup;
  public formSubmitted = false;
  public _id: string;
  public departamentos: [] = [];
  public provincias: [] = [];
  public distritos: [] = [];
  public productos: [] = [];

  constructor(private service: UsuarioService,
    private formBuilder: FormBuilder,
    private el: ElementRef,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ubigeoService: UbigeoService) {
  }

  ngOnInit(): void {
    // $(this.el.nativeElement.querySelector('#roles')).multiSelect();
    $("#roles").select2();
    this.form = this.formBuilder.group({
      documento_identidad: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      apellido_paterno: ['', [Validators.required, Validators.maxLength(50)]],
      apellido_materno: ['', [Validators.required, Validators.maxLength(50)]],
      rol: ['', [Validators.required]],
      local_atencion: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      es_masculino: [true, Validators.required],
      numero_telefono: ['', [Validators.maxLength(15)]],
      numero_celular: ['', [Validators.maxLength(15)]],
      correo_electronico: ['', [Validators.email, Validators.maxLength(150)]],
      departamento: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      distrito: ['', [Validators.required]],
      domicilio: ['', [Validators.required, Validators.maxLength(200)]],
      referencia_domicilio: ['', [Validators.required, Validators.maxLength(200)]],
      // avatar: [''],
      comentario: ['', [Validators.required, Validators.maxLength(200)]]
    });
    this.activatedRoute.params.subscribe(({ id }) => {
      this._id = id;
      this.cargarUsuario(id);
    });

    this.form.controls['departamento'].valueChanges.subscribe(departamento => {
      this.ubigeoService.listarProvinciasxDepartamento(departamento).subscribe(res => {
        //this.form.controls['provincia'].setValue("");
        this.provincias = res['provincias'];
        //this.form.controls['distrito'].setValue("");
        this.distritos = [];
      })
    });

    this.form.controls['provincia'].valueChanges.subscribe(provincia => {
      const departamento = this.form.controls['departamento'].value;
      //this.form.controls['distrito'].setValue("");
      this.ubigeoService.listarDistritosxProvincia(departamento, provincia).subscribe(res => {
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

  cargarUsuario(id) {
    if (id != 'nuevo') {
      this.service.getUsuario(id).subscribe(res => {
        const usuario = res['usuario'];
        const { persona, local_atencion, rol, persona: { comentario } } = usuario;
        //this.roles = rol;
        const data = {
          ...persona,
          departamento: (persona.ubigeo.departamento == undefined) ? "" : persona.ubigeo.departamento,
          provincia: (persona.ubigeo.provincia == undefined) ? "" : persona.ubigeo.provincia,
          distrito: (persona.ubigeo.distrito == undefined) ? "" : persona.ubigeo.distrito,
          rol: rol,
          local_atencion: local_atencion,
          comentario: ''
        }
        delete data['_id'];
        delete data['ubigeo'];
        const roles = [];
        rol.forEach(r => {
          if (r == 'Administrador') {
            roles.push("0: 'Administrador'")
          } else if (r == 'Cajero') {
            roles.push("1: 'Cajero'")
          } else {
            roles.push("2: 'Analista'")
          }
        });
        // $(this.el.nativeElement.querySelector('#roles')).multiSelect('select', roles);
        $("#roles").val(roles).trigger('change');
        this.form.patchValue(data);
        this.form.controls['provincia'].setValue(data.provincia);
        this.form.controls['distrito'].setValue(data.distrito);
      });
    }
    // else {
    //   return;
    // }
  }

  guardar() {
    this.formSubmitted = true;

    let r = $(this.el.nativeElement.querySelector('#roles')).val();

    console.log(this.form.get('rol').value)
    console.log(r);

    for (let index = 0; index < r.length; index++) {
      r[index] = r[index].split("'")[1];
    }

    this.form.controls['rol'].setValue(r);

    if (!this.form.valid) {
      Swal.fire({
        text: "Validar la información proporcionada.", icon: 'warning'
      });
      return;
    }

    if (this._id != 'nuevo') {
      // let r = $(this.el.nativeElement.querySelector('#roles')).val();
      // for (let index = 0; index < r.length; index++) {
      //   r[index] = r[index].split("'")[1];
      // }
      // this.form.controls['rol'].setValue(r)
      // if (!this.form.valid) {
      //   Swal.fire({
      //     text: "Validar la información proporcionada.", icon: 'warning'
      //   });
      //   return;
      // }
      this.service.editar(this._id, this.form.value)
        .subscribe(res => {
          this.formSubmitted = false;
          if (res['ok']) {
            Swal.fire({
              text: res['msg'], icon: 'success'
            });
            this.cancelar();
            this.router.navigateByUrl('seguridad/gestion/usuario');
          } else {
            Swal.fire({
              text: res['msg'], icon: 'error'
            });
          }

        });
    } else {
      // let r = $(this.el.nativeElement.querySelector('#roles')).val();

      // for (let index = 0; index < r.length; index++) {
      //   r[index] = r[index].split("'")[1];
      // }

      // this.form.controls['rol'].setValue(r);
      // if (!this.form.valid) {
      //   Swal.fire({
      //     text: "Validar la información proporcionada.", icon: 'warning'
      //   });
      //   return;
      // }

      const data: Usuario = this.form.value;

      data.ubigeo = {
        departamento: this.form.get('departamento').value,
        provincia: this.form.get('provincia').value,
        distrito: this.form.get('distrito').value
      };

      // const data = {
      //   ...this.form.value,
      //   ubigeo:{
      //     departamento:this.form.controls['departamento'],
      //     provincia:this.form.controls['provincia'],
      //     distrito:this.form.controls['distrito']
      //   }
      // }

      // this.service.crear(this.form.value)
      this.service.crear(data)
        .subscribe(res => {

          if (res['ok']) {
            Swal.fire({
              text: 'La información se guardó satisfactoriamente.', icon: 'success'
            });
            this.cancelar();
            this.router.navigateByUrl('seguridad/gestion/usuario');
          } else {
            Swal.fire({
              text: res['msg'], icon: 'error'
            });
          }

        });
    }

  }

  cancelar() {

    this.router.navigateByUrl('seguridad/gestion/usuario')

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

}
