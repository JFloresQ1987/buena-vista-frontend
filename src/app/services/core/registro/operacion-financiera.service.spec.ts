import { TestBed } from '@angular/core/testing';

import { OperacionFinancieraService } from './operacion-financiera.service';

describe('OperacionFinancieraService', () => {
  let service: OperacionFinancieraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperacionFinancieraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
