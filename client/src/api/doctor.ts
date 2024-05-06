import { axiosInstanceBookingDoctor } from '@/config/axios/axiosClient';
import { IdType } from '@/models/interfaces';
import { IUser } from '@/models/interfaces/user';

const REST = 'doctor';

export const getAllDoctor = async (): Promise<IUser[]> => {
    const url = `${REST}/all`;
    const response: IUser[] = await axiosInstanceBookingDoctor.get(url);

    return response;
};

export const getDoctor = async (id: IdType): Promise<IUser> => {
    const url = `${REST}`;
    const params = {
        id,
    };
    const response: IUser = await axiosInstanceBookingDoctor.get(url, {
        params,
    });

    return response;
};

export const addDoctor = async (payload: IAddDoctorPayload): Promise<void> => {
    const {
        doctor: { id, ...doctor },
    } = payload;
    const url = `${REST}/add`;
    await axiosInstanceBookingDoctor.post(url, doctor);
};

export const deleteDoctor = async (payload: IDeleteDoctorPayload): Promise<void> => {
    const { id } = payload;
    const url = `${REST}/delete`;

    await axiosInstanceBookingDoctor.delete(url, {
        params: {
            id,
        },
    });
};

export const updateDoctor = async (payload: IAddDoctorPayload): Promise<void> => {
    const {
        doctor: { id, ...doctor },
    } = payload;

    const url = `${REST}/update`;
    await axiosInstanceBookingDoctor.put(url, doctor, {
        params: { id },
    });
};
