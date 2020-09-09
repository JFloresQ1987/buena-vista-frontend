import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoPagoComponent } from './producto-pago.component';

describe('ProductoPagoComponent', () => {
  let component: ProductoPagoComponent;
  let fixture: ComponentFixture<ProductoPagoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductoPagoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
