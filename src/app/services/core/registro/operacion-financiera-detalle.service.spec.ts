import { TestBed } from '@angular/core/testing';

import { OperacionFinancieraDetalleService } from './operacion-financiera-detalle.service';

describe('OperacionFinancieraDetalleService', () => {
  let service: OperacionFinancieraDetalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperacionFinancieraDetalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
