import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CierreCajaIndividualComponent } from './cierre-caja-individual.component';

describe('CierreCajaIndividualComponent', () => {
  let component: CierreCajaIndividualComponent;
  let fixture: ComponentFixture<CierreCajaIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CierreCajaIndividualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CierreCajaIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
