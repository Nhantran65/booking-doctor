import { UserRole } from '../enums';
import { IdType } from './common';

interface IUser {
    firstname?: string;
    lastname?: string;
    username?: string;
    role?: UserRole;
    profilePicture?: string;
    id?: IdType;
    email?: string;
    password?: string;
}