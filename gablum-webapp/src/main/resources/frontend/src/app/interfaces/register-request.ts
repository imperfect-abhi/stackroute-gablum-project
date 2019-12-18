import { UserRole } from './user-role';

export interface RegisterRequest {
    name: string;
    email: string;
    phone: number;
    companyName: string;
    // userName: string;
    businessLicense: string;
    password: string;
    role: UserRole[];
    businessDomain: string;
    businessSubDomain: string;
}

