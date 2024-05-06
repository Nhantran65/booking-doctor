import { useState } from 'react';
import axios from 'axios';
import { SignUpWrapper, InputField, SubmitButton, SubWrapper, NavSignUp, ErrorMsg } from './styles';
import { Link, useNavigate } from 'react-router-dom'; // Import for navigation
import { ToastContainer, toast } from 'react-toastify'; // Toast notifications
import 'react-toastify/dist/ReactToastify.css'; // Toast styles
import { signInAPI, signUpAPI } from '@/api/auth';
import { Button, Col, Form, Input, Row } from 'antd';
import { IInitialSignUpValues, ISignUpRequest } from '@/models/interfaces';
import { toaster } from '@/config/package/toast';
import { PATH_AUTH } from '@/routes/paths';
const SignUp = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [passwordError, setPasswordError] = useState(false); // State to track password error
    const navigate = useNavigate();

    const handleChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;

        if (name === 'password') {
            // Check password length and set error state accordingly
            setPasswordError(value.length < 6);
        }
    };

    const handleSubmitSignUp = async (formValues: IInitialSignUpValues) => {
        setIsLoading(true);
        const payload: ISignUpRequest = {
            password: formValues.password,
            email: formValues.email,
            firstname: formValues.firstName,
            lastname: formValues.lastName,
        };

        await signUpAPI(payload)
            .then(async res => {
                navigate(PATH_AUTH.SIGN_IN);
                toaster.success({
                    title: 'Success',
                    text: 'Sign up successfully',
                });
            })
            .catch(err => {
                toaster.error({
                    title: 'Error',
                    text: 'Somethings when wrong, please try again',
                });
            })
            .finally(() => setIsLoading(false));
    };

    // const handleSubmitSignIn = async (e: { preventDefault: () => void }) => {
    //     e.preventDefault();
    //     // Check if password is valid
    //     if (formData.password.length < 6) {
    //         setPasswordError(true);
    //         return; // Stop submission if password is not valid
    //     }
    //     try {
    //         signInAPI;
    //         const response = await axios.post(
    //             `${import.meta.env.VITE_BOOKING_DOCTOR_API}sign-up`,
    //             formData
    //         );
    //         toast.success('Sign Up Successful!', {
    //             position: 'top-right',
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //         });
    //         navigate('/', { state: { message: 'Sign Up Successful' } });
    //         console.log(response.data);
    //         console.log(response.data);
    //     } catch (error) {
    //         toast.error('Sign Up Failed! Email already exists.', {
    //             position: 'top-right',
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //         });
    //         console.error(error);
    //     }
    // };

    return (
        <>
            <SignUpWrapper>
                <Form
                    layout="vertical"
                    name="basic"
                    onFinish={handleSubmitSignUp}
                    autoComplete="off"
                >
                    <Row gutter={10}>
                        <Col span={12}>
                            <Form.Item
                                name="firstName"
                                label="First name"
                                rules={[{ required: false }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="lastName"
                                label="Last name"
                                rules={[{ required: false }]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true }, { type: 'email' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                min: 6,
                                message: 'Your password must have more than 6 characters',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Row gutter={10} justify={'center'}>
                            <Col>
                                <Button type="primary" htmlType="submit">
                                    Sign Up
                                </Button>
                            </Col>
                            <Col>
                                <Link to={PATH_AUTH.SIGN_IN}>
                                    <Button>Cancel</Button>
                                </Link>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
                {/* <form onSubmit={handleSubmit}>
                    <SubWrapper>
                        <InputField
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        <InputField
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </SubWrapper>
                    <InputField
                        type="email"
                        name="email"
                        placeholder="nhan.tran@tuni.fi"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <InputField
                        type="password"
                        name="password"
                        placeholder="********"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {passwordError && (
                        <ErrorMsg>Your password must have more than 6 characters</ErrorMsg>
                    )}{' '}
                    <SubmitButton type="submit">Register</SubmitButton>
                    <NavSignUp>
                        You already have an account?
                        <Link href="http://localhost:5173/account/sign-in">Sign In</Link>
                    </NavSignUp>
                </form> */}
            </SignUpWrapper>
            <ToastContainer />
        </>
    );
};

export default SignUp;
