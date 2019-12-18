import { TestBed } from '@angular/core/testing';

import { IntlService } from './intl.service';

describe('IntlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IntlService = TestBed.get(IntlService);
    expect(service).toBeTruthy();
  });
});
