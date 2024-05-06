import { axiosInstanceBookingDoctor } from '@/config/axios/axiosClient';
import { IdType } from '@/models/interfaces';

const REST = 'clinic';

export const getAllClinic = async (): Promise<IClinic[]> => {
    const url = `${REST}/all`;
    const response: IClinic[] = await axiosInstanceBookingDoctor.get(url);

    return response;
};

export const getClinic = async (id: IdType): Promise<IClinic> => {
    const url = `${REST}`;
    const params = {
        id,
    };
    const response: IClinic = await axiosInstanceBookingDoctor.get(url, {
        params,
    });

    return response;
};

export const addClinic = async (payload: IAddClinicPayload): Promise<void> => {
    const {
        clinic: { id, ...clinic },
    } = payload;
    const url = `${REST}/add`;
    await axiosInstanceBookingDoctor.post(url, clinic);
};

export const deleteClinic = async (payload: IDeleteClinicPayload): Promise<void> => {
    const { id } = payload;
    const url = `${REST}/delete`;

    await axiosInstanceBookingDoctor.delete(url, {
        params: {
            id,
        },
    });
};

export const updateClinic = async (payload: IAddClinicPayload): Promise<void> => {
    const {
        clinic: { id, ...clinic },
    } = payload;

    const url = `${REST}/update`;
    await axiosInstanceBookingDoctor.put(url, clinic, {
        params: { id },
    });
};
