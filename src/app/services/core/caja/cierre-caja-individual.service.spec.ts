import { TestBed } from '@angular/core/testing';

import { CierreCajaIndividualService } from './cierre-caja-individual.service';

describe('CierreCajaIndividualService', () => {
  let service: CierreCajaIndividualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CierreCajaIndividualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
