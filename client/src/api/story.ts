import { axiosInstanceBookingDoctor } from '@/config/axios/axiosClient';
import { IdType } from '@/models/interfaces';
import { IAddStoryPayload, IDeleteStoryPayload, IStory } from '@/models/interfaces/story';

const REST = 'story';

export const getStory = async (id: IdType): Promise<IStory> => {
    const url = `${REST}`;
    const params = {
        id
    };
    const response: IStory = await axiosInstanceBookingDoctor.get(url, {
        params
    });

    return response;
};

export const getAllStory = async (): Promise<IStory[]> => {
    const url = `${REST}/all`;
    const response: IStory[] = await axiosInstanceBookingDoctor.get(url);

    return response;
};

export const addStory = async (payload: IAddStoryPayload): Promise<void> => {
    const {
        story: { id, ...story },
    } = payload;
    const url = `${REST}/add`;
    await axiosInstanceBookingDoctor.post(url, story);
};

export const deleteStory = async (payload: IDeleteStoryPayload): Promise<void> => {
    const { id } = payload;
    const url = `${REST}/delete`;

    await axiosInstanceBookingDoctor.delete(url, {
        params: {
            id,
        },
    });
};

export const updateStory = async (payload: IAddStoryPayload): Promise<void> => {
    const {
        story: { id, ...story },
    } = payload;

    const url = `${REST}/update`;
    await axiosInstanceBookingDoctor.put(url, story, {
        params: { id },
    });
};
