import { FAVICON } from "@/models/constants";
import { Helmet } from "react-helmet-async";

const Favicon = () => {
    return (
        <Helmet>
            <link rel="icon" href={FAVICON} />
        </Helmet>
    );
};

export default Favicon;
