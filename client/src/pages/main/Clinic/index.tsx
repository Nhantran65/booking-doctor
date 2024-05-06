import { addClinic, deleteClinic, updateClinic } from '@/api/clinic';
import { toaster } from '@/config/package/toast';
import { CLINIC_KEYS } from '@/models/enums/clinicKeys';
import { useGetAllClinic } from '@/queries/clinic';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Card, Form, Input, Modal, Popconfirm } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ClinicItem, ClinicLabel, ClinicValue, ClinicWrapper } from './styles';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined, EyeOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import { useGetUserInfo } from '@/queries/user';
import { UserRole } from '@/models/enums';
import { PATH_MAIN } from '@/routes/paths';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;

const Clinic = () => {
    const { t } = useTranslation(['clinic']);
    const [clinicEditing, setClinicEditing] = useState<IClinic | null>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const { data: userInfo } = useGetUserInfo();
    const queryClient = useQueryClient();
    const { data: clinics } = useGetAllClinic();
    const [form] = useForm();

    const handleOk = async (clinic: IClinic) => {
        setIsLoading(true);
        try {
            clinic.id = clinicEditing?.id;
            if (clinic.id) {
                await updateClinic({
                    clinic: clinic,
                });
                toaster.success({
                    title: 'Success',
                    text: 'Edit clinic successfully',
                });
            } else {
                await addClinic({
                    clinic: clinic,
                });
                toaster.success({
                    title: 'Success',
                    text: 'Edit clinic successfully',
                });
            }
        } catch (err) {
            toaster.error({
                title: 'Error',
                text: 'Somethings when wrong, please try again',
            });
        }

        queryClient.invalidateQueries({ queryKey: [CLINIC_KEYS.GET_ALL_CLINIC] });
        setIsLoading(false);
        setClinicEditing(null);
    };

    const handleCancel = () => {
        setClinicEditing(null);
    };

    const handleOpenModalEditClinic = (clinic: IClinic) => {
        setClinicEditing(clinic);
    };

    const handleDeleteClinic = async (clinic: IClinic) => {
        setIsLoading(true);

        try {
            await deleteClinic({
                id: clinic.id,
            });
            toaster.success({
                title: 'Success',
                text: 'Edit clinic successfully',
            });
            queryClient.invalidateQueries({ queryKey: [CLINIC_KEYS.GET_ALL_CLINIC] });
        } catch (err) {}
        setIsLoading(false);
    };

    useEffect(() => {
        form.setFieldsValue({
            name: clinicEditing?.name,
            email: clinicEditing?.email,
            phone: clinicEditing?.phone,
            website: clinicEditing?.website,
            address: clinicEditing?.address,
            description: clinicEditing?.description,
        });
    }, [form, clinicEditing]);

    return (
        <ClinicWrapper>
            <Card
                title="List Clinic"
                extra={
                    userInfo?.role !== UserRole.PATIENT &&
                    userInfo?.role !== UserRole.DOCTOR &&
                    userInfo?.id && (
                        <>
                            <Button
                                icon={<PlusCircleOutlined />}
                                onClick={() =>
                                    setClinicEditing({
                                        address: '',
                                        description: '',
                                        email: '',
                                        name: '',
                                        phone: '',
                                        website: '',
                                    })
                                }
                            >
                                Create new clinic
                            </Button>
                        </>
                    )
                }
            >
                {clinics?.map(clinic => (
                    <Card
                        style={{ marginTop: 16 }}
                        type="inner"
                        title={clinic.name}
                        extra={
                            <>
                                <Button
                                    icon={<EyeOutlined />}
                                    onClick={() => navigate(`${PATH_MAIN.CLINIC}/${clinic.id}`)}
                                ></Button>
                                {userInfo?.role !== UserRole.PATIENT &&
                                    userInfo?.role !== UserRole.DOCTOR &&
                                    userInfo?.id && (
                                        <>
                                            <Button
                                                icon={<EditOutlined />}
                                                onClick={() => handleOpenModalEditClinic(clinic)}
                                            ></Button>{' '}
                                            <Popconfirm
                                                title="Delete the clinic"
                                                description="Are you sure to delete this clinic?"
                                                onConfirm={() => handleDeleteClinic(clinic)}
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
                                        </>
                                    )}
                            </>
                        }
                    >
                        <ClinicItem>
                            <ClinicLabel>Email: </ClinicLabel>
                            <ClinicValue>{clinic.email}</ClinicValue>
                        </ClinicItem>
                        <ClinicItem>
                            <ClinicLabel>Phone: </ClinicLabel>
                            <ClinicValue>{clinic.phone}</ClinicValue>
                        </ClinicItem>
                        <ClinicItem>
                            <ClinicLabel>Website: </ClinicLabel>
                            <ClinicValue>{clinic.website}</ClinicValue>
                        </ClinicItem>
                        <ClinicItem>
                            <ClinicLabel>Address: </ClinicLabel>
                            <ClinicValue>{clinic.address}</ClinicValue>
                        </ClinicItem>
                        <ClinicItem>
                            <ClinicLabel>Description: </ClinicLabel>
                            <ClinicValue>{clinic.description}</ClinicValue>
                        </ClinicItem>
                    </Card>
                ))}
            </Card>

            <Modal
                title={clinicEditing?.id ? 'Edit clinic' : 'Create clinic'}
                open={Boolean(clinicEditing)}
                onCancel={handleCancel}
                footer={[
                    <Button form="submitClinic" key="submit" htmlType="submit">
                        {clinicEditing?.id ? 'Edit' : 'Create'}
                    </Button>,
                ]}
            >
                <Form
                    form={form}
                    id={'submitClinic'}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    onFinish={handleOk}
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item name="name" label="Name">
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email">
                        <Input />
                    </Form.Item>
                    <Form.Item name="phone" label="Phone">
                        <Input />
                    </Form.Item>
                    <Form.Item name="website" label="Website">
                        <Input />
                    </Form.Item>
                    <Form.Item name="address" label="Address">
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </ClinicWrapper>
    );
};

export default Clinic;
