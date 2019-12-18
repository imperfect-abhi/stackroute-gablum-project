import { ContractDetail } from './contract-detail';
import { Profile } from './profile';

export interface ContractWithBothUser {
    contract: ContractDetail;
    buyer: Profile;
    seller: Profile;
}
