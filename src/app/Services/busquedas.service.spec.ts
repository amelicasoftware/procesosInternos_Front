import { TestBed } from '@angular/core/testing';

import { BusquedasService } from './busquedas.service';

describe('BusquedasService', () => {
  let service: BusquedasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusquedasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
