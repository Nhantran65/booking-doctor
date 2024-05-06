import { SKELETON_USER } from '@/models/constants';
import { UserRole } from '@/models/enums';
import { IStory } from '@/models/interfaces/story';
import { useGetUserInfo } from '@/queries/user';
import { PATH_MAIN } from '@/routes/paths';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Popconfirm } from 'antd';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

const { Meta } = Card;

interface IProps {
    story: IStory;
    handleDeleteStory: (story: IStory) => void;
    handleOpenModalEditStory: (story: IStory) => void;
}

const Post = ({ story, handleDeleteStory, handleOpenModalEditStory }: IProps) => {
    const { data: userInfo } = useGetUserInfo();
    const actions = useMemo(() => {
        const listActions = ['READ'];
        switch (userInfo?.role) {
            case UserRole.PATIENT:
                if (story.user?.id === userInfo?.id) listActions.push('DELETE', 'UPDATE');
                break;
            case UserRole.DOCTOR:
                if (story.user?.id === userInfo?.id) listActions.push('DELETE', 'UPDATE');
                break;
            case UserRole.ADMIN:
                listActions.push('DELETE', 'UPDATE');
                break;
        }

        const actionsComponents = [];
        if (listActions.includes('READ'))
            actionsComponents.push(
                <Link to={`${PATH_MAIN.BLOG}/${story.id}`}>
                    <EyeOutlined />
                </Link>
            );

        if (listActions.includes('UPDATE'))
            actionsComponents.push(
                <EditOutlined key="edit" onClick={() => handleOpenModalEditStory(story)} />
            );

        if (listActions.includes('DELETE'))
            actionsComponents.push(
                <Popconfirm
                    title="Delete the story"
                    description="Are you sure to delete this story?"
                    onConfirm={() => handleDeleteStory(story)}
                    okText="Yes"
                    cancelText="No"
                >
                    <DeleteOutlined />
                </Popconfirm>
            );

        return actionsComponents;
    }, [userInfo, story]);

    return (
        <Col span={24} md={12} lg={8}>
            <Card style={{ width: '100%' }} actions={actions}>
                <Meta
                    avatar={<Avatar src={story.user?.profilePicture || SKELETON_USER} />}
                    title={story.title}
                    description={
                        <div>
                            <div>{story.content}</div>
                            {story.image && (
                                <div>
                                    <img alt="example" src={story.image} />
                                </div>
                            )}
                        </div>
                    }
                />
            </Card>
        </Col>
    );
};

export default Post;
