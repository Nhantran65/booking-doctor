import { ThemeConfig } from "antd";
import theme from "./theme";
import { yellow } from "@ant-design/colors";

const customTheme: ThemeConfig = {
    token: {
        colorPrimary: theme.colorPrimary,
    },
    components: {
        Radio: {
            colorPrimary: theme.colorPrimary,
            fontSize: 16,
        },
        Drawer: {
            paddingLG: 0,
        },
        Button: {
            borderRadius: theme.radiusDefaultNumber,
            borderRadiusSM: theme.radiusDefaultNumber,
        },
        Tooltip: {
            colorBgSpotlight: yellow[2],
            colorTextLightSolid: theme.colorText,
        },
    },
};

export default customTheme;
