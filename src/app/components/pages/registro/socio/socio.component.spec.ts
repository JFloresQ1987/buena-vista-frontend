import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SocioComponent } from './socio.component';

describe('SocioComponent', () => {
  let component: SocioComponent;
  let fixture: ComponentFixture<SocioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
