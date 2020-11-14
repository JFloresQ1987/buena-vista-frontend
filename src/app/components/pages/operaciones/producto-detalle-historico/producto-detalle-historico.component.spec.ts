import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoDetalleHistoricoComponent } from './producto-detalle-historico.component';

describe('ProductoDetalleHistoricoComponent', () => {
  let component: ProductoDetalleHistoricoComponent;
  let fixture: ComponentFixture<ProductoDetalleHistoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoDetalleHistoricoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoDetalleHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
