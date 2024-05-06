import { getAllPatient } from '@/api/patient';
import { PATIENT_KEYS } from '@/models/enums/patientKeys';
import { useQuery } from '@tanstack/react-query';

export const useGetAllPatient = () => {
    return useQuery({
        queryKey: [PATIENT_KEYS.GET_ALL_PATIENT],
        queryFn: async () => {
            return await getAllPatient();
        },
    });
};
