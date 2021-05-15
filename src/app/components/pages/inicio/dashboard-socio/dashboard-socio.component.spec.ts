import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DashboardSocioComponent } from './dashboard-socio.component';

describe('DashboardSocioComponent', () => {
  let component: DashboardSocioComponent;
  let fixture: ComponentFixture<DashboardSocioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardSocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
