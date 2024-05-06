import { addComment } from '@/api/comment';
import { toaster } from '@/config/package/toast';
import { DEFAULT_RATING, SKELETON_USER } from '@/models/constants';
import { STORY_KEYS } from '@/models/enums/storyKeys';
import { useGetCommentByStoryId } from '@/queries/comment';
import { useGetStoryById } from '@/queries/story';
import { useGetUserInfo } from '@/queries/user';
import { Comment } from '@ant-design/compatible';
import { useQueryClient } from '@tanstack/react-query';
import { Avatar, Button, Card, Divider, Form, Rate, Tooltip } from 'antd';
import Meta from 'antd/es/card/Meta';
import TextArea from 'antd/es/input/TextArea';
import moment from 'moment';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BlogDetailsWrapper } from './styles';
import { COMMENT_KEYS } from '@/models/enums/commentKeys';
import { PATH_AUTH } from '@/routes/paths';

const BlogDetails = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [comment, setComment] = useState<string>('');
    const [rating, setRating] = useState<number>(DEFAULT_RATING);
    const { story_id } = useParams();
    const { data: story } = useGetStoryById(Number(story_id));
    const { data: comments } = useGetCommentByStoryId(Number(story_id));

    const { data: userInfo } = useGetUserInfo();
    const queryClient = useQueryClient();

    const handleAddComment = async () => {
        setIsLoading(true);
        try {
            if (comment) {
                await addComment({
                    comment: {
                        comment,
                        rating,
                        story_id: Number(story_id),
                        user_id: userInfo?.id,
                        created_at: Date.now().toString(),
                    },
                });
                toaster.success({
                    title: 'Success',
                    text: 'Add comment successfully',
                });
            }
            queryClient.invalidateQueries({
                queryKey: [STORY_KEYS.GET_STORY_BY_ID],
            });

            queryClient.invalidateQueries({
                queryKey: [COMMENT_KEYS.GET_COMMENT_BY_STORY_ID],
            });

            setComment('');
            setRating(DEFAULT_RATING);
        } catch (err) {
            console.log('err', err);

            toaster.error({
                title: 'Error',
                text: 'Somethings when wrong, please try again',
            });
        }

        setIsLoading(false);
    };

    return (
        <BlogDetailsWrapper>
            <Card hoverable>
                <Meta
                    title={story?.title}
                    description={
                        <div>
                            <span>{story?.content}</span>
                            {story?.image && (
                                <p>
                                    <img src={story?.image} alt="image" />
                                </p>
                            )}
                        </div>
                    }
                />
                <Divider />

                {comments?.map(comment => (
                    <React.Fragment key={comment.id}>
                        <Comment
                            actions={[]}
                            author={<a>{comment.user?.username}</a>}
                            avatar={
                                <Avatar
                                    src={comment.user?.profilePicture || SKELETON_USER}
                                    alt="Han Solo"
                                />
                            }
                            content={<p>{comment.comment}</p>}
                            datetime={
                                <Tooltip
                                    title={moment(comment.created_at).format('YYYY-MM-DD HH:mm:ss')}
                                >
                                    <span>{moment(comment.created_at).fromNow()}</span>
                                </Tooltip>
                            }
                            children={<Rate allowHalf value={comment.rating} />}
                        />
                    </React.Fragment>
                ))}
                {userInfo?.id ? (
                    <Comment
                        avatar={
                            <Avatar
                                src={userInfo?.profilePicture || SKELETON_USER}
                                alt="Han Solo"
                            />
                        }
                        content={
                            <div>
                                <Form.Item>
                                    <TextArea
                                        value={comment}
                                        onChange={e => setComment(e.target.value)}
                                        rows={4}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Rate
                                        allowHalf
                                        value={rating}
                                        onChange={rating => setRating(rating)}
                                    />
                                    ;
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        htmlType="submit"
                                        loading={isLoading}
                                        onClick={handleAddComment}
                                        type="primary"
                                    >
                                        Add Comment
                                    </Button>
                                </Form.Item>
                            </div>
                        }
                    />
                ) : (
                    <div>
                        <Divider></Divider>
                        <h3
                            style={{
                                marginTop: 20,
                            }}
                        >
                            Please <Link to={PATH_AUTH.SIGN_IN}>Sign in</Link> to comment
                        </h3>
                    </div>
                )}
            </Card>
        </BlogDetailsWrapper>
    );
};

export default BlogDetails;
