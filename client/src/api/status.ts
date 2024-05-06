import { axiosInstanceBookingDoctor } from '@/config/axios/axiosClient';
import { IdType } from '@/models/interfaces';
import {
    IAddStatusPayload,
    IDeleteStatusPayload,
    IStatus,
} from '@/models/interfaces/status';

const REST = 'status';

export const getStatus = async (id: IdType): Promise<IStatus> => {
    const url = `${REST}`;
    const params = {
        id,
    };
    const response: IStatus = await axiosInstanceBookingDoctor.get(url, {
        params,
    });

    return response;
};

export const getAllStatus = async (): Promise<IStatus[]> => {
    const url = `${REST}/all`;
    const response: IStatus[] = await axiosInstanceBookingDoctor.get(url);

    return response;
};

export const addStatus = async (payload: IAddStatusPayload): Promise<void> => {
    const {
        status: { id, ...status },
    } = payload;
    const url = `${REST}/add`;
    await axiosInstanceBookingDoctor.post(url, status);
};

export const deleteStatus = async (payload: IDeleteStatusPayload): Promise<void> => {
    const { id } = payload;
    const url = `${REST}/delete`;

    await axiosInstanceBookingDoctor.delete(url, {
        params: {
            id,
        },
    });
};

export const updateStatus = async (payload: IAddStatusPayload): Promise<void> => {
    const {
        status: { id, ...status },
    } = payload;

    const url = `${REST}/update`;
    await axiosInstanceBookingDoctor.put(url, status, {
        params: { id },
    });
};
