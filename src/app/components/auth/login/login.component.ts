import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SeguridadService } from '../../../services/auth/seguridad.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public formSubmitted = false;

  public form = this.formBuilder.group({
    usuario: [localStorage.getItem('usuario') || '',
    [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    clave: ['', Validators.required],
    recordar: [false]
  });

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private service: SeguridadService) { }

  login() {
    this.formSubmitted = true;
    if (!this.form.valid)
      return;

    this.service.login(this.form.value)
      .subscribe((res: any) => {

        if (this.form.get('recordar').value)
          localStorage.setItem('usuario', this.form.get('usuario').value);
        else
          localStorage.removeItem('usuario');

        this.router.navigateByUrl('/dashboard');

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

  validarCampo(campo: string, validar: string): boolean {

    if (this.form.get(campo).hasError(validar) &&
      (this.formSubmitted || this.form.get(campo).touched))
      return true;
    else
      return false;
  }

}
