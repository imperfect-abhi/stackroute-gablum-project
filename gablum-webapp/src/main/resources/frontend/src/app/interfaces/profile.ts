import { UserRole } from './user-role';

export interface Profile {
    name: string;
    email: string;
    address: string;
    phone: number;
    companyName: string;
    businessLicense: string;
    password: string;
    role: UserRole[];
    businessDomain: string;
    businessSubDomain: string;
    profileImage?: string;
}
