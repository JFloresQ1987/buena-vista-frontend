import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProductoPagoComponent } from './producto-pago.component';

describe('ProductoPagoComponent', () => {
  let component: ProductoPagoComponent;
  let fixture: ComponentFixture<ProductoPagoComponent>;

  beforeEach(waitForAsync(() => {
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
