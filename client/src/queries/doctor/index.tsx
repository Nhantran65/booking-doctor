import { getAllDoctor, getDoctor } from '@/api/doctor';
import { DOCTOR_KEYS } from '@/models/enums/doctorKeys';
import { IdType } from '@/models/interfaces';
import { useQuery } from '@tanstack/react-query';

export const useGetAllDoctor = () => {
    return useQuery({
        queryKey: [DOCTOR_KEYS.GET_ALL_DOCTOR],
        queryFn: async () => {
            return await getAllDoctor();
        },
    });
};

export const useGetDoctorById = (id?: IdType) => {
    return useQuery({
        queryKey: [DOCTOR_KEYS.GET_DOCTOR_BY_ID, id],
        queryFn: async () => {
            if (id) return await getDoctor(id);
        },
    });
};

