import { DateType, IdType } from "./common";
import { IStory } from "./story";
import { IUser } from "./user";

interface IComment {
    id?: IdType;
    user?: IUser;
    story?: IStory;
    comment?: string;
    image?: string;
    rating?: number;
    user_id?: IdType;
    story_id?: IdType;
    created_at?: DateType;
}

interface IAddCommentPayload {
    comment: IComment;
}

interface IDeleteCommentPayload {
    id: IdType;
}
