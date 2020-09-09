import { TestBed } from '@angular/core/testing';

import { OperacionFinancieraPagoService } from './operacion-financiera-pago.service';

describe('OperacionFinancieraPagoService', () => {
  let service: OperacionFinancieraPagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperacionFinancieraPagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
