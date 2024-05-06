import { getAllClinic, getClinic } from '@/api/clinic';
import { CLINIC_KEYS } from '@/models/enums/clinicKeys';
import { IdType } from '@/models/interfaces';
import { useQuery } from '@tanstack/react-query';

export const useGetAllClinic = () => {
    return useQuery({
        queryKey: [CLINIC_KEYS.GET_ALL_CLINIC],
        queryFn: async () => {
            return await getAllClinic();
        },
    });
};

export const useGetClinicById = (id?: IdType) => {
    return useQuery({
        queryKey: [CLINIC_KEYS.GET_CLINIC_BY_ID, id],
        queryFn: async () => {
            if (id) return await getClinic(id);
        },
    });
};
