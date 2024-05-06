import { IStory } from '@/models/interfaces/story';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Popconfirm } from 'antd';

const { Meta } = Card;

interface IProps {
    story: IStory;
    handleDeleteStory: (story: IStory) => void;
    handleOpenModalEditStory: (story: IStory) => void;
}

const Post = ({ story, handleDeleteStory }: IProps) => {
    return (
        <Col span={8}>
            <Card
                style={{ width: '100%' }}
                cover={
                    <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                }
                actions={[
                    <EyeOutlined />,
                    <EditOutlined key="edit" onClick={() => {}} />,
                    <Popconfirm
                        title="Delete the story"
                        description="Are you sure to delete this story?"
                        onConfirm={() => handleDeleteStory(story)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined />
                    </Popconfirm>,
                ]}
            >
                <Meta
                    avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                    title={story.title}
                    description={story.content}
                />
            </Card>
        </Col>
    );
};

export default Post;
