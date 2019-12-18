import { TestBed } from '@angular/core/testing';

import { SchedulerDataService } from './scheduler-data.service';

describe('SchedulerDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SchedulerDataService = TestBed.get(SchedulerDataService);
    expect(service).toBeTruthy();
  });
});
