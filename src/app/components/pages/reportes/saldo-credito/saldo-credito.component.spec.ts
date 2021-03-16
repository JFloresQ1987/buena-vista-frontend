import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaldoCreditoComponent } from './saldo-credito.component';

describe('SaldoCreditoComponent', () => {
  let component: SaldoCreditoComponent;
  let fixture: ComponentFixture<SaldoCreditoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaldoCreditoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaldoCreditoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
