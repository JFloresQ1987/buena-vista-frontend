import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoRetiroAhorrosComponent } from './producto-retiro-ahorros.component';

describe('ProductoRetiroAhorrosComponent', () => {
  let component: ProductoRetiroAhorrosComponent;
  let fixture: ComponentFixture<ProductoRetiroAhorrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoRetiroAhorrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoRetiroAhorrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
