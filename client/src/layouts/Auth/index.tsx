import Logo from "@/components/Logo";
import { VERSION } from "@/models/constants/common";
import { Outlet } from "react-router-dom";
import { AuthLayoutContent, AuthLayoutWrapper, Version } from "./styles";

const AuthLayout = () => {
    return (
        <AuthLayoutWrapper>
            <AuthLayoutContent>
                <Logo />
                <Outlet />
            </AuthLayoutContent>
            <Version>Nhan Tran {VERSION} </Version>
        </AuthLayoutWrapper>
    );
};

export default AuthLayout;
