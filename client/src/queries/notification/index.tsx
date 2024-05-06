import { getAllNotification } from '@/api/notification';
import { NOTIFICATION_KEYS } from '@/models/enums/notificationKeys';
import { useQuery } from '@tanstack/react-query';
import { useGetUserInfo } from '../user';

export const useGetNotificationOfUser = () => {
    const { data: userInfo } = useGetUserInfo();
    return useQuery({
        queryKey: [NOTIFICATION_KEYS.GET_ALL_NOTIFICATIONS, userInfo?.id],
        queryFn: async () => {
            if (userInfo?.id) return await getAllNotification(userInfo?.id);
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
