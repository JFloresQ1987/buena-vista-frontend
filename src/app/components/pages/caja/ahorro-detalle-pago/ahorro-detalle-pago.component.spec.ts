import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorroDetallePagoComponent } from './ahorro-detalle-pago.component';

describe('AhorroDetallePagoComponent', () => {
  let component: AhorroDetallePagoComponent;
  let fixture: ComponentFixture<AhorroDetallePagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AhorroDetallePagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AhorroDetallePagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
