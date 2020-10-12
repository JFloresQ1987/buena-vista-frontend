import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './inicio/dashboard/dashboard.component';
import { UsuarioComponent } from './seguridad/gestion/usuario/usuario.component';
import { RolComponent } from './seguridad/gestion/rol/rol.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { OperacionFinancieraComponent } from './registro/operacion-financiera/operacion-financiera.component';
import { SocioComponent } from './registro/socio/socio.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardSocioComponent } from './inicio/dashboard-socio/dashboard-socio.component';
import { CrearComponent } from './seguridad/gestion/usuario/crear/crear.component';
import { ProductoComponent } from './operaciones/producto/producto.component';
import { ProductoDetalleComponent } from './operaciones/producto-detalle/producto-detalle.component';
import { ProductoDetallePagoComponent } from './caja/producto-detalle-pago/producto-detalle-pago.component';
import { ProductoPagoComponent } from './caja/producto-pago/producto-pago.component';
import { CajaComponent } from './seguridad/gestion/caja/caja.component';
import { CrearCajaComponent } from './seguridad/gestion/caja/crear/crear.component';
import { AnalistaComponent } from './seguridad/gestion/analista/analista.component';
import { CierreCajaIndividualComponent } from './caja/cierre-caja-individual/cierre-caja-individual.component';
import { FormComponent } from './seguridad/gestion/analista/form.component';
import { AhorroComponent } from './registro/ahorro/ahorro.component';
import { AhorroDetalleComponent } from './operaciones/ahorro-detalle/ahorro-detalle.component';
import { AhorroDetallePagoComponent } from './caja/ahorro-detalle-pago/ahorro-detalle-pago.component';
import { IngresosEgresosComponent } from './caja/gestion/ingresos-egresos/ingresos-egresos.component';
import { ProductoPrePagoComponent } from './analista/producto-pre-pago/producto-pre-pago.component';
import { BusquedaAvanzadaComponent } from './inicio/busqueda-avanzada/busqueda-avanzada.component';
import { ListarCajasComponent } from './caja/listar-cajas/listar-cajas.component';
import { ListarRecibosComponent } from './caja/listar-recibos/listar-recibos.component';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    UsuarioComponent,
    RolComponent,
    SocioComponent,
    OperacionFinancieraComponent,
    DashboardSocioComponent,
    CrearComponent,
    ProductoComponent,
    ProductoDetalleComponent,
    ProductoDetallePagoComponent,
    ProductoPagoComponent,
    CajaComponent,
    CrearCajaComponent,
    AnalistaComponent,
    FormComponent,
    CierreCajaIndividualComponent,
    AhorroComponent,
    AhorroDetalleComponent,
    AhorroDetallePagoComponent,
    IngresosEgresosComponent,
    CierreCajaIndividualComponent,
    ProductoPrePagoComponent,
    BusquedaAvanzadaComponent,
    ListarCajasComponent,
    ListarRecibosComponent
  ],
  exports: [
    PagesComponent,
    DashboardComponent,
    UsuarioComponent,
    RolComponent,
    CajaComponent,
    SocioComponent,
    OperacionFinancieraComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PagesModule { }
