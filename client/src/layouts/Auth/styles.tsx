import { flexCenter } from "@/assets/styles/mixins";
import theme from "@/assets/styles/theme";
import styled from "@emotion/styled";

export const AuthLayoutWrapper = styled.div`
    background-color: ${theme.colorPrimary};
    width: 100%;
    height: 100vh;
    ${flexCenter()}
`;
export const AuthLayoutContent = styled.div`
    background-color: ${theme.colorWhite};
    border-radius: ${theme.radiusMedium};
    max-width: 450px;
    padding: 40px 55px;
    text-align: center;
    width: 100%;
    ${flexCenter("column")}
`;
export const Version = styled.div`
    color: ${theme.colorWhite};
    position: fixed;
    bottom: 15px;
    right: 20px;
    font-size: 12px;
`;
