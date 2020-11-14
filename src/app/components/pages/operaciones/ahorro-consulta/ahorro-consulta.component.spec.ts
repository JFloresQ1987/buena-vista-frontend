import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorroConsultaComponent } from './ahorro-consulta.component';

describe('AhorroConsultaComponent', () => {
  let component: AhorroConsultaComponent;
  let fixture: ComponentFixture<AhorroConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AhorroConsultaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AhorroConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
