import { DateType, IdType } from './common';
import { IStatus } from './status';
import { IUser } from './user';

interface IAppointment {
    id?: IdType;
    doctor?: IUser;
    patient?: IUser;
    clinic?: IClinic;
    status?: IStatus;
    doctor_id?: IdType;
    patient_id?: IdType;
    clinic_id?: IdType;
    status_id?: IdType;
    appointment_date?: DateType;
    note?: string;
}

interface IAddAppointmentPayload {
    appointment: IAppointment;
}

interface IDeleteAppointmentPayload {
    id: IdType;
}
