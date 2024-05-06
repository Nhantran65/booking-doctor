import { axiosInstanceBookingDoctor } from '@/config/axios/axiosClient';
import { IdType } from '@/models/interfaces';
import {
    IAddAppointmentPayload,
    IAppointment,
    IDeleteAppointmentPayload,
} from '@/models/interfaces/appointment';

const REST = 'appointment';

export const getAppointment = async (id: IdType): Promise<IAppointment> => {
    const url = `${REST}`;
    const params = {
        id,
    };
    const response: IAppointment = await axiosInstanceBookingDoctor.get(url, {
        params,
    });

    return response;
};

export const getAllAppointment = async (): Promise<IAppointment[]> => {
    const url = `${REST}/all`;
    const response: IAppointment[] = await axiosInstanceBookingDoctor.get(url);

    return response;
};

export const addAppointment = async (payload: IAddAppointmentPayload): Promise<void> => {
    const {
        appointment: { id, ...appointment },
    } = payload;
    const url = `${REST}/add`;
    await axiosInstanceBookingDoctor.post(url, appointment);
};

export const deleteAppointment = async (payload: IDeleteAppointmentPayload): Promise<void> => {
    const { id } = payload;
    const url = `${REST}/delete`;

    await axiosInstanceBookingDoctor.delete(url, {
        params: {
            id,
        },
    });
};

export const updateAppointment = async (payload: IAddAppointmentPayload): Promise<void> => {
    const {
        appointment: { id, ...appointment },
    } = payload;

    const url = `${REST}/update`;
    await axiosInstanceBookingDoctor.put(url, appointment, {
        params: { id },
    });
};
