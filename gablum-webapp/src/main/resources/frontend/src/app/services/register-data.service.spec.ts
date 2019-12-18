import { TestBed } from '@angular/core/testing';

import { RegisterDataService } from './register-data.service';
import { HttpClientModule } from '@angular/common/http';

describe('RegisterDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: RegisterDataService = TestBed.get(RegisterDataService);
    expect(service).toBeTruthy();
  });
});
