import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AnalistaService } from '../../../../../services/core/registro/analista.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../../../../services/core/registro/usuario.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: [
  ]
})
export class FormComponent implements OnInit {

  public button: string = "Guardar";
  public analistas: [] = [];
  public cargando: boolean = false;
  public form: FormGroup;
  public formSubmitted = false;
  public _id: string;

  constructor(private analistaService: AnalistaService, private usuarioService: UsuarioService,
    private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private router: Router) {

  }
  ngOnInit(): void {

    this.usuarioService.listarxrol("Analista").subscribe(res => {
      this.analistas = res['usuarios'];
    })

    this.form = this.formBuilder.group({
      descripcion: ['', [Validators.required]],
      producto: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      comentario: ['', [Validators.required]]
    });
    this.activatedRoute.params.subscribe(({ id }) => {
      this._id = id;
      this.cargarAnalista(id);
    });
  }

  cargarAnalista(id: string) {
    if (id != 'nuevo') {
      this.button = "Editar";
      this.analistaService.getAnalista(id).subscribe(res => {
        const analista = res['analista'];
        const data = {
          descripcion: analista['descripcion'],
          producto: analista['producto'],
          usuario: analista['usuario'],
          comentario: ''
        }
        this.form.setValue(data);
      })
    }
  }

  guardar() {
    this.formSubmitted = true;
    if (this._id == 'nuevo') {
      if (!this.form.valid) {
        Swal.fire({
          text: "Validar la información proporcionada.", icon: 'warning'
        });
        return;
      }
      this.analistaService.crear(this.form.value).subscribe(res => {
        this.formSubmitted = false;
        if (res['ok']) {
          Swal.fire({
            text: res['msg'], icon: 'success'
          });
          this.router.navigateByUrl('seguridad/gestion/analista');
        } else {
          Swal.fire({
            text: res['msg'], icon: 'error'
          });
        }
      })
    } else {
      if (!this.form.valid) {
        Swal.fire({
          text: "Validar la información proporcionada.", icon: 'warning'
        });
        return;
      }
      this.analistaService.editar(this._id, this.form.value).subscribe(res => {
        this.formSubmitted = false;
        if (res['ok']) {
          Swal.fire({
            text: res['msg'], icon: 'success'
          });
          this.router.navigateByUrl('seguridad/gestion/analista');
        } else {
          Swal.fire({
            text: res['msg'], icon: 'error'
          });
        }
      })
    }


  }

  cancelar() {
    this.router.navigateByUrl('seguridad/gestion/analista');
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
