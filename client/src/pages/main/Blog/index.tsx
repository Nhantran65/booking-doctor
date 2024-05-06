import { addStory, deleteStory, updateStory } from '@/api/story';
import { toaster } from '@/config/package/toast';
import { STORY_KEYS } from '@/models/enums/storyKeys';
import { IStory } from '@/models/interfaces/story';
import { useGetAllStory } from '@/queries/story';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Card, Form, Input, Modal } from 'antd';
import { useState } from 'react';
import Post from './components/Post';
import { BlogWrapper, ListPost } from './styles';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useGetUserInfo } from '@/queries/user';
import TextArea from 'antd/es/input/TextArea';

const Blog = () => {
    const { data: stories } = useGetAllStory();
    const [storyEditing, setStoryEditing] = useState<IStory | null>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { data: userInfo } = useGetUserInfo();
    const queryClient = useQueryClient();

    const handleOk = async (story: IStory) => {
        setIsLoading(true);
        try {
            story.id = storyEditing?.id;
            if (!userInfo?.id) {
                throw new Error('UserId not found');
            }

            story.user_id = userInfo?.id;

            if (story.id) {
                await updateStory({
                    story: story,
                });
                toaster.success({
                    title: 'Success',
                    text: 'Edit story successfully',
                });
            } else {
                await addStory({
                    story: story,
                });
                toaster.success({
                    title: 'Success',
                    text: 'Edit story successfully',
                });
            }
            queryClient.invalidateQueries({ queryKey: [STORY_KEYS.GET_ALL_STORY] });
        } catch (err) {
            console.log('err', err);

            toaster.error({
                title: 'Error',
                text: 'Somethings when wrong, please try again',
            });
        }

        setIsLoading(false);
        setStoryEditing(null);
    };

    const handleCancel = () => {
        setStoryEditing(null);
    };

    const handleOpenModalEditStory = (story: IStory) => {
        setStoryEditing(story);
    };

    const handleDeleteStory = async (story: IStory) => {
        setIsLoading(true);

        try {
            if (!story.id) {
                throw new Error('UserId not found');
            }
            await deleteStory({
                id: story.id,
            });
            toaster.success({
                title: 'Success',
                text: 'Edit story successfully',
            });
            queryClient.invalidateQueries({ queryKey: [STORY_KEYS.GET_ALL_STORY] });
        } catch (err) {}
        setIsLoading(false);
    };

    return (
        <BlogWrapper>
            <Card
                title="List Story"
                extra={
                    userInfo?.id && (
                        <>
                            <Button
                                icon={<PlusCircleOutlined />}
                                onClick={() =>
                                    setStoryEditing({
                                        content: '',
                                        image: '',
                                        title: '',
                                    })
                                }
                            >
                                Create new story
                            </Button>
                        </>
                    )
                }
            >
                <ListPost gutter={20}>
                    {stories?.map(story => (
                        <Post
                            handleDeleteStory={handleDeleteStory}
                            handleOpenModalEditStory={handleOpenModalEditStory}
                            story={story}
                        />
                    ))}
                </ListPost>
            </Card>

            <Modal
                title={storyEditing?.id ? 'Edit story' : 'Create story'}
                open={Boolean(storyEditing)}
                onCancel={handleCancel}
                footer={[
                    <Button form="submitStory" key="submit" htmlType="submit">
                        {storyEditing?.id ? 'Edit' : 'Create'}
                    </Button>,
                ]}
            >
                <Form
                    id={'submitStory'}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    onFinish={handleOk}
                    style={{ maxWidth: 600 }}
                    initialValues={{
                        title: storyEditing?.title,
                        content: storyEditing?.content,
                        image: storyEditing?.image,
                    }}
                >
                    <Form.Item name="title" label="Title">
                        <Input />
                    </Form.Item>
                    <Form.Item name="content" label="Content">
                        <TextArea />
                    </Form.Item>
                    <Form.Item name="image" label="Image">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </BlogWrapper>
    );
};

export default Blog;
