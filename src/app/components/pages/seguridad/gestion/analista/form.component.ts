import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AnalistaService } from '../../../../../services/core/registro/analista.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../../../../services/core/registro/usuario.service';
import { ProductoService } from '../../../../../services/core/configuracion/producto.service';
import { Analista } from '../../../../../interfaces/core/registro/analista.interface';
import { filter } from 'rxjs/operators';

declare const $: any;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public button: string = "Guardar";
  public analistas: any = [];
  public productos: [] = [];
  public cargando: boolean = false;
  public form: FormGroup;
  public formSubmitted = false;
  public _id: string;

  constructor(private analistaService: AnalistaService,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private el: ElementRef,) {

  }
  ngOnInit(): void {

    // $(this.el.nativeElement.querySelector('#productos')).multiSelect();
    // $(this.el.nativeElement.querySelector('#productos')).multiSelect();

    // $(this.el.nativeElement.querySelector('#select222')).select2();
    $("#productos_seleccionados").select2();
    // $(this.el.nativeElement.querySelector('.select2')).select2();

    // $(".select2").select2();

    this.usuarioService.listarxrol("Analista").subscribe(res => {
      this.analistas = res['usuarios'];
    })
    this.cargarProductos();

    this.form = this.formBuilder.group({
      codigo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      // producto: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      local_atencion: ['', [Validators.required]],
      comentario: ['', [Validators.required]],
      productos: ['', [Validators.required]],
    });
    this.activatedRoute.params.subscribe(({ id }) => {
      this._id = id;
      this.cargarAnalista(id);
    });

    // setTimeout(() => {
    //   // $(this.el.nativeElement.querySelector('#productos_seleccionados')).multiSelect();
    //   this.activatedRoute.params.subscribe(({ id }) => {
    //     this._id = id;
    //     this.cargarAnalista(id);
    //   });
    // }, 250);
  }

  cargarProductos() {
    this.productoService.listar(true, true).subscribe(res => this.productos = res);
  }

  cargarAnalista(id: string) {
    if (id != 'nuevo') {
      this.button = "Editar";
      this.analistaService.getAnalista(id).subscribe(res => {
        const analista = res['analista'];
        const data = {
          codigo: analista['codigo'],
          descripcion: analista['descripcion'],
          // producto: analista['producto'],
          productos: analista['productos'],
          local_atencion: analista['local_atencion'],
          usuario: analista['usuario'],
          comentario: ''
        }

        // const productos_registrados = [];

        // productos_registrados.push("1: '5f7a9df2dd1aaa4dc41091b6'")
        // productos_registrados.push("4: '5f51a53b7d16471c2833668b'")/////////////////////
        // productos_registrados.push("8: '5f51a4b77d16471c28336688'")

        // data.productos.forEach(item => {
        //   // if (r == 'Administrador') {
        //   // productos_registrados.push("0: 'Administrador'")
        //   // } else if (r == 'Cajero') {
        //   // productos_registrados.push("3: 'Cajero'")
        //   // } else {
        //   //   productos_registrados.push("2: 'Analista'")
        //   // }

        //   this.productos.forEach((p: any, index) => {
        //     if (p.id === item.producto)
        //       // productos_registrados.push(`${p.id}: ${p.codigo}`)
        //       productos_registrados.push(`${index}: '${p.id}'`)
        //     // productos_registrados.push(`${p.id}: '${p.descripcion}'`)
        //   });

        //   // console.log(item)
        // });

        // const productos_registrados = this.productos.map(({id,text},index)=>)

        // console.log(this.productos)
        // console.log(data.productos)

        // const productos_registrados = this.productos
        //   .filter(({ id }) =>
        //     data.productos.some(({ producto }) => producto == id))
        //   .map(({ id, text }) => 
        //   // (
        //     // {
        //     //   producto: id.split("'")[1],
        //     //   codigo: 'XXX',
        //     //   descripcion: text
        //     // }
        //     `${index}: '${p.id}'`
        //     // )
        //     );

        // const productos_seleccionados: any = $("#productos_seleccionados").select2('data');

        // console.log(productos_seleccionados)

        const productos_registrados = this.productos
          .map(({ id }, index) =>
          (
            {
              //   producto: id.split("'")[1],
              //   codigo: 'XXX',
              //   descripcion: text
              id,
              valor: `${index}: '${id}'`
            }
          )
          )
          .filter(({ id }) =>
            data.productos.some(({ producto }) => producto == id))
          .map(({ valor }) =>
            // (
            // {
            //   producto: id.split("'")[1],
            //   codigo: 'XXX',
            //   descripcion: text
            // }
            // `${index}: '${id}'`
            valor
            // )
          );

        console.log(productos_registrados)
        // $(this.el.nativeElement.querySelector('#productos_seleccionados')).multiSelect('select', productos_registrados);

        const arrayOfValues = ["0: 'Nevada'"]
        // const arrayOfValues = ["0: '9f7a9dabdd1aaa4dc41091b5'","3: '5f7a9dabdd1aaa4dc41091b5'"]
        // const arrayOfValues = [{
        //   id: "0: '9f7a9dabdd1aaa4dc41091b5'",
        //   text: 'Nevada',
        //   selected: true,
        //   disabled: false
        // }]
        // const arrayOfValues = [{id:"1: '5f7a9df2dd1aaa4dc41091b6'"},
        // {"3: '5f7a9dabdd1aaa4dc41091b5'"}]
        // $("#productos_seleccionados").select2("val", arrayOfValues)

        // $("#productos_seleccionados").val(productos_registrados).trigger('change');
        $("#productos_seleccionados").val(arrayOfValues).trigger('change');
        // $('#productos_seleccionados').select2('data', arrayOfValues);
        // $("#productos_seleccionados").select2().select2('val',arrayOfValues);
        // $("#productos_seleccionados").select2().val(arrayOfValues).trigger("change");
        // $('#productos_seleccionados').select2('data', {id: 100, a_key: 'Lorem Ipsum'});

        // $('#productos_seleccionados').select2('data', arrayOfValues);

        // $("#productos_seleccionados").select2("val", productos_registrados)

        // this.form.setValue(data);
        this.form.patchValue(data);
      })
    }
  }

  guardar() {
    this.formSubmitted = true;

    // let r = $(this.el.nativeElement.querySelector('#productos_seleccionados')).val();
    // let r = $(this.el.nativeElement.querySelector('#productos_seleccionados')).val();

    const productos_seleccionados: any = $("#productos_seleccionados").select2('data');
    const productos_seleccionados2: any = $("#productos_seleccionados").val();

    // const data3 = [];

    const productos_seleccionados_procesados = productos_seleccionados.map(({ id, text }) => (
      {
        producto: id.split("'")[1],
        codigo: 'XXX',
        descripcion: text
      }));
    // const data4 = data2.map(({id, text}) => { id:id, text:text });

    // console.log($("#productos_seleccionados").select2('data'));

    console.log(productos_seleccionados)
    console.log(productos_seleccionados2)
    // console.log(productos_seleccionados_procesados)
    // console.log(data3)
    // // console.log(this.form.get('local_atencion').value)

    // console.log(r);
    // // return

    // const productos_seleccionados = [];

    // for (let index = 0; index < r.length; index++) {
    //   r[index] = r[index].split("'")[1];
    //   // productos_seleccionados.push({
    //   //   'producto': r[index].split("'")[1],
    //   //   'codigo': 'XXX'
    //   // })
    // }

    // // console.log(productos_seleccionados)
    // // return;

    // // this.form.controls['productos'].setValue(productos_seleccionados);
    this.form.controls['productos'].setValue(productos_seleccionados_procesados);

    if (!this.form.valid) {
      Swal.fire({
        text: "Validar la información proporcionada.", icon: 'warning'
      });
      return;
    }

    const id_usuario = this.form.get('usuario').value;
    const usuario = this.analistas.find(item => item.id === id_usuario);

    const data: Analista = this.form.value;

    data.nombre_usuario = usuario.persona.apellido_paterno + ' ' + usuario.persona.apellido_materno + ', ' + usuario.persona.nombre;
    data.documento_identidad_usuario = usuario.persona.documento_identidad;

    if (this._id == 'nuevo') {
      // if (!this.form.valid) {
      //   Swal.fire({
      //     text: "Validar la información proporcionada.", icon: 'warning'
      //   });
      //   return;
      // }
      this.analistaService.crear(data).subscribe(res => {
        // this.analistaService.crear(this.form.value).subscribe(res => {
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
      // if (!this.form.valid) {
      //   Swal.fire({
      //     text: "Validar la información proporcionada.", icon: 'warning'
      //   });
      //   return;
      // }
      this.analistaService.editar(this._id, data).subscribe(res => {
        // this.analistaService.editar(this._id, this.form.value).subscribe(res => {
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
