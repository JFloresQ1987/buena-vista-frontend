import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoPrePagoComponent } from './producto-pre-pago.component';

describe('ProductoPrePagoComponent', () => {
  let component: ProductoPrePagoComponent;
  let fixture: ComponentFixture<ProductoPrePagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoPrePagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoPrePagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
