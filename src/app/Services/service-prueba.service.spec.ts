import { TestBed } from '@angular/core/testing';

import { ServicePruebaService } from './service-prueba.service';

describe('ServicePruebaService', () => {
  let service: ServicePruebaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicePruebaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
