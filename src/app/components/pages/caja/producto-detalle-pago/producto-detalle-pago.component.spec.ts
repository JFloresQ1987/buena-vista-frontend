import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductoDetallePagoComponent } from './producto-detalle-pago.component';

describe('ProductoDetallePagoComponent', () => {
  let component: ProductoDetallePagoComponent;
  let fixture: ComponentFixture<ProductoDetallePagoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoDetallePagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoDetallePagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
