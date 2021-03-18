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
import { AhorroComponent } from './registro/ahorro/ahorro.component';
import { AhorroDetallePagoComponent } from './caja/ahorro-detalle-pago/ahorro-detalle-pago.component';
import { IngresosEgresosComponent } from './caja/gestion/ingresos-egresos/ingresos-egresos.component';
import { ProductoPrePagoComponent } from './analista/producto-pre-pago/producto-pre-pago.component';
import { BusquedaAvanzadaComponent } from './inicio/busqueda-avanzada/busqueda-avanzada.component';
import { ListarCajasComponent } from './caja/listar-cajas/listar-cajas.component';
import { ListarRecibosComponent } from './caja/listar-recibos/listar-recibos.component';
import { ConfirmarPagoAnalistaComponent } from './caja/confirmar-pago-analista/confirmar-pago-analista.component';
import { ReportePagoAnalistaComponent } from './analista/reporte-pago-analista/reporte-pago-analista.component';
import { ConfirmarPagoAnalistaDetalleComponent } from './caja/confirmar-pago-analista-detalle/confirmar-pago-analista-detalle.component';
import { AhorroPagoComponent } from './caja/ahorro-pago/ahorro-pago.component';
import { AhorroConsultaComponent } from './operaciones/ahorro-consulta/ahorro-consulta.component';
import { AhorroDetalleConsultaComponent } from './operaciones/ahorro-detalle-consulta/ahorro-detalle-consulta.component';
import { ProductoHistoricoComponent } from './operaciones/producto-historico/producto-historico.component';
import { ProductoDetalleHistoricoComponent } from './operaciones/producto-detalle-historico/producto-detalle-historico.component';
import { LibroDiarioIngresosComponent } from './caja/libro-diario-ingresos/libro-diario-ingresos.component';
import { LibroDiarioEgresosComponent } from './caja/libro-diario-egresos/libro-diario-egresos.component';
import { SaldoCreditoComponent } from './reportes/saldo-credito/saldo-credito.component';
import { CrearAnalistaComponent } from './seguridad/gestion/analista/crear/crear.component';
import { ProductoRetiroAhorrosComponent } from './caja/producto-retiro-ahorros/producto-retiro-ahorros.component';

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
    CrearAnalistaComponent,
    CierreCajaIndividualComponent,
    AhorroComponent,
    AhorroDetallePagoComponent,
    IngresosEgresosComponent,
    CierreCajaIndividualComponent,
    ProductoPrePagoComponent,
    BusquedaAvanzadaComponent,
    ListarCajasComponent,
    ListarRecibosComponent,
    ConfirmarPagoAnalistaComponent,
    ReportePagoAnalistaComponent,
    ConfirmarPagoAnalistaDetalleComponent,
    AhorroPagoComponent,
    AhorroConsultaComponent,
    AhorroDetalleConsultaComponent,
    ProductoHistoricoComponent,
    ProductoDetalleHistoricoComponent,
    LibroDiarioIngresosComponent,
    LibroDiarioEgresosComponent,
    SaldoCreditoComponent,
    ProductoRetiroAhorrosComponent
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
