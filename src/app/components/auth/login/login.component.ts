import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { SeguridadService } from '../../../services/auth/seguridad.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;

  public form = this.formBuilder.group({
    usuario: [localStorage.getItem('usuario') || '', Validators.required],
    clave: ['', Validators.required],
    recordar: [false]
  });

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private service: SeguridadService) { }

  ngOnInit(): void {
  }

  login() {

    if(!this.form.valid)
      return;
    
    // this.router.navigateByUrl('');
    this.service.login(this.form.value)
      .subscribe((res: any) => {
        // console.log(res);
        // Swal.fire( '',  );
        // Swal.fire('Error', res.token, 'error');

        if (this.form.get('recordar').value)
          localStorage.setItem('usuario', this.form.get('usuario').value);
        else
          localStorage.removeItem('usuario');

        this.router.navigateByUrl('/dashboard');

      }, (err) => {
        // console.log(err.error.msg);
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

}
