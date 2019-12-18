import { Injectable } from '@angular/core';
import { CommunicatorService } from './communicator.service';
import { NetworkingService } from './networking.service';
import { ContractDetail } from '../interfaces/contract-detail';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContractsDataService {
  public contract: ContractDetail;
  public contractsUrl = environment.contractsUrl;
  constructor(
    private comms: CommunicatorService,
    private networking: NetworkingService
  ) { }

  getAllContracts(dest, key) {
    this.networking.getData<ContractDetail>(this.contractsUrl, dest, key);
  }

  saveContract(contractDetail: ContractDetail) {
    this.contract = contractDetail;
  }
  retrieveContract() {
    return this.contract;
  }
}
