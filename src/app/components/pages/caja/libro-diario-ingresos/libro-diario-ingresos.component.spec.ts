import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroDiarioIngresosComponent } from './libro-diario-ingresos.component';

describe('LibroDiarioIngresosComponent', () => {
  let component: LibroDiarioIngresosComponent;
  let fixture: ComponentFixture<LibroDiarioIngresosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibroDiarioIngresosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibroDiarioIngresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
