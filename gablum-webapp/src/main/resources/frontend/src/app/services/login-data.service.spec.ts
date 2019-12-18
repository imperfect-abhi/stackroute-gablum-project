import { TestBed } from '@angular/core/testing';

import { LoginDataService } from './login-data.service';
import { HttpClientModule } from '@angular/common/http';

describe('LoginDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: LoginDataService = TestBed.get(LoginDataService);
    expect(service).toBeTruthy();
  });
});
