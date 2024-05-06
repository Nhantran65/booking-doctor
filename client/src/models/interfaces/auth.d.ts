import { IdType } from '.';
import { UserRole } from '../enums';

interface IInitialSignInValues {
    email: string;
    password: string;
}
interface ISignInRequest {
    email: string;
    password: string;
}
interface ISignInResponse {
    jwtToken: string;
}

interface ISignUpRequest {
    firstname?: string;
    lastname?: string;
    email: stsring;
    password?: string;
    role?: UserRole;
}

interface IUpdateProfileRequest {
    id?: IdType;
    firstname?: string;
    lastname?: string;
    email?: string;
    profilepicture?: string;
}

interface IInitialSignUpValues {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
}

interface ISignUpRequest {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
}
