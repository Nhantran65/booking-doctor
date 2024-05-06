import { getAllStory, getStory } from '@/api/story';
import { STORY_KEYS } from '@/models/enums/storyKeys';
import { IdType } from '@/models/interfaces';
import { useQuery } from '@tanstack/react-query';

export const useGetAllStory = () => {
    return useQuery({
        queryKey: [STORY_KEYS.GET_ALL_STORY],
        queryFn: async () => {
            return await getAllStory();
        },
    });
};

export const useGetStoryById = (id?: IdType) => {
    return useQuery({
        queryKey: [STORY_KEYS.GET_STORY_BY_ID, id],
        queryFn: async () => {
            if (id) return await getStory(id);
        },
    });
};
