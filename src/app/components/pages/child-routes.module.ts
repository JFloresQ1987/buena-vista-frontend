import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorizationGuard } from '../../guards/authorization.guard';

import { DashboardComponent } from './inicio/dashboard/dashboard.component';
import { UsuarioComponent } from './seguridad/gestion/usuario/usuario.component';
import { CrearComponent } from './seguridad/gestion/usuario/crear/crear.component';
// import { RolComponent } from './seguridad/gestion/rol/rol.component';
import { OperacionFinancieraComponent } from './registro/operacion-financiera/operacion-financiera.component';
import { SocioComponent } from './registro/socio/socio.component';
import { DashboardSocioComponent } from './inicio/dashboard-socio/dashboard-socio.component';
import { ProductoComponent } from './operaciones/producto/producto.component';
import { ProductoDetalleComponent } from './operaciones/producto-detalle/producto-detalle.component';
import { ProductoPagoComponent } from './caja/producto-pago/producto-pago.component';
import { ProductoDetallePagoComponent } from './caja/producto-detalle-pago/producto-detalle-pago.component';
import { CajaComponent } from './seguridad/gestion/caja/caja.component';
import { CrearCajaComponent } from './seguridad/gestion/caja/crear/crear.component';
import { AnalistaComponent } from './seguridad/gestion/analista/analista.component'
// import { FormComponent } from './seguridad/gestion/analista/form.component';
import { IngresosEgresosComponent } from './caja/gestion/ingresos-egresos/ingresos-egresos.component';
import { CierreCajaIndividualComponent } from './caja/cierre-caja-individual/cierre-caja-individual.component';
import { AhorroComponent } from './registro/ahorro/ahorro.component';
import { BusquedaAvanzadaComponent } from './inicio/busqueda-avanzada/busqueda-avanzada.component';
import { ListarCajasComponent } from './caja/listar-cajas/listar-cajas.component';
import { ListarRecibosComponent } from './caja/listar-recibos/listar-recibos.component';
import { ProductoPrePagoComponent } from './analista/producto-pre-pago/producto-pre-pago.component';
import { ReportePagoAnalistaComponent } from './analista/reporte-pago-analista/reporte-pago-analista.component';
// import { ConfirmarPagoAnalistaComponent } from './caja/confirmar-pago-analista/confirmar-pago-analista.component';
// import { ConfirmarPagoAnalistaDetalleComponent } from './caja/confirmar-pago-analista-detalle/confirmar-pago-analista-detalle.component';
import { AhorroConsultaComponent } from './operaciones/ahorro-consulta/ahorro-consulta.component';
import { AhorroDetalleConsultaComponent } from './operaciones/ahorro-detalle-consulta/ahorro-detalle-consulta.component';
import { ProductoHistoricoComponent } from './operaciones/producto-historico/producto-historico.component';
import { ProductoDetalleHistoricoComponent } from './operaciones/producto-detalle-historico/producto-detalle-historico.component';
import { AhorroPagoComponent } from './caja/ahorro-pago/ahorro-pago.component';
import { AhorroDetallePagoComponent } from './caja/ahorro-detalle-pago/ahorro-detalle-pago.component';
import { LibroDiarioIngresosComponent } from './caja/libro-diario-ingresos/libro-diario-ingresos.component';
import { LibroDiarioEgresosComponent } from './caja/libro-diario-egresos/libro-diario-egresos.component';
import { SaldoCreditoComponent } from './reportes/saldo-credito/saldo-credito.component';
import { CrearAnalistaComponent } from './seguridad/gestion/analista/crear/crear.component';


const childRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: { modulo: 'Buenavista', menu: 'Home', item: 'Dashboard de Usuario' }
  },
  {
    path: 'dashboard/socio',
    component: DashboardSocioComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Buenavista', menu: 'Home', item: 'Dashboard de Socio', roles: ["Administrador", "Analista", "Cajero"] }
  },
  {
    path: 'seguridad/gestion/usuario',
    component: UsuarioComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Seguridad', menu: 'Gestión', item: 'Usuarios', roles: ["Administrador"] },
  },
  {
    path: 'seguridad/gestion/usuario/:id',
    component: CrearComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Seguridad', menu: 'Gestión', item: 'Detalle Usuario', roles: ["Administrador"] },
  },
  // {
  //   path: 'seguridad/gestion/rol',
  //   component: RolComponent,
  //   canActivate: [AuthorizationGuard],
  //   data: { modulo: 'Seguridad', menu: 'Gestión', item: 'Roles', roles: ["Administrador"] }
  // },
  {
    path: 'seguridad/gestion/analista',
    component: AnalistaComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Seguridad', menu: 'Gestión', item: 'Analistas', roles: ["Administrador"] }
  },
  {
    path: 'seguridad/gestion/analista/:id',
    component: CrearAnalistaComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Seguridad', menu: 'Gestión', item: 'Detalle Analista', roles: ["Administrador"] }
  },
  // {
  //   path: 'seguridad/gestion/analista/:id',
  //   component: FormComponent,
  //   canActivate: [AuthorizationGuard],
  //   data: { modulo: 'Seguridad', menu: 'Gestión', item: 'Detalle Analista', roles: ["Administrador"] }
  // },
  {
    path: 'seguridad/gestion/caja',
    component: CajaComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Seguridad', menu: 'Gestión', item: 'Cajas y Cajeros', roles: ["Administrador"] }
  },
      
  {
    path: 'seguridad/gestion/caja/:id',
    component: CrearCajaComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Seguridad', menu: 'Gestión', item: 'Detalle Caja', roles: ["Administrador"] }
  },
  
  /* {
    path: 'registro/gestion/socio',
    component: SocioComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Registro', menu: 'Gestión', item: 'Socios', roles: ["Administrador", "Analista"] }
  }, */
  {
    path: 'registro/gestion/socio/:id',
    component: SocioComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Registro', menu: 'Gestión', item: 'Socio', roles: ["Administrador", "Analista"] }
  },
  {
    path: 'registro/gestion/producto',
    component: OperacionFinancieraComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Registro', menu: 'Gestión', item: 'Producto', roles: ["Administrador", "Analista"] }
  },
  {
    path: 'operaciones/gestion/producto',
    component: ProductoComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Operaciones', menu: 'Gestión', item: 'Productos Vigentes', roles: ["Administrador", "Analista", "Cajero"] }
  },
  {
    path: 'operaciones/gestion/producto-detalle/:id',
    component: ProductoDetalleComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Operaciones', menu: 'Gestión', item: 'Producto Detalle', roles: ["Administrador", "Analista", "Cajero"] }
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'caja/pago/producto-caja',
    component: ProductoPagoComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Caja', menu: 'Pago', item: 'Productos', roles: ["Administrador", "Cajero"] }
  },
  {
    path: 'caja/pago/producto-detalle-caja/:id',
    component: ProductoDetallePagoComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Caja', menu: 'Pago', item: 'Producto detalle', roles: ["Administrador", "Cajero"] }
  },
  {
    path: 'caja/pago/ahorro-caja',
    component: AhorroPagoComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Caja', menu: 'Pago', item: 'Ahorros', roles: ["Administrador", "Cajero"] }
  },
  {
    path: 'caja/pago/ahorro-detalle-caja/:id',
    component: AhorroDetallePagoComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Caja', menu: 'Pago', item: 'Ahorro detalle', roles: ["Administrador", "Cajero"] }
  },
  {
    path: 'caja/gestion/ingresos-egresos',
    component: IngresosEgresosComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Caja', menu: 'Pago', item: 'Ingresos - Egresos', roles: ["Administrador","Cajero"] }
  },
  {
    path: 'caja/pago/cierre-caja-individual',
    component: CierreCajaIndividualComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Caja', menu: 'Cierre', item: 'Caja Individual', roles: ["Administrador", "Cajero"] }
  },
  {
    path: 'registro/gestion/ahorro',
    component: AhorroComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Registro', menu: 'Gestión', item: 'Ahorro', roles: ["Administrador", "Analista"] }
  },
  {
    path: 'dashboard/busqueda',
    component: BusquedaAvanzadaComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Registro', menu: 'Gestión', item: 'Búsqueda Avanzada de Socio', roles: ["Administrador", "Analista", "Cajero"] }
  },
  {
    path: 'caja/pago/cajas-lista',
    component: ListarCajasComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Caja', menu: 'Consulta', item: 'Cajas Individuales', roles: ["Administrador"] }
  },
  {
    path: 'caja/gestion/lista-recibo',
    component: ListarRecibosComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Caja', menu: 'Gestionar', item: 'Transacciones', roles: ["Administrador", "Cajero"] }
  },
  {
    path: 'analista/gestion/producto-pre-pago',
    component: ProductoPrePagoComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Analista', menu: 'Gestión', item: 'Recaudación', roles: ["Administrador", "Analista"] }
  },
  {
    path: 'analista/gestion/reporte-pago-analista',
    component: ReportePagoAnalistaComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Analista', menu: 'Gestión', item: 'Reporte Recaudación', roles: ["Administrador", "Analista"] }
  },
  // {
  //   path: 'caja/pago/confirmar-pago-analista',
  //   component: ConfirmarPagoAnalistaComponent,
  //   canActivate: [AuthorizationGuard],
  //   data: { modulo: 'Caja', menu: 'Pago', item: 'Confirmar Pago de Analista', roles: ["Administrador", "Cajero"] }
  // },
  // {
  //   path: 'caja/pago/confirmar-pago-analista-detalle',
  //   component: ConfirmarPagoAnalistaDetalleComponent,
  //   canActivate: [AuthorizationGuard],
  //   data: { modulo: 'Caja', menu: 'Pago', item: 'Confirmar Pago de Analista - Detalle', roles: ["Administrador", "Cajero"] }
  // },
  {
    path: 'operaciones/gestion/ahorro-consulta',
    component: AhorroConsultaComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Operaciones', menu: 'Gestión', item: 'Ahorros', roles: ["Administrador", "Analista", "Cajero"] }
  },
  {
    path: 'operaciones/gestion/ahorro-detalle-consulta/:id',
    component: AhorroDetalleConsultaComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Operaciones', menu: 'Gestión', item: 'Ahorro Detalle', roles: ["Administrador", "Analista", "Cajero"] }
  },
  {
    path: 'operaciones/consulta/producto-historico',
    component: ProductoHistoricoComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Operaciones', menu: 'Consulta', item: 'Productos Históricos', roles: ["Administrador", "Analista", "Cajero"] }
  },
  {
    path: 'operaciones/consulta/producto-detalle-historico/:id',
    component: ProductoDetalleHistoricoComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Operaciones', menu: 'Consulta', item: 'Producto Detalle', roles: ["Administrador", "Analista", "Cajero"] }
  },
  {
    path: 'reporte/libro-diario/ingresos',
    component: LibroDiarioIngresosComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Reportes', menu: 'Libro Diario', item: 'Ingresos', roles: ["Administrador", "Analista"] }
  },
  {
    path: 'reporte/libro-diario/egresos',
    component: LibroDiarioEgresosComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Reportes', menu: 'Libro Diario', item: 'Egresos', roles: ["Administrador", "Analista"] }
  },
  {
    path: 'reporte/analista/saldo-creditos',
    component: SaldoCreditoComponent,
    canActivate: [AuthorizationGuard],
    data: { modulo: 'Reportes', menu: 'Analistas', item: 'Saldo Créditos', roles: ["Administrador"] }
  },
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
  declarations: []
})
export class ChildRoutesModule { }
