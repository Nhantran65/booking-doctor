import { getAllAppointment, getAppointment } from '@/api/appointment';
import { APPOINTMENT_KEYS } from '@/models/enums/appointmentKeys';
import { IdType } from '@/models/interfaces';
import { useQuery } from '@tanstack/react-query';

export const useGetAllAppointment = () => {
    return useQuery({
        queryKey: [APPOINTMENT_KEYS.GET_ALL_APPOINTMENT],
        queryFn: async () => {
            return await getAllAppointment();
        },
    });
};

export const useGetAppointmentById = (id?: IdType) => {
    return useQuery({
        queryKey: [APPOINTMENT_KEYS.GET_APPOINTMENT_BY_ID, id],
        queryFn: async () => {
            if (id) return await getAppointment(id);
        },
    });
};
