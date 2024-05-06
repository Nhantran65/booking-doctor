import { getUserInfoAPI } from '@/api/auth';
import { TOKEN } from '@/models/constants';
import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';

export const useGetUserInfo = () => {
    const [cookies] = useCookies();

    const jwtToken = cookies[TOKEN];
    return useQuery({
        queryKey: ['GET_INFO', jwtToken],
        queryFn: async () => {
            if (jwtToken) return await getUserInfoAPI();
        },
    });
};

// export const useGetListUsersByIds = (listUserIds?: number[], key?: string) => {
//     const canCall = Boolean(
//         listUserIds && listUserIds.length > 0 && listUserIds.some((item) => item)
//     );

//     return useQuery({
//         queryKey: [key, listUserIds],
//         queryFn: async () => {
//             if (listUserIds) {
//                 const path = convertParamsToUrl(listUserIds);
//                 return await getUserinfoByIdsAPI(path);
//             }
//             return null;
//         },
//         enabled: canCall,
//         refetchOnWindowFocus: false,
//     });
// };
