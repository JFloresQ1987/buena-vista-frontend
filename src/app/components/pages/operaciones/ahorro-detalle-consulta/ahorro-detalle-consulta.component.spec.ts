import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorroDetalleConsultaComponent } from './ahorro-detalle-consulta.component';

describe('AhorroDetalleConsultaComponent', () => {
  let component: AhorroDetalleConsultaComponent;
  let fixture: ComponentFixture<AhorroDetalleConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AhorroDetalleConsultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AhorroDetalleConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
