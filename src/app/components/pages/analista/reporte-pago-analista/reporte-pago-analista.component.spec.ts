import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportePagoAnalistaComponent } from './reporte-pago-analista.component';

describe('ReportePagoAnalistaComponent', () => {
  let component: ReportePagoAnalistaComponent;
  let fixture: ComponentFixture<ReportePagoAnalistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportePagoAnalistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportePagoAnalistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
