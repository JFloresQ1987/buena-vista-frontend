import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorroPagoComponent } from './ahorro-pago.component';

describe('AhorroPagoComponent', () => {
  let component: AhorroPagoComponent;
  let fixture: ComponentFixture<AhorroPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AhorroPagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AhorroPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
