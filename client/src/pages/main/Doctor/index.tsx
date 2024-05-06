import { addDoctor, deleteDoctor, updateDoctor } from '@/api/doctor';
import { toaster } from '@/config/package/toast';
import { DOCTOR_KEYS } from '@/models/enums/doctorKeys';
import { IUser } from '@/models/interfaces/user';
import { useGetAllDoctor } from '@/queries/doctor';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined, EyeOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Avatar, Button, Card, Form, Input, Modal, Popconfirm, Spin } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import { DoctorItem, DoctorLabel, DoctorValue, DoctorWrapper } from './styles';
import { useGetUserInfo } from '@/queries/user';
import { UserRole } from '@/models/enums';
import { useNavigate } from 'react-router-dom';
import { PATH_MAIN } from '@/routes/paths';

const { TextArea } = Input;

const DoctorPage = () => {
    const [doctorEditing, setDoctorEditing] = useState<IUser | null>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const queryClient = useQueryClient();
    const { data: doctors } = useGetAllDoctor();
    const { data: userInfo } = useGetUserInfo();
    const navigate = useNavigate();
    const [form] = useForm();

    const handleOk = async (doctor: IUser) => {
        setIsLoading(true);
        try {
            doctor.id = doctorEditing?.id;
            if (doctor.id) {
                await updateDoctor({
                    doctor: doctor,
                });
                toaster.success({
                    title: 'Success',
                    text: 'Edit doctor successfully',
                });
            } else {
                await addDoctor({
                    doctor: doctor,
                });
                toaster.success({
                    title: 'Success',
                    text: 'Edit doctor successfully',
                });
            }
        } catch (err) {
            toaster.error({
                title: 'Error',
                text: 'Somethings when wrong, please try again',
            });
        }

        queryClient.invalidateQueries({ queryKey: [DOCTOR_KEYS.GET_ALL_DOCTOR] });
        setIsLoading(false);
        setDoctorEditing(null);
    };

    const handleCancel = () => {
        setDoctorEditing(null);
    };

    const handleOpenModalEditDoctor = (doctor: IUser) => {
        setDoctorEditing(doctor);
    };

    const handleDeleteDoctor = async (doctor: IUser) => {
        setIsLoading(true);

        try {
            await deleteDoctor({
                id: doctor.id,
            });
            toaster.success({
                title: 'Success',
                text: 'Edit doctor successfully',
            });
            queryClient.invalidateQueries({ queryKey: [DOCTOR_KEYS.GET_ALL_DOCTOR] });
        } catch (err) {}
        setIsLoading(false);
    };

    const checkPermissionByRole = (doctor: IUser) => {
        switch (userInfo?.role) {
            case UserRole.PATIENT:
                return false;
            case UserRole.DOCTOR:
                return doctor.id === userInfo?.id;
            case UserRole.ADMIN:
                return true;
        }
    };

    useEffect(() => {
        form.setFieldsValue({
            email: doctorEditing?.email,
            password: doctorEditing?.password,
            firstname: doctorEditing?.firstname,
            lastname: doctorEditing?.lastname,
            profilePicture: doctorEditing?.profilePicture,
        });
    }, [form, doctorEditing]);

    console.log(
        'a',
        userInfo?.role !== UserRole.PATIENT, userInfo?.role !== UserRole.DOCTOR, userInfo?.id
    );

    return (
        <DoctorWrapper>
            <Spin spinning={isLoading}>
                <Card
                    title="List Doctor"
                    extra={
                        userInfo?.role !== UserRole.PATIENT &&
                        userInfo?.role !== UserRole.DOCTOR &&
                        userInfo?.id && (
                            <>
                                <Button
                                    icon={<PlusCircleOutlined />}
                                    onClick={() =>
                                        setDoctorEditing({
                                            email: '',
                                            firstname: '',
                                            lastname: '',
                                            profilePicture: '',
                                        })
                                    }
                                >
                                    Create new doctor
                                </Button>
                            </>
                        )
                    }
                >
                    {doctors?.map(doctor => (
                        <Card
                            style={{ marginTop: 16 }}
                            type="inner"
                            title={doctor.firstname + ' ' + doctor.lastname}
                            extra={
                                <>
                                    <Button
                                        icon={<EyeOutlined />}
                                        onClick={() => navigate(`${PATH_MAIN.DOCTOR}/${doctor.id}`)}
                                    ></Button>{' '}
                                    {checkPermissionByRole(doctor) && (
                                        <>
                                            <Button
                                                icon={<EditOutlined />}
                                                onClick={() => handleOpenModalEditDoctor(doctor)}
                                            ></Button>{' '}
                                            {doctor.id !== userInfo?.id && (
                                                <Popconfirm
                                                    title="Delete the doctor"
                                                    description="Are you sure to delete this doctor?"
                                                    onConfirm={() => handleDeleteDoctor(doctor)}
                                                    // onCancel={cancel}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <Button
                                                        danger
                                                        color="red"
                                                        icon={<DeleteOutlined />}
                                                    ></Button>{' '}
                                                </Popconfirm>
                                            )}
                                        </>
                                    )}
                                </>
                            }
                        >
                            <DoctorItem>
                                <DoctorLabel>Avatar: </DoctorLabel>
                                <DoctorValue>
                                    <Avatar
                                        src={
                                            doctor.profilePicture ||
                                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMx03DGxzfi45kCGHdGl84Whx7_k0IP_Sq81DpD4nh9w&s'
                                        }
                                    />
                                </DoctorValue>
                            </DoctorItem>
                            <DoctorItem>
                                <DoctorLabel>Email: </DoctorLabel>
                                <DoctorValue>{doctor.email}</DoctorValue>
                            </DoctorItem>
                            <DoctorItem>
                                <DoctorLabel>First name: </DoctorLabel>
                                <DoctorValue>{doctor.firstname}</DoctorValue>
                            </DoctorItem>
                            <DoctorItem>
                                <DoctorLabel>Last name: </DoctorLabel>
                                <DoctorValue>{doctor.lastname}</DoctorValue>
                            </DoctorItem>
                        </Card>
                    ))}
                </Card>
            </Spin>

            <Modal
                title={doctorEditing?.id ? 'Edit doctor' : 'Create doctor'}
                open={Boolean(doctorEditing)}
                onCancel={handleCancel}
                footer={[
                    <Button form="submitDoctor" key="submit" htmlType="submit">
                        {doctorEditing?.id ? 'Edit' : 'Create'}
                    </Button>,
                ]}
            >
                <Form
                    form={form}
                    id={'submitDoctor'}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    onFinish={handleOk}
                    style={{ maxWidth: 600 }}
                    initialValues={{
                        email: doctorEditing?.email,
                        password: doctorEditing?.password,
                        firstname: doctorEditing?.firstname,
                        lastname: doctorEditing?.lastname,
                        profilePicture: doctorEditing?.profilePicture,
                    }}
                >
                    <Form.Item name="profilePicture" label="Avatar Url">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true },
                            {
                                type: 'email',
                                message: 'Invalid email',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    {!doctorEditing?.id && (
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    )}

                    <Form.Item name="firstname" label="First name">
                        <Input />
                    </Form.Item>
                    <Form.Item name="lastname" label="Last name">
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </DoctorWrapper>
    );
};

export default DoctorPage;
