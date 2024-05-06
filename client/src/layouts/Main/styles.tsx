import theme from "@/assets/styles/theme";
import { Container } from "@/designs/Container";
import styled from "@emotion/styled";
import { blue } from "@ant-design/colors";

export const MainLayoutWrapper = styled.div`
    background-color: ${blue[1]};
`;
export const MainLayoutContainer = styled(Container)`
    padding-top: 55px;
    display: flex;
    justify-content: space-between;
    min-height: 900px;
`;
export const Left = styled.aside`
    width: 270px;
`;
export const Right = styled.main<{ isShowSidebar?: boolean }>`
    padding-left: 20px;
    @media (max-width: ${theme["2xLarge"]}) {
        width: 100%;
        padding-left: 0;
    }
    ${({ isShowSidebar }) => (isShowSidebar ? `width: calc(100% - 300px);` : `width: 100%;`)}
`;
export const Content = styled.div`
    height: 100%;
    width:100%;
`;
