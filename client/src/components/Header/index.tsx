import { useAuth } from '@/hooks/useAuth';
import { LOGO, SKELETON_USER, TOKEN } from '@/models/constants';
import { UserRole } from '@/models/enums';
import { useGetNotificationOfUser } from '@/queries/notification';
import { useGetUserInfo } from '@/queries/user';
import { PATH_ACCOUNT, PATH_AUTH, PATH_MAIN } from '@/routes/paths';
import { BellOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, MenuProps } from 'antd';
import { useEffect, useMemo, useRef } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import {
    AvatarWrapper,
    Container,
    HeaderWrapper,
    Logo,
    LogoText,
    NavArea,
    NavButton,
    NavLink,
    NotificationItem,
} from './styles';
import moment from 'moment';
import { useQueryClient } from '@tanstack/react-query';
import { NOTIFICATION_KEYS } from '@/models/enums/notificationKeys';
import { toaster } from '@/config/package/toast';

interface INavbarPermission {
    label: string;
    path: string;
    roles: UserRole[];
    isRequireAuth?: boolean;
}

const Header = () => {
    const [cookies] = useCookies();
    const isLogin = Boolean(cookies[TOKEN]);
    const { data: userInfo } = useGetUserInfo();
    const { data: notifications } = useGetNotificationOfUser();
    const notificationLength = useRef<number>(0);
    const queryClient = useQueryClient();
    const timer: any = useRef(null);

    console.log('notifications', notifications);

    const { logout } = useAuth();
    const navigate = useNavigate();

    const notificationItems: MenuProps['items'] = useMemo(() => {
        return notifications?.map(notification => ({
            label: (
                <NotificationItem>
                    <div>{notification.message}</div>
                    <div>{moment(notification.createdAt).fromNow()}</div>
                </NotificationItem>
            ),
            key: notification.id,
        }));
    }, [notifications]);

    const navbarPermissions: INavbarPermission[] = [
        {
            label: 'Home',
            path: PATH_MAIN.HOME,
            roles: [UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT],
        },
        {
            label: 'Appointment',
            path: PATH_MAIN.APPOINTMENT,
            roles: [UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT],
        },
        {
            label: 'Blogs',
            path: PATH_MAIN.BLOG,
            roles: [UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT],
        },
        {
            label: 'Clinic',
            path: PATH_MAIN.CLINIC,
            roles: [UserRole.ADMIN, UserRole.DOCTOR],
        },
        {
            label: 'Doctor',
            path: PATH_MAIN.DOCTOR,
            roles: [UserRole.ADMIN, UserRole.DOCTOR],
        },
    ];
    const navbarPermissionOfUser = useMemo(() => {
        return navbarPermissions.filter(navbarPermission => {
            if (!navbarPermission.isRequireAuth) return true;
            if (userInfo?.role) return navbarPermission.roles.includes(userInfo?.role);
        });
    }, [navbarPermissions, userInfo?.role]);

    const items: MenuProps['items'] = [
        {
            label: 'Account information',
            key: '1',
            onClick: () => {
                navigate(PATH_ACCOUNT.PROFILE);
            },
        },
        {
            label: 'Logout',
            key: '3',
            onClick: logout,
        },
    ];

    useEffect(() => {
        timer.current = setInterval(() => {
            console.log('run');

            queryClient.invalidateQueries({
                queryKey: [NOTIFICATION_KEYS.GET_ALL_NOTIFICATIONS, userInfo?.id],
            });
        }, 3000);

        return () => {
            clearInterval(timer.current);
        };
    }, [userInfo?.id]);

    useEffect(() => {
        if (
            notificationItems &&
            notificationLength.current !== 0 &&
            notifications?.length !== notificationLength.current
        ) {
            toaster.success({
                title: 'Success',
                text: 'You have received new notifications',
            });
        }

        notificationLength.current = notifications?.length || 0;
    }, [notifications]);

    return (
        <HeaderWrapper>
            <Container>
                <div>
                    <Logo src={LOGO}></Logo>
                    <LogoText to={PATH_MAIN.HOME}>Doctor Online</LogoText>
                </div>

                <NavArea>
                    {navbarPermissionOfUser?.map(navbarPermission => (
                        <NavButton>
                            <NavLink to={navbarPermission.path}>{navbarPermission.label}</NavLink>
                        </NavButton>
                    ))}
                </NavArea>

                {!isLogin && (
                    <NavButton>
                        <NavLink to={PATH_AUTH.SIGN_IN}>Sign In</NavLink>
                    </NavButton>
                )}

                {isLogin && (
                    <>
                        <Dropdown
                            menu={{ items: notificationItems }}
                            overlayStyle={{
                                width: '500px',
                            }}
                            trigger={['click']}
                        >
                            <BellOutlined className='custom-icon' />
                        </Dropdown>
                        <Dropdown menu={{ items }} trigger={['click']}>
                            <AvatarWrapper>
                                <Avatar
                                    style={{
                                        background: 'orange',
                                    }}
                                    src={userInfo?.profilePicture || SKELETON_USER}
                                    size="large"
                                    gap={10}
                                ></Avatar>
                                Hello {userInfo?.email}
                            </AvatarWrapper>
                        </Dropdown>
                    </>
                )}
            </Container>
        </HeaderWrapper>
    );
};

export default Header;
