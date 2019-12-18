import { TestBed } from '@angular/core/testing';

import { SellerGuardService } from './seller-guard.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('SellerGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RouterTestingModule
    ]
  }));

  it('should be created', () => {
    const service: SellerGuardService = TestBed.get(SellerGuardService);
    expect(service).toBeTruthy();
  });
});
