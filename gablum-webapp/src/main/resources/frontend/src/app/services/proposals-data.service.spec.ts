import { TestBed } from '@angular/core/testing';
import { ProposalsDataService } from './proposals-data.service';
import { HttpClientModule } from '@angular/common/http';
import { NetworkingService } from './networking.service';
import { CommunicatorService } from './communicator.service';

describe('ProposalsDataService', () => {
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
    const service: ProposalsDataService = TestBed.get(ProposalsDataService);
    expect(service).toBeTruthy();
  });
});
