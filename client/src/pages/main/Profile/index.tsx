import { toaster } from '@/config/package/toast';
import { SKELETON_USER } from '@/models/constants';
import { AUTH_KEYS } from '@/models/enums/authKeys';
import { useGetUserInfo } from '@/queries/user';
import { useQueryClient } from '@tanstack/react-query';
import type { FormInstance } from 'antd';
import { Avatar, Button, Card, Col, Form, Input, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react';
import { ProfileWrapper } from './styles';
import { updateUserInfo } from '@/api/auth';
import { IUser } from '@/models/interfaces/user';

const { TextArea } = Input;

const Profile = () => {
    const { data: userInfo } = useGetUserInfo();
    const [isEditingAccountInformation, setIsEditingAccountInformation] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const [form] = useForm();

    const handleEditingAccountInformation = () => {
        setIsEditingAccountInformation(true);
    };

    console.log('userInfo', userInfo);

    const cancelEditingAccountInformation = () => {
        setIsEditingAccountInformation(false);
    };

    const handleOk = async (user: IUser) => {
        setIsLoading(true);

        try {
            await updateUserInfo({
                id: userInfo?.id,
                firstname: user.firstname,
                lastname: user.lastname,
                profilepicture: user.profilePicture,
            });

            toaster.success({
                title: 'Success',
                text: 'Edit profile successfully',
            });
            queryClient.invalidateQueries({ queryKey: [AUTH_KEYS.EDIT_PROFILE] });
            queryClient.invalidateQueries({ queryKey: ['GET_INFO'] });
            setIsEditingAccountInformation(false);
        } catch (err) {
            toaster.error({
                title: 'Error',
                text: 'Somethings when wrong, please try again',
            });
        }

        setIsLoading(false);
    };

    useEffect(() => {
        form.setFieldsValue({
            firstname: userInfo?.firstname,
            lastname: userInfo?.lastname,
            email: userInfo?.email,
            profilePicture: userInfo?.profilePicture,
        });
    }, [form, userInfo]);

    return (
        <ProfileWrapper>
            <Card
                title="Profile"
                extra={
                    <>
                        {isEditingAccountInformation && (
                            <div className="align-self-center d-flex column-gap-2 ">
                                <Button
                                    className="btn btn-secondary"
                                    onClick={cancelEditingAccountInformation}
                                >
                                    Cancel
                                </Button>
                                <SubmitButton form={form}>Save</SubmitButton>
                            </div>
                        )}
                        {!isEditingAccountInformation && (
                            <Button onClick={handleEditingAccountInformation}>Edit</Button>
                        )}
                    </>
                }
            >
                <Form
                    form={form}
                    id={'submitInfo'}
                    initialValues={{
                        firstname: userInfo?.firstname,
                        lastname: userInfo?.lastname,
                        email: userInfo?.email,
                        profilePicture: userInfo?.profilePicture,
                    }}
                    onFinish={handleOk}
                >
                    <Row gutter={10}>
                        <Col span={24}>
                            <Form.Item
                                label="Avatar"
                                style={{
                                    textAlign: 'center',
                                }}
                                name="profilePicture"
                            >
                                {isEditingAccountInformation ? (
                                    <Input />
                                ) : (
                                    <Avatar
                                        size={160}
                                        src={userInfo?.profilePicture || SKELETON_USER}
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{
                                    sm: 12,
                                }}
                                labelAlign="left"
                                label="First name"
                                name="firstname"
                            >
                                {isEditingAccountInformation ? (
                                    <Input />
                                ) : (
                                    <div
                                        style={{
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {userInfo?.firstname}
                                    </div>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{
                                    sm: 12,
                                }}
                                labelAlign="left"
                                label="Last name"
                                name="lastname"
                            >
                                {isEditingAccountInformation ? (
                                    <Input />
                                ) : (
                                    <div
                                        style={{
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {userInfo?.lastname}
                                    </div>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{
                                    sm: 12,
                                }}
                                labelAlign="left"
                                label="Email"
                                name="email"
                            >
                                <div
                                    style={{
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {userInfo?.email}
                                </div>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                labelCol={{
                                    sm: 12,
                                }}
                                labelAlign="left"
                                label="Role"
                            >
                                <div
                                    style={{
                                        fontWeight: 'bold',
                                        textTransform: 'capitalize',
                                    }}
                                >
                                    {userInfo?.role}
                                </div>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </ProfileWrapper>
    );
};

interface SubmitButtonProps {
    form: FormInstance;
}

const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({ form, children }) => {
    const [submittable, setSubmittable] = React.useState<boolean>(false);

    // Watch all values
    const values = Form.useWatch([], form);

    React.useEffect(() => {
        form.validateFields({ validateOnly: true })
            .then(() => setSubmittable(true))
            .catch(() => setSubmittable(false));
    }, [form, values]);

    return (
        <Button form={'submitInfo'} type="primary" htmlType="submit" disabled={!submittable}>
            {children}
        </Button>
    );
};

export default Profile;
