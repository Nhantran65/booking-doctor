import { PATH_AUTH, PATH_MAIN } from '@/routes/paths';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { TOKEN } from '../models/constants';

const useAuth = () => {
    const [, , removeCookie] = useCookies();

    const navigate = useNavigate();

    const logout = () => {
        removeCookie(TOKEN, { path: '/' });

        navigate(PATH_MAIN.HOME);
    };

    return {
        logout,
    };
};

export { useAuth };
