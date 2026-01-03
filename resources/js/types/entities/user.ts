import { UserRoleValue } from '../enums/role';
import { StatusValue } from '../enums/status';

export interface User {
    id: string;
    name: string;
    email: string;
    phone_number?: string;
    profile_picture_path?: string;
    role: UserRoleValue;
    status: StatusValue;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
}

export interface IUserAuth {
    id: string;
    name: string;
    email: string;
    role: UserRoleValue;
    profile_picture_path?: string;
    status: StatusValue;
}

export interface IUserIndex {
    id: string;
    name: string;
    email: string;
    role: UserRoleValue;
    status: StatusValue;
}

export interface IUserShow extends IUserIndex {
    email: string;
    phone_number?: string;
    profile_picture_path?: string;
    email_verified_at: string | null;
    updated_at: string;
}

export interface IUserEdit extends IUserIndex {
    phone_number?: string;
    profile_picture_path?: string;
    two_factor_enabled?: boolean;
}
