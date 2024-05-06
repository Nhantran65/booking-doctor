import { useEffect, useState } from 'react'; // Use useEffect for toast handling
import { Link, useNavigate } from 'react-router-dom'; // Import for navigation
import { ToastContainer, toast } from 'react-toastify'; // Toast notifications

import { signInAPI } from '@/api/auth';
import { toaster } from '@/config/package/toast';
import { TOKEN } from '@/models/constants';
import { ISignInRequest } from '@/models/interfaces';
import { PATH_AUTH, PATH_MAIN } from '@/routes/paths';
import { Button, Form, Input } from 'antd';
import { useCookies } from 'react-cookie';
import { SignInWrapper } from './styles';

interface ISignInFormValue {
    email: string;
    password: string;
}

const SignIn = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [, setCookie] = useCookies();
    const navigate = useNavigate();

    const handleSubmitSignIn = async (formValues: ISignInFormValue) => {
        setIsLoading(true);
        const payload: ISignInRequest = {
            email: formValues.email,
            password: formValues.password,
        };

        await signInAPI(payload)
            .then(async res => {
                const authKey = res.jwtToken;

                setCookie(TOKEN, authKey, {
                    path: '/',
                });

                navigate(PATH_MAIN.HOME, {
                    replace: true,
                });

                toaster.success({
                    title: 'Success',
                    text: 'Sign in successfully',
                });
            })
            .catch(err => {
                console.log('err', err);

                toaster.error({
                    title: 'Error',
                    text: 'Somethings when wrong please try again',
                });
            });

        setIsLoading(false);
    };

    // Cleanup function to avoid memory leaks (optional)
    useEffect(() => {
        return () => toast.dismiss(); // Clear any lingering toasts on component unmount
    }, []);

    return (
        <>
            <SignInWrapper>
                <Form
                    layout="vertical"
                    name="basic"
                    onFinish={handleSubmitSignIn}
                    autoComplete="off"
                    labelAlign="left"
                >
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
                    <Form.Item
                        label="Password"
                        labelCol={{
                            span: 16,
                        }}
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            loading={isLoading}
                            size="middle"
                            className="w-100"
                            type="primary"
                            htmlType="submit"
                        >
                            Sign In
                        </Button>
                    </Form.Item>
                </Form>
            </SignInWrapper>
            <div>
                Don't have an account yet?{' '}
                <Link style={{ color: 'blue' }} to={PATH_AUTH.SIGN_UP}>
                    Sign Up
                </Link>
            </div>
            <ToastContainer />
        </>
    );
};

export default SignIn;
