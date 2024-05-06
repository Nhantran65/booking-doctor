import styled from '@emotion/styled';
import { blue } from '@ant-design/colors';
import { Link } from 'react-router-dom';

export const HeaderWrapper = styled.div`
    position: fixed; /* Header sẽ được cố định ở đầu trang */
    top: 0; /* Đảm bảo Header nằm ở đỉnh trang */
    width: 100%;
    background-color: ${blue[3]};
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* Đảm bảo Header cao hơn các phần tử khác */
`;

export const Container = styled.div`
    width: 100%;
    max-width: 1440px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Logo = styled.img`
    height: 46px;
    width: 46px;
    background-size: contain;
    background-repeat: no-repeat;
    border-radius: 10px;
`;

export const LogoText = styled(Link)`
    margin-left: 10px;
    color: #fff;
`;

export const NavArea = styled.div`
    display: flex;
`;

export const NavButton = styled.div`
    font-size: 14px;
    margin-left: 20px;
    cursor: pointer;
`;

export const NavLink = styled(Link)`
    text-decoration: none;
    color: #fff;
    transition: color 0.3s;

    &:hover {
        color: #fff; /* Màu khi hover */
    }
`;


export const AvatarWrapper = styled.div`
    display: flex;
    align-items: center;
    column-gap: 5px;
    color: #fff;
    cursor: pointer;
`;

export const NotificationBox = styled.div`

`;

export const NotificationItem = styled.div`
    display: flex;
    font-size: 12px;
    justify-content: space-between;
`;