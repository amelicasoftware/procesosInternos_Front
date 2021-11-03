import { TestBed } from '@angular/core/testing';

import { ServicesFormService } from './services-form.service';

describe('ServicesFormService', () => {
  let service: ServicesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
