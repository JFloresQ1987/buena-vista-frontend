import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarPagoAnalistaComponent } from './confirmar-pago-analista.component';

describe('ConfirmarPagoAnalistaComponent', () => {
  let component: ConfirmarPagoAnalistaComponent;
  let fixture: ComponentFixture<ConfirmarPagoAnalistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmarPagoAnalistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarPagoAnalistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
