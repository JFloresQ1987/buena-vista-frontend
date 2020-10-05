import { TestBed } from '@angular/core/testing';

import { GrupoBancomunalService } from './grupo-bancomunal.service';

describe('GrupoBancomunalService', () => {
  let service: GrupoBancomunalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrupoBancomunalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
