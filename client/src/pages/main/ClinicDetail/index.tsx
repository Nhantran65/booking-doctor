import { useGetClinicById } from '@/queries/clinic';
import { Card, Col, Form, Input, Row } from 'antd';
import { useParams } from 'react-router-dom';
import { ClinicWrapper } from './styles';

const { TextArea } = Input;

const ClinicDetail = () => {
    const { clinic_id } = useParams();
    const { data: clinicInfo } = useGetClinicById(Number(clinic_id));

    return (
        <ClinicWrapper>
            <Card title="Clinic">
                <Row gutter={10}>
                    <Col span={12}>
                        <Form.Item label="Name">
                            <div
                                style={{
                                    fontWeight: 'bold',
                                }}
                            >
                                {clinicInfo?.name}
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
                                {clinicInfo?.email}
                            </div>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Description">
                            <div
                                style={{
                                    fontWeight: 'bold',
                                }}
                            >
                                {clinicInfo?.description}
                            </div>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Address">
                            <div
                                style={{
                                    fontWeight: 'bold',
                                }}
                            >
                                {clinicInfo?.address}
                            </div>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Phone">
                            <div
                                style={{
                                    fontWeight: 'bold',
                                }}
                            >
                                {clinicInfo?.phone}
                            </div>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Website">
                            <div
                                style={{
                                    fontWeight: 'bold',
                                }}
                            >
                                {clinicInfo?.website}
                            </div>
                        </Form.Item>
                    </Col>
                </Row>
            </Card>
        </ClinicWrapper>
    );
};

export default ClinicDetail;
