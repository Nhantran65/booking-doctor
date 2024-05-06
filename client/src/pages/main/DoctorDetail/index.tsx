import { SKELETON_USER } from '@/models/constants';
import { useGetDoctorById } from '@/queries/doctor';
import { Avatar, Card, Col, Form, Input, Row } from 'antd';
import { useParams } from 'react-router-dom';
import { DoctorWrapper } from './styles';

const { TextArea } = Input;

const DoctorDetail = () => {
    const { doctor_id } = useParams();
    const { data: doctorInfo } = useGetDoctorById(Number(doctor_id));

    return (
        <DoctorWrapper>
            <Card title="Doctor">
                <Row gutter={10}>
                    <Col span={24}>
                        <Form.Item
                            label="Avatar"
                            style={{
                                textAlign: 'center',
                            }}
                        >
                            <Avatar size={160} src={doctorInfo?.profilePicture || SKELETON_USER} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="First name">
                            <div
                                style={{
                                    fontWeight: 'bold',
                                }}
                            >
                                {doctorInfo?.firstname}
                            </div>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Last name">
                            <div
                                style={{
                                    fontWeight: 'bold',
                                }}
                            >
                                {doctorInfo?.lastname}
                            </div>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Email">
                            <div
                                style={{
                                    fontWeight: 'bold',
                                }}
                            >
                                {doctorInfo?.email}
                            </div>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Role">
                            <div
                                style={{
                                    fontWeight: 'bold',
                                    textTransform: 'capitalize',
                                }}
                            >
                                {doctorInfo?.role}
                            </div>
                        </Form.Item>
                    </Col>
                </Row>
            </Card>
        </DoctorWrapper>
    );
};

export default DoctorDetail;
