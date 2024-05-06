import { axiosInstanceBookingDoctor } from '@/config/axios/axiosClient';
import { IdType } from '@/models/interfaces';
import { IAddCommentPayload, IComment, IDeleteCommentPayload } from '@/models/interfaces/comment';

const REST = 'comment';

export const getCommentByStoryId = async (id: IdType): Promise<IComment[]> => {
    const url = `${REST}/story`;
    const params = {
        id,
    };
    const response: IComment[] = await axiosInstanceBookingDoctor.get(url, {
        params,
    });

    return response;
};

export const getComment = async (id: IdType): Promise<IComment> => {
    const url = `${REST}`;
    const params = {
        id,
    };
    const response: IComment = await axiosInstanceBookingDoctor.get(url, {
        params,
    });

    return response;
};

export const getAllComment = async (): Promise<IComment[]> => {
    const url = `${REST}/all`;
    const response: IComment[] = await axiosInstanceBookingDoctor.get(url);

    return response;
};

export const addComment = async (payload: IAddCommentPayload): Promise<void> => {
    const {
        comment: { id, ...comment },
    } = payload;
    const url = `${REST}/add`;
    await axiosInstanceBookingDoctor.post(url, comment);
};

export const deleteComment = async (payload: IDeleteCommentPayload): Promise<void> => {
    const { id } = payload;
    const url = `${REST}/delete`;

    await axiosInstanceBookingDoctor.delete(url, {
        params: {
            id,
        },
    });
};

export const updateComment = async (payload: IAddCommentPayload): Promise<void> => {
    const {
        comment: { id, ...comment },
    } = payload;

    const url = `${REST}/update`;
    await axiosInstanceBookingDoctor.put(url, comment, {
        params: { id },
    });
};
