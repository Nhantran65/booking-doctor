import { UserRole } from "../enums";
import { DateType } from "./common";

interface INotification {
    id?: IdType;
    createdAt?: DateType;
    message?: string;
    recipient?: IUser;
    appointment?: IAppointment;
    recipientRole?: UserRole;
    statusChange?: boolean;
}

