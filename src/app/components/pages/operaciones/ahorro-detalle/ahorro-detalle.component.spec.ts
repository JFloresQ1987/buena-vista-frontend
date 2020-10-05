import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorroDetalleComponent } from './ahorro-detalle.component';

describe('AhorroDetalleComponent', () => {
  let component: AhorroDetalleComponent;
  let fixture: ComponentFixture<AhorroDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AhorroDetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AhorroDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
