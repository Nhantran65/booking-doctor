import { getCommentByStoryId } from '@/api/comment';
import { COMMENT_KEYS } from '@/models/enums/commentKeys';
import { IdType } from '@/models/interfaces';
import { useQuery } from '@tanstack/react-query';

export const useGetCommentByStoryId = (id?: IdType) => {
    return useQuery({
        queryKey: [COMMENT_KEYS.GET_COMMENT_BY_STORY_ID, id],
        queryFn: async () => {
            if (id) return await getCommentByStoryId(id);
        },
    });
};
