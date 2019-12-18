import { TestBed } from '@angular/core/testing';
import { CommunicatorService } from './communicator.service';
import { NetworkingService } from './networking.service';
import { ContractDetail } from '../interfaces/contract-detail';
import {environment} from '../../environments/environment';
import { ContractsDataService } from './contracts-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ContractsDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      CommunicatorService,
      NetworkingService
    ]
  }));

  it('should be created', () => {
    const service: ContractsDataService = TestBed.get(ContractsDataService);
    expect(service).toBeTruthy();
  });
});
