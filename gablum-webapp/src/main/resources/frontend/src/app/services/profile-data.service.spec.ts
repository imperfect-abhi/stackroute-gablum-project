import { TestBed } from '@angular/core/testing';

import { ProfileDataService } from './profile-data.service';
import { HttpClientModule } from '@angular/common/http';
import { CommunicatorService } from './communicator.service';
import { NetworkingService } from './networking.service';

describe('ProfileDataService', () => {
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
    const service: ProfileDataService = TestBed.get(ProfileDataService);
    expect(service).toBeTruthy();
  });
});
