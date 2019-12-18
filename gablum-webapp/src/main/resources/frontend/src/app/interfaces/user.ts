import { RouterLink } from '@angular/router';
import { UserRole } from './user-role';

export interface User {
    name: string;
    email: string;
    address: string;
    phone: string;
    companyName: string;
    username: string;
    businessLicense: string;
    businessDomain: string;
    businessSubDomain: string;
    userDomainDetails: any;
    hashEncryptionKeyList: any;
    blockchain: any;
    contractIdList: string[];
    proposalIdList: string[];
    auctionIdList: string[];
    bidIdList: string[];
    role: UserRole[];
    rating: number;
    active: number;
    isLocked: boolean;
    isExpired: boolean;
    isEnabled: boolean;
    createdOn: Date;
}
// role defined from any to User-RouterLink.ts
