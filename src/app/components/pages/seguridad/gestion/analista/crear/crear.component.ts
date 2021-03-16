import { Component, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../../../../../services/core/registro/usuario.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { UbigeoService } from '../../../../../../services/core/ubigeo.service';
import { Usuario } from 'src/app/interfaces/core/registro/usuario.interface';
import { ProductoService } from '../../../../../../services/core/configuracion/producto.service';
import { AnalistaService } from '../../../../../../services/core/registro/analista.service';
import { Analista } from '../../../../../../interfaces/core/registro/analista.interface';

declare const $: any;

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styles: [
  ]
})

export class CrearAnalistaComponent {
  public cargando: boolean = false;
  public form: FormGroup;
  public formSubmitted = false;
  public _id: string;
  public departamentos: [] = [];
  public provincias: [] = [];
  public distritos: [] = [];
  public lista_productos: [] = [];
  public analistas: any = [];

  constructor(private service: UsuarioService,
    private analistaService: AnalistaService,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private el: ElementRef,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ubigeoService: UbigeoService,
    private productoService: ProductoService) {
  }

  ngOnInit(): void {
    this.cargarProductos();
    // $(this.el.nativeElement.querySelector('#roles')).multiSelect();
    $("#productos_seleccionados").select2();
    // $("#productos_seleccionados").select2();

    this.usuarioService.listarxrol("Analista").subscribe(res => {
      this.analistas = res['usuarios'];
    })

    this.form = this.formBuilder.group({
      codigo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      productos_analista: ['', []],
      productos_analista_valida: ['', [Validators.required]],
      // productos2: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      local_atencion: ['', [Validators.required]],
      comentario: ['', [Validators.required]],
      // productos: ['', []],
      // productos: ['', [Validators.required]],
    });
    // this.form = this.formBuilder.group({
    //   documento_identidad: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    //   nombre: ['', [Validators.required, Validators.maxLength(50)]],
    //   apellido_paterno: ['', [Validators.required, Validators.maxLength(50)]],
    //   apellido_materno: ['', [Validators.required, Validators.maxLength(50)]],
    //   rol: ['', [Validators.required]],
    //   productos: ['', [Validators.required]],
    //   local_atencion: ['', [Validators.required]],
    //   fecha_nacimiento: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    //   es_masculino: [true, Validators.required],
    //   numero_telefono: ['', [Validators.maxLength(15)]],
    //   numero_celular: ['', [Validators.maxLength(15)]],
    //   correo_electronico: ['', [Validators.email, Validators.maxLength(150)]],
    //   departamento: ['', [Validators.required]],
    //   provincia: ['', [Validators.required]],
    //   distrito: ['', [Validators.required]],
    //   domicilio: ['', [Validators.required, Validators.maxLength(200)]],
    //   referencia_domicilio: ['', [Validators.required, Validators.maxLength(200)]],
    //   // avatar: [''],
    //   comentario: ['', [Validators.required, Validators.maxLength(200)]]
    // });
    this.activatedRoute.params.subscribe(({ id }) => {
      // this._id = '5fba84c5131d6c308c716abc';
      this._id = id;
      this.cargarAnalista(id);
      // console.log(this.productos)
      // this.cargarUsuario(id);
      // this.cargarAnalista(id);
    });

    // this.form.controls['departamento'].valueChanges.subscribe(departamento => {
    //   this.ubigeoService.listarProvinciasxDepartamento(departamento).subscribe(res => {
    //     //this.form.controls['provincia'].setValue("");
    //     this.provincias = res['provincias'];
    //     //this.form.controls['distrito'].setValue("");
    //     this.distritos = [];
    //   })
    // });

    // this.form.controls['provincia'].valueChanges.subscribe(provincia => {
    //   const departamento = this.form.controls['departamento'].value;
    //   //this.form.controls['distrito'].setValue("");
    //   this.ubigeoService.listarDistritosxProvincia(departamento, provincia).subscribe(res => {
    //     this.distritos = res['distritos'];
    //   })
    // })

  }

  cargarProductos() {
    this.productoService.listar(true, true).subscribe(res => this.lista_productos = res);
  }

  // cargarAnalista(id: string) {

  //   id = '60479ef5e0069057841a2d70';

  //   if (id != 'nuevo') {
  //     // this.button = "Editar";
  //     this.analistaService.getAnalista(id).subscribe(res => {
  //       const analista = res['analista'];
  //       const data = {
  //         codigo: analista['codigo'],
  //         descripcion: analista['descripcion'],
  //         // producto: analista['producto'],
  //         productos: analista['productos'],
  //         local_atencion: analista['local_atencion'],
  //         usuario: analista['usuario'],
  //         comentario: ''
  //       }

  //       // const productos_registrados = [];

  //       const productos_registrados = [];
  //       data.productos.forEach(r => {
  //         if (r.producto == 'Administrador') {
  //           productos_registrados.push("0: 'Administrador'")
  //         } else if (r.producto == 'Cajero') {
  //           productos_registrados.push("1: 'Cajero'")
  //         } else if (r.producto == '5f7a9df2dd1aaa4dc41091b6') {
  //           productos_registrados.push("1: '5f7a9df2dd1aaa4dc41091b6'")
  //         } else {
  //           productos_registrados.push("2: 'Analista'")
  //         }
  //       });
  //       // $(this.el.nativeElement.querySelector('#roles')).multiSelect('select', roles);
  //       // $("#roles").val(productos_registrados).trigger('change');

  //       // // productos_registrados.push("1: '5f7a9df2dd1aaa4dc41091b6'")
  //       // // productos_registrados.push("4: '5f51a53b7d16471c2833668b'")/////////////////////
  //       // // productos_registrados.push("8: '5f51a4b77d16471c28336688'")

  //       // // data.productos.forEach(item => {
  //       // //   // if (r == 'Administrador') {
  //       // //   // productos_registrados.push("0: 'Administrador'")
  //       // //   // } else if (r == 'Cajero') {
  //       // //   // productos_registrados.push("3: 'Cajero'")
  //       // //   // } else {
  //       // //   //   productos_registrados.push("2: 'Analista'")
  //       // //   // }

  //       // //   this.productos.forEach((p: any, index) => {
  //       // //     if (p.id === item.producto)
  //       // //       // productos_registrados.push(`${p.id}: ${p.codigo}`)
  //       // //       productos_registrados.push(`${index}: '${p.id}'`)
  //       // //     // productos_registrados.push(`${p.id}: '${p.descripcion}'`)
  //       // //   });

  //       // //   // console.log(item)
  //       // // });

  //       // // const productos_registrados = this.productos.map(({id,text},index)=>)

  //       // // console.log(this.productos)
  //       // // console.log(data.productos)

  //       // // const productos_registrados = this.productos
  //       // //   .filter(({ id }) =>
  //       // //     data.productos.some(({ producto }) => producto == id))
  //       // //   .map(({ id, text }) => 
  //       // //   // (
  //       // //     // {
  //       // //     //   producto: id.split("'")[1],
  //       // //     //   codigo: 'XXX',
  //       // //     //   descripcion: text
  //       // //     // }
  //       // //     `${index}: '${p.id}'`
  //       // //     // )
  //       // //     );

  //       // // const productos_seleccionados: any = $("#productos_seleccionados").select2('data');

  //       // // console.log(productos_seleccionados)

  //       // const productos_registrados = this.productos
  //       //   .map(({ id }, index) =>
  //       //   (
  //       //     {
  //       //       //   producto: id.split("'")[1],
  //       //       //   codigo: 'XXX',
  //       //       //   descripcion: text
  //       //       id,
  //       //       valor: `${index}: '${id}'`
  //       //     }
  //       //   )
  //       //   )
  //       //   .filter(({ id }) =>
  //       //     data.productos.some(({ producto }) => producto == id))
  //       //   .map(({ valor }) =>
  //       //     // (
  //       //     // {
  //       //     //   producto: id.split("'")[1],
  //       //     //   codigo: 'XXX',
  //       //     //   descripcion: text
  //       //     // }
  //       //     // `${index}: '${id}'`
  //       //     valor
  //       //     // )
  //       //   );

  //       console.log(productos_registrados)
  //       // $(this.el.nativeElement.querySelector('#productos_seleccionados')).multiSelect('select', productos_registrados);

  //       // const arrayOfValues = ["0: 'Nevada'"]
  //       // const arrayOfValues = ["0: '9f7a9dabdd1aaa4dc41091b5'","3: '5f7a9dabdd1aaa4dc41091b5'"]
  //       // const arrayOfValues = [{
  //       //   id: "0: '9f7a9dabdd1aaa4dc41091b5'",
  //       //   text: 'Nevada',
  //       //   selected: true,
  //       //   disabled: false
  //       // }]
  //       // const arrayOfValues = [{id:"1: '5f7a9df2dd1aaa4dc41091b6'"},
  //       // {"3: '5f7a9dabdd1aaa4dc41091b5'"}]
  //       // $("#productos_seleccionados").select2("val", arrayOfValues)

  //       // $("#productos_seleccionados").val(productos_registrados).trigger('change');
  //       $("#productos_seleccionados").val(productos_registrados).trigger('change');

  //       // $('#productos_seleccionados').select2('data', arrayOfValues);
  //       // $("#productos_seleccionados").select2().select2('val',arrayOfValues);
  //       // $("#productos_seleccionados").select2().val(arrayOfValues).trigger("change");
  //       // $('#productos_seleccionados').select2('data', {id: 100, a_key: 'Lorem Ipsum'});

  //       // $('#productos_seleccionados').select2('data', arrayOfValues);

  //       // $("#productos_seleccionados").select2("val", productos_registrados)

  //       // this.form.setValue(data);
  //       this.form.patchValue(data);
  //     })
  //   }
  // }

  cargarAnalista(id) {

    // id='5fba84c5131d6c308c716abc';
    // id = '60479ef5e0069057841a2d70';
    // console.log('60479ef5e0069057841a2d70',id)

    if (id != 'nuevo') {
      this.analistaService.getAnalista(id).subscribe(res => {
        // this.service.getUsuario(id).subscribe(res => {

        // console.log(res['usuario'])

        // const usuario = res['usuario'];
        // const { persona, local_atencion, rol, persona: { comentario } } = usuario;
        //this.roles = rol;

        const analista = res['analista'];
        // const { persona, local_atencion, productos, persona: { comentario } } = analista;
        const data = {
          codigo: analista['codigo'],
          descripcion: analista['descripcion'],
          // producto: analista['producto'],
          productos: analista['productos'],
          local_atencion: analista['local_atencion'],
          usuario: analista['usuario'],
          comentario: ''
        }

        // const data = {
        //   ...persona,
        //   departamento: (persona.ubigeo.departamento == undefined) ? "" : persona.ubigeo.departamento,
        //   provincia: (persona.ubigeo.provincia == undefined) ? "" : persona.ubigeo.provincia,
        //   distrito: (persona.ubigeo.distrito == undefined) ? "" : persona.ubigeo.distrito,
        //   productos2: rol,
        //   local_atencion: local_atencion,
        //   comentario: ''
        // }
        // delete data['_id'];
        // delete data['ubigeo'];

        // console.log(data)

        // console.log('productos', analista['productos'])

        // const productos_seleccionados2 = [];

        const productos_seleccionados = this.lista_productos
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

        // analista['productos'].forEach(r => {
        //   if (r.producto == 'Administrador') {
        //     productos_seleccionados2.push("0: 'Administrador'")
        //   } else if (r.producto == 'Cajero') {
        //     productos_seleccionados2.push("1: 'Cajero'")
        //   } else if (r.producto == '5f7a9df2dd1aaa4dc41091b6') {
        //     productos_seleccionados2.push("1: '5f7a9df2dd1aaa4dc41091b6'")
        //   } else {
        //     productos_seleccionados2.push("2: 'Analista'")
        //   }
        // });
        // $(this.el.nativeElement.querySelector('#roles')).multiSelect('select', roles);

        // console.log(productos_seleccionados2)

        $("#productos_seleccionados").val(productos_seleccionados).trigger('change');
        // $("#productos_seleccionados").val(productos_seleccionados2).trigger('change');
        this.form.patchValue(data);
        // this.form.controls['provincia'].setValue(data.provincia);
        // this.form.controls['distrito'].setValue(data.distrito);
      });
    }
    // else {
    //   return;
    // }
  }

  guardar() {
    this.formSubmitted = true;

    // let productos_seleccionados2 = $(this.el.nativeElement.querySelector('#productos_seleccionados')).val();
    const productos_seleccionados: any = $("#productos_seleccionados").val();
    // const productos_seleccionados3: any = $("#productos_seleccionados").select2('data');
    // let r2 = $(this.el.nativeElement.querySelector('#productos_seleccionados')).val();

    // console.log(this.form.get('rol').value)
    // console.log(productos_seleccionados2);
    // console.log(productos_seleccionados3);
    // console.log($("#productos_seleccionados").val());
    // console.log(r2);

    // for (let index = 0; index < r.length; index++) {
    //   r[index] = r[index].split("'")[1];
    // }

    const productos_seleccionados_procesados = this.lista_productos
      // .map(s => s.split("'")[1])
      .filter(({ id }) =>
        productos_seleccionados.some((p: string) => id == p.split("'")[1]))
      .map(({ id, codigo, descripcion }) =>
      (
        {
          producto: id,
          codigo,
          descripcion
        })
      )
      ;

    // const productos_seleccionados_procesados = productos_seleccionados.map(({ id, text }) => (
    //   {
    //     producto: id.split("'")[1],
    //     codigo: 'XXX',
    //     descripcion: text
    //   }));

    // const productos_seleccionados_procesados = productos_seleccionados.map(item => (
    //   {
    //     producto: item.split("'")[1],
    //     codigo: 'XXX',
    //     descripcion: 'text'
    //   }));

    // for (let index = 0; index < r.length; index++) {
    //   r[index] = r[index].split("'")[1];
    // }

    // console.log(productos_seleccionados_procesados)

    // this.form.controls['productos'].setValue(productos_seleccionados_procesados);
    this.form.controls['productos_analista_valida'].setValue(productos_seleccionados);

    // console.log('productos_analista',this.form.get('productos_analista').value)

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

    data.productos = productos_seleccionados_procesados;

    if (this._id != 'nuevo') {

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

      // // let r = $(this.el.nativeElement.querySelector('#roles')).val();
      // // for (let index = 0; index < r.length; index++) {
      // //   r[index] = r[index].split("'")[1];
      // // }
      // // this.form.controls['rol'].setValue(r)
      // // if (!this.form.valid) {
      // //   Swal.fire({
      // //     text: "Validar la información proporcionada.", icon: 'warning'
      // //   });
      // //   return;
      // // }
      // this.service.editar(this._id, this.form.value)
      //   .subscribe(res => {
      //     this.formSubmitted = false;
      //     if (res['ok']) {
      //       Swal.fire({
      //         text: res['msg'], icon: 'success'
      //       });
      //       this.cancelar();
      //       this.router.navigateByUrl('seguridad/gestion/usuario');
      //     } else {
      //       Swal.fire({
      //         text: res['msg'], icon: 'error'
      //       });
      //     }

      //   });
    } else {

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

      // // let r = $(this.el.nativeElement.querySelector('#roles')).val();

      // // for (let index = 0; index < r.length; index++) {
      // //   r[index] = r[index].split("'")[1];
      // // }

      // // this.form.controls['rol'].setValue(r);
      // // if (!this.form.valid) {
      // //   Swal.fire({
      // //     text: "Validar la información proporcionada.", icon: 'warning'
      // //   });
      // //   return;
      // // }

      // const data: Usuario = this.form.value;

      // data.ubigeo = {
      //   departamento: this.form.get('departamento').value,
      //   provincia: this.form.get('provincia').value,
      //   distrito: this.form.get('distrito').value
      // };

      // // const data = {
      // //   ...this.form.value,
      // //   ubigeo:{
      // //     departamento:this.form.controls['departamento'],
      // //     provincia:this.form.controls['provincia'],
      // //     distrito:this.form.controls['distrito']
      // //   }
      // // }

      // // this.service.crear(this.form.value)
      // this.service.crear(data)
      //   .subscribe(res => {

      //     if (res['ok']) {
      //       Swal.fire({
      //         text: 'La información se guardó satisfactoriamente.', icon: 'success'
      //       });
      //       this.cancelar();
      //       this.router.navigateByUrl('seguridad/gestion/usuario');
      //     } else {
      //       Swal.fire({
      //         text: res['msg'], icon: 'error'
      //       });
      //     }

      //   });
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
