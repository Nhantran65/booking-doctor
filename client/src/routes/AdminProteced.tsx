import { UserRole } from '@/models/enums';
import { useGetUserInfo } from '@/queries/user';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_MAIN, PATH_OTHER } from './paths';

interface IAdminProtected {
    children: ReactNode;
}

const AdminProtected = ({ children }: IAdminProtected) => {
    const { data: userInfo } = useGetUserInfo();
    const navigate = useNavigate();

    if (userInfo?.role !== UserRole.ADMIN) {
        navigate(PATH_OTHER.NOT_FOUND);
    }

    return children;
};

export default AdminProtected;