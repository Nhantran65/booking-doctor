interface IClinic {
    id?: IdType;
    name?: string;
    description?: string;
    address?: string;
    phone?: string;
    email?: string;
    website?: string;
    established?: DateType;
}

interface IAddClinicPayload {
    clinic: IClinic;
}

interface IDeleteClinicPayload {
    id: IdType;
}
