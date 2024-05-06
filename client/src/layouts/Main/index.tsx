import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";
import { Content, MainLayoutContainer, MainLayoutWrapper } from "./styles";

const MainLayout = () => {
    return (
        <MainLayoutWrapper>
            <Header />
            <MainLayoutContainer>
                <Content>
                    <Outlet />
                </Content>
            </MainLayoutContainer>
            <Footer />
        </MainLayoutWrapper>
    );
};

export default MainLayout;
