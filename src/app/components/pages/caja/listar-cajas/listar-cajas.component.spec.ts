import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCajasComponent } from './listar-cajas.component';

describe('ListarCajasComponent', () => {
  let component: ListarCajasComponent;
  let fixture: ComponentFixture<ListarCajasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCajasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCajasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
