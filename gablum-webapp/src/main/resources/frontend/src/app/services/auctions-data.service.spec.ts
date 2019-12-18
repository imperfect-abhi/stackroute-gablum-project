import { TestBed } from '@angular/core/testing';

import { AuctionsDataService } from './auctions-data.service';
import { CommunicatorService } from './communicator.service';
import { NetworkingService } from './networking.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('AuctionsDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ],
    providers: [
      CommunicatorService,
      NetworkingService
    ]
  }));

  it('should be created', () => {
    const service: AuctionsDataService = TestBed.get(AuctionsDataService);
    expect(service).toBeTruthy();
  });
});
