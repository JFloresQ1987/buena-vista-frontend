import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorroPrePagoComponent } from './ahorro-pre-pago.component';

describe('AhorroPrePagoComponent', () => {
  let component: AhorroPrePagoComponent;
  let fixture: ComponentFixture<AhorroPrePagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AhorroPrePagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AhorroPrePagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
