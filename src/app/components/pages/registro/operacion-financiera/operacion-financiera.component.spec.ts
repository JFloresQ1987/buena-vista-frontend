import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacionFinancieraComponent } from './operacion-financiera.component';

describe('OperacionFinancieraComponent', () => {
  let component: OperacionFinancieraComponent;
  let fixture: ComponentFixture<OperacionFinancieraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperacionFinancieraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperacionFinancieraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
