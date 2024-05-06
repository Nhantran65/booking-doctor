import { getAllStatus } from '@/api/status';
import { STATUS_KEYS } from '@/models/enums/statusKeys';
import { useQuery } from '@tanstack/react-query';

export const useGetAllStatus = () => {
    return useQuery({
        queryKey: [STATUS_KEYS.GET_ALL_STATUS],
        queryFn: async () => {
            return await getAllStatus();
        },
    });
};
