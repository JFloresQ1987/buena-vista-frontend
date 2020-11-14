import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarPagoAnalistaDetalleComponent } from './confirmar-pago-analista-detalle.component';

describe('ConfirmarPagoAnalistaDetalleComponent', () => {
  let component: ConfirmarPagoAnalistaDetalleComponent;
  let fixture: ComponentFixture<ConfirmarPagoAnalistaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmarPagoAnalistaDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarPagoAnalistaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
