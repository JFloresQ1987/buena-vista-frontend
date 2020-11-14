import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoHistoricoComponent } from './producto-historico.component';

describe('ProductoHistoricoComponent', () => {
  let component: ProductoHistoricoComponent;
  let fixture: ComponentFixture<ProductoHistoricoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoHistoricoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
