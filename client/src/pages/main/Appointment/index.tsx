import { addAppointment, deleteAppointment, updateAppointment } from '@/api/appointment';
import { toaster } from '@/config/package/toast';
import { UserRole } from '@/models/enums';
import { APPOINTMENT_KEYS } from '@/models/enums/appointmentKeys';
import { IAppointment } from '@/models/interfaces/appointment';
import { IUser } from '@/models/interfaces/user';
import { useGetAllAppointment } from '@/queries/appointment';
import { useGetAllClinic } from '@/queries/clinic';
import { useGetAllDoctor } from '@/queries/doctor';
import { useGetAllPatient } from '@/queries/patient';
import { useGetAllStatus } from '@/queries/status';
import { useGetUserInfo } from '@/queries/user';
import { getFullName } from '@/utils/common';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Card, Form, Input, Modal, Popconfirm, Select } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { AppointmentItem, AppointmentLabel, AppointmentValue, AppointmentWrapper } from './styles';
import { Link } from 'react-router-dom';
import { PATH_AUTH } from '@/routes/paths';

const { TextArea } = Input;

const Appointment = () => {
    const [appointmentEditing, setAppointmentEditing] = useState<IAppointment | null>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [form] = Form.useForm();
    const queryClient = useQueryClient();
    const { data: appointments } = useGetAllAppointment();
    const { data: doctors } = useGetAllDoctor();
    const { data: clinics } = useGetAllClinic();
    const { data: patients } = useGetAllPatient();
    const { data: statuses } = useGetAllStatus();
    const { data: userInfo } = useGetUserInfo();

    const statusOptions = useMemo(() => {
        return statuses?.map(status => ({
            label: status.name,
            value: status.id,
        }));
    }, [statuses]);

    const clinicOptions = useMemo(() => {
        return clinics?.map(clinic => ({
            label: clinic.name,
            value: clinic.id,
        }));
    }, [clinics]);

    const patientOptions = useMemo(() => {
        return patients?.map(patient => ({
            label: `${getFullName(patient)} - ${patient.email}`,
            value: patient.id,
        }));
    }, [patients]);

    const handleOk = async (appointment: IAppointment) => {
        setIsLoading(true);
        try {
            appointment.id = appointmentEditing?.id;
            if (appointment.id) {
                await updateAppointment({
                    appointment: {
                        id: appointment.id,
                        clinic_id: appointment.clinic_id,
                        doctor_id: appointment.doctor_id,
                        patient_id: appointment.patient_id,
                        status_id: appointment.status_id,
                        note: appointment.note,
                    },
                });
                toaster.success({
                    title: 'Success',
                    text: 'Edit appointment successfully',
                });
            } else {
                await addAppointment({
                    appointment: {
                        clinic_id: appointment.clinic_id,
                        doctor_id: appointment.doctor_id,
                        patient_id: appointment.patient_id,
                        status_id: appointment.status_id,
                        note: appointment.note,
                    },
                });
                toaster.success({
                    title: 'Success',
                    text: 'Edit appointment successfully',
                });
            }
        } catch (err) {
            toaster.error({
                title: 'Error',
                text: 'Somethings when wrong, please try again',
            });
        }

        queryClient.invalidateQueries({ queryKey: [APPOINTMENT_KEYS.GET_ALL_APPOINTMENT] });
        setIsLoading(false);
        setAppointmentEditing(null);
    };

    const handleCancel = () => {
        setAppointmentEditing(null);
    };

    const handleOpenModalEditAppointment = (appointment: IAppointment) => {
        setAppointmentEditing(appointment);
    };

    const checkPermissionAppointment = (userInfo?: IUser, appointment?: IAppointment): Boolean => {
        switch (userInfo?.role) {
            case UserRole.PATIENT:
                if (appointment?.patient?.id === userInfo?.id) {
                    return true;
                }
                return false;
            case UserRole.DOCTOR:
                if (appointment?.doctor?.id === userInfo?.id) {
                    return true;
                }
                return false;
            case UserRole.ADMIN:
                return true;
            default:
                return false;
        }
    };

    const checkPermissionDoctor = (userInfo?: IUser, doctor?: IUser): Boolean => {
        switch (userInfo?.role) {
            case UserRole.PATIENT:
                return false;
            case UserRole.DOCTOR:
                if (doctor?.id === userInfo?.id) {
                    return true;
                }
                return false;
            case UserRole.ADMIN:
                return true;
            default:
                return false;
        }
    };

    const checkPermissionPatient = (userInfo?: IUser, patient?: IUser): Boolean => {
        switch (userInfo?.role) {
            case UserRole.PATIENT:
                if (patient?.id === userInfo?.id) {
                    return true;
                }
                return false;
            case UserRole.DOCTOR:
                return true;
            case UserRole.ADMIN:
                return true;
            default:
                return false;
        }
    };

    const appointmentsFilterByPermission = useMemo(() => {
        return appointments?.filter(ap => checkPermissionAppointment(userInfo, ap));
    }, [checkPermissionAppointment, appointments]);

    const doctorsFilterByPermission = useMemo(() => {
        switch (userInfo?.role) {
            case UserRole.PATIENT:
                return doctors?.map(doctor => ({
                    label: `${getFullName(doctor)} - ${doctor.email}`,
                    value: doctor.id,
                }));
            case UserRole.DOCTOR:
                return doctors
                    ?.filter(dt => checkPermissionDoctor(userInfo, dt))
                    ?.map(doctor => ({
                        label: `${getFullName(doctor)} - ${doctor.email}`,
                        value: doctor.id,
                    }));
            case UserRole.ADMIN:
                return doctors?.map(doctor => ({
                    label: `${getFullName(doctor)} - ${doctor.email}`,
                    value: doctor.id,
                }));
            default:
                return [];
        }
    }, [doctors]);

    const patientsFilterByPermission = useMemo(() => {
        switch (userInfo?.role) {
            case UserRole.PATIENT:
                return patients
                    ?.filter(dt => checkPermissionPatient(userInfo, dt))
                    ?.map(patient => ({
                        label: `${getFullName(patient)} - ${patient.email}`,
                        value: patient.id,
                    }));

            case UserRole.DOCTOR:
                return patients?.map(patient => ({
                    label: `${getFullName(patient)} - ${patient.email}`,
                    value: patient.id,
                }));
            case UserRole.ADMIN:
                return patients?.map(patient => ({
                    label: `${getFullName(patient)} - ${patient.email}`,
                    value: patient.id,
                }));
            default:
                return [];
        }
    }, [patients]);

    const handleDeleteAppointment = async (appointment: IAppointment) => {
        setIsLoading(true);

        try {
            if (appointment.id) {
                await deleteAppointment({
                    id: appointment.id,
                });
            }
            toaster.success({
                title: 'Success',
                text: 'Edit appointment successfully',
            });
            queryClient.invalidateQueries({ queryKey: [APPOINTMENT_KEYS.GET_ALL_APPOINTMENT] });
        } catch (err) {}
        setIsLoading(false);
    };

    useEffect(() => {
        form.setFieldsValue({
            note: appointmentEditing?.note,
            doctor_id:
                doctorsFilterByPermission?.length === 1
                    ? doctorsFilterByPermission[0].value
                    : appointmentEditing?.doctor?.id,
            patient_id:
                patientsFilterByPermission?.length === 1
                    ? patientsFilterByPermission[0].value
                    : appointmentEditing?.patient?.id,
            clinic_id: appointmentEditing?.clinic?.id,
            status_id:
                userInfo?.role === UserRole.PATIENT
                    ? statusOptions?.find(status => status.label === 'NEW')?.value
                    : appointmentEditing?.status?.id,
        });
    }, [form, appointmentEditing]);

    return (
        <AppointmentWrapper>
            <Card
                title="List Appointment"
                extra={
                    userInfo?.id && (
                        <>
                            <Button
                                icon={<PlusCircleOutlined />}
                                onClick={() =>
                                    setAppointmentEditing({
                                        note: '',
                                    })
                                }
                            >
                                Create new appointment
                            </Button>
                        </>
                    )
                }
            >
                {!userInfo?.id && (
                    <div>
                        Please <Link to={PATH_AUTH.SIGN_IN}>sign in</Link> to continue booking doctor.
                    </div>
                )}
                {appointmentsFilterByPermission?.map(appointment => (
                    <Card
                        style={{ marginTop: 16 }}
                        type="inner"
                        title={`#${appointment.id}`}
                        extra={
                            <>
                                {userInfo?.role !== UserRole.PATIENT && (
                                    <>
                                        <Button
                                            icon={<EditOutlined />}
                                            onClick={() =>
                                                handleOpenModalEditAppointment(appointment)
                                            }
                                        ></Button>{' '}
                                        <Popconfirm
                                            title="Delete the appointment"
                                            description="Are you sure to delete this appointment?"
                                            onConfirm={() => handleDeleteAppointment(appointment)}
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
                        <AppointmentItem>
                            <AppointmentLabel>Patient: </AppointmentLabel>
                            <AppointmentValue>
                                {getFullName(appointment.patient)} - {appointment.patient?.email}
                            </AppointmentValue>
                        </AppointmentItem>
                        <AppointmentItem>
                            <AppointmentLabel>Doctor: </AppointmentLabel>
                            <AppointmentValue>
                                {getFullName(appointment.doctor)} - {appointment.doctor?.email}
                            </AppointmentValue>
                        </AppointmentItem>
                        <AppointmentItem>
                            <AppointmentLabel>Clinic: </AppointmentLabel>
                            <AppointmentValue>{appointment.clinic?.name}</AppointmentValue>
                        </AppointmentItem>
                        <AppointmentItem>
                            <AppointmentLabel>Status: </AppointmentLabel>
                            <AppointmentValue>{appointment.status?.name}</AppointmentValue>
                        </AppointmentItem>
                        <AppointmentItem>
                            <AppointmentLabel>Note: </AppointmentLabel>
                            <AppointmentValue>{appointment.note}</AppointmentValue>
                        </AppointmentItem>
                    </Card>
                ))}
            </Card>

            <Modal
                title={appointmentEditing?.id ? 'Edit appointment' : 'Create appointment'}
                open={Boolean(appointmentEditing)}
                onCancel={handleCancel}
                footer={[
                    <Button form="submitAppointment" key="submit" htmlType="submit">
                        {appointmentEditing?.id ? 'Edit' : 'Create'}
                    </Button>,
                ]}
            >
                <Form
                    id={'submitAppointment'}
                    form={form}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    onFinish={handleOk}
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item name="patient_id" label="Patient">
                        <Select
                            showSearch
                            placeholder="Select a patient"
                            optionFilterProp="children"
                            options={patientsFilterByPermission}
                            disabled={userInfo?.role === UserRole.PATIENT}
                        />
                    </Form.Item>
                    <Form.Item name="doctor_id" label="Doctor">
                        <Select
                            showSearch
                            placeholder="Select a doctor"
                            optionFilterProp="value"
                            options={doctorsFilterByPermission}
                            disabled={userInfo?.role === UserRole.DOCTOR}
                        />
                    </Form.Item>

                    <Form.Item name="clinic_id" label="Clinic">
                        <Select
                            showSearch
                            placeholder="Select a clinic"
                            optionFilterProp="children"
                            options={clinicOptions}
                        />
                    </Form.Item>
                    <Form.Item name="status_id" label="Status">
                        <Select
                            disabled={userInfo?.role === UserRole.PATIENT}
                            showSearch
                            placeholder="Select a status"
                            optionFilterProp="children"
                            options={statusOptions}
                        />
                    </Form.Item>
                    <Form.Item name="note" label="Note">
                        <TextArea />
                    </Form.Item>
                </Form>
            </Modal>
        </AppointmentWrapper>
    );
};

export default Appointment;
