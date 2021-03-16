import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibroDiarioEgresosComponent } from './libro-diario-egresos.component';

describe('LibroDiarioEgresosComponent', () => {
  let component: LibroDiarioEgresosComponent;
  let fixture: ComponentFixture<LibroDiarioEgresosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibroDiarioEgresosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibroDiarioEgresosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
