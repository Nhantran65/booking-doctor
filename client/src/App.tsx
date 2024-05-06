import { CookiesProvider } from "react-cookie";
import { HelmetProvider } from "react-helmet-async";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "@/config/package/dayjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "antd/dist/reset.css";
import "react-toastify/dist/ReactToastify.css";

import { ConfigProvider } from "antd";
import customTheme from "./assets/styles/customTheme";
import AppGlobal from "./components/Global";
import i18n from "./config/translation/i18n";
import store from "./redux/store";
import Router from "./routes";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: Infinity,
        },
    },
});

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <I18nextProvider i18n={i18n}>
                        <CookiesProvider>
                            <HelmetProvider>
                                <ConfigProvider theme={customTheme}>
                                    <AppGlobal />
                                    <Router />
                                    <ToastContainer autoClose={2000} hideProgressBar={true} />
                                </ConfigProvider>
                            </HelmetProvider>
                        </CookiesProvider>
                    </I18nextProvider>
                </QueryClientProvider>
            </BrowserRouter>
        </Provider>
    );
};

export default App;
