import { axiosInstanceBookingDoctor } from '@/config/axios/axiosClient';
import { IdType } from '@/models/interfaces';
import { INotification } from '@/models/interfaces/notification';

const REST = 'notification';

export const getAllNotification = async (userId: IdType): Promise<INotification[]> => {
    const url = `${REST}/all`;
    const response: INotification[] = await axiosInstanceBookingDoctor.get(url, {
        params: {
            recipientId: userId
        }
    });

    return response;
};