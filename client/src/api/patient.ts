import { axiosInstanceBookingDoctor } from '@/config/axios/axiosClient';
import { IUser } from '@/models/interfaces/user';

const REST = 'patient';

export const getAllPatient = async (): Promise<IUser[]> => {
    const url = `${REST}/all`;
    const response: IUser[] = await axiosInstanceBookingDoctor.get(url);

    return response;
};

export const addPatient = async (payload: IAddPatientPayload): Promise<void> => {
    const {
        patient: { id, ...patient },
    } = payload;
    const url = `${REST}/add`;
    await axiosInstanceBookingDoctor.post(url, patient);
};

export const deletePatient = async (payload: IDeletePatientPayload): Promise<void> => {
    const { id } = payload;
    const url = `${REST}/delete`;

    await axiosInstanceBookingDoctor.delete(url, {
        params: {
            id,
        },
    });
};

export const updatePatient = async (payload: IAddPatientPayload): Promise<void> => {
    const {
        patient: { id, ...patient },
    } = payload;

    const url = `${REST}/update`;
    await axiosInstanceBookingDoctor.put(url, patient, {
        params: { id },
    });
};
