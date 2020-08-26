import { TestBed } from '@angular/core/testing';

import { SesionSocioService } from './sesion-socio.service';

describe('SesionSocioService', () => {
  let service: SesionSocioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SesionSocioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
