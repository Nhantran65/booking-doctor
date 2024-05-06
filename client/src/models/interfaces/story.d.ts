import { IdType } from './common';
import { IUser } from './user';

interface IStory {
    id?: IdType;
    user?: IUser;
    title?: string;
    content?: string;
    image?: string;
    user_id?: IdType;
}

interface IAddStoryPayload {
    story: IStory;
}

interface IDeleteStoryPayload {
    id: IdType;
}
