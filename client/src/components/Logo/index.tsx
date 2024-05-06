import { LOGO } from "@/models/constants";
import { PATH_MAIN } from "@/routes/paths";
import { LogoImage } from "./styles";

const Logo = () => {
    return (
        <div>
            <a href={PATH_MAIN.HOME} target="_blank" rel="noopener noreferrer">
                <LogoImage src={LOGO} alt="logo" />
            </a>
        </div>
    );
};

export default Logo;
