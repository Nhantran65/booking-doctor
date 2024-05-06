import globalStyles from "@/assets/styles/globalStyles";
import { Global } from "@emotion/react";
import Favicon from "../Favicon";
import ScrollToTop from "../ScrollToTop";

const AppGlobal = () => {
    return (
        <>
            <Global styles={globalStyles} />
            <Favicon />
            <ScrollToTop />
        </>
    );
};

export default AppGlobal;
