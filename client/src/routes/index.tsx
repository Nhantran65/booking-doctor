import Loading from '@/components/Loading';
import { TOKEN } from '@/models/constants';
import { Suspense, lazy } from 'react';
import { useCookies } from 'react-cookie';
import { Navigate, useRoutes } from 'react-router-dom';
import AdminProtected from './AdminProteced';
import { PATH_ACCOUNT, PATH_AUTH, PATH_MAIN, PATH_OTHER } from './paths';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Loadable = (Component: any) => (props: any) => {
    return (
        <Suspense fallback={<Loading isFull={true} />}>
            <Component {...props} />
        </Suspense>
    );
};

const Router = () => {
    const [cookies] = useCookies();
    const isLogin = Boolean(cookies[TOKEN]);

    return useRoutes([
        // Auth
        {
            path: PATH_AUTH.SELF,
            element: <AuthLayout />,
            children: [
                {
                    path: PATH_AUTH.SIGN_IN,
                    element: <SignIn />,
                },
                {
                    path: PATH_AUTH.SIGN_UP,
                    element: <SignUp />,
                },
            ],
        },
        // Main
        {
            path: PATH_MAIN.HOME,
            element: <MainLayout />,
            children: [
                {
                    path: PATH_MAIN.HOME,
                    element: <Home />,
                },
                {
                    path: PATH_MAIN.APPOINTMENT,
                    element: <Appointment />,
                },
                {
                    path: PATH_MAIN.CLINIC,
                    element: <Clinic />,
                },
                {
                    path: `${PATH_MAIN.CLINIC}/:clinic_id`,
                    element: <ClinicDetail />,
                },
                {
                    path: PATH_MAIN.BLOG,
                    element: <Blog />,
                },
                {
                    path: PATH_MAIN.DOCTOR,
                    element: <Doctor />,
                },
                {
                    path: `${PATH_MAIN.DOCTOR}/:doctor_id`,
                    element: <DoctorDetail />,
                },

                {
                    path: `${PATH_MAIN.BLOG}/:story_id`,
                    element: <BlogDetails />,
                },
                {
                    path: `${PATH_ACCOUNT.PROFILE}`,
                    element: <Profile />,
                },
            ],
        },
        // Other
        {
            path: PATH_OTHER.NOT_FOUND,
            element: <NotFound />,
        },
        {
            path: '*',
            element: <Navigate to={PATH_OTHER.NOT_FOUND} replace />,
        },
    ]);
};

// Layout
const AuthLayout = Loadable(lazy(() => import('@/layouts/Auth')));
const MainLayout = Loadable(lazy(() => import('@/layouts/Main')));
// Auth
const SignIn = Loadable(lazy(() => import('@/pages/auth/SignIn')));
const SignUp = Loadable(lazy(() => import('@/pages/auth/SignUp')));
// Main
const Home = Loadable(lazy(() => import('@/pages/main/Home')));

const Appointment = Loadable(lazy(() => import('@/pages/main/Appointment')));
const Blog = Loadable(lazy(() => import('@/pages/main/Blog')));
const Clinic = Loadable(lazy(() => import('@/pages/main/Clinic')));
const Doctor = Loadable(lazy(() => import('@/pages/main/Doctor')));
const BlogDetails = Loadable(lazy(() => import('@/pages/main/BlogDetails')));
const Profile = Loadable(lazy(() => import('@/pages/main/Profile')));
const DoctorDetail = Loadable(lazy(() => import('@/pages/main/DoctorDetail')));
const ClinicDetail = Loadable(lazy(() => import('@/pages/main/ClinicDetail')));
// Other
const NotFound = Loadable(lazy(() => import('@/pages/NotFound')));

export default Router;
