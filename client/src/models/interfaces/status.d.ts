import { IdType } from './common';
import { IUser } from './user';

interface IStatus {
    id: IdType;
    name: string;
}

interface IAddStatusPayload {
    status: IStatus;
}

interface IDeleteStatusPayload {
    id: IdType;
}
