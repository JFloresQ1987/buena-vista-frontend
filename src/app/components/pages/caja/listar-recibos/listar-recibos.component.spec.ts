import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRecibosComponent } from './listar-recibos.component';

describe('ListarRecibosComponent', () => {
  let component: ListarRecibosComponent;
  let fixture: ComponentFixture<ListarRecibosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarRecibosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarRecibosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
