import { Id, ToastOptions, toast } from 'react-toastify';

interface IMsg {
    title?: string | number;
    text?: string | number;
}

export const Msg = ({ title, text }: IMsg) => {
    return (
        <div className="msg-container">
            <p className="msg-title">{title}</p>
            <span className="msg-description">{text}</span>
        </div>
    );
};

export const toaster = (myProps?: any, toastProps?: any): Id =>
    toast(<Msg {...myProps} />, { ...toastProps });

toaster.success = (myProps?: IMsg, toastProps?: ToastOptions<unknown>): Id =>
    toast.success(<Msg {...myProps} />, { ...toastProps });

toaster.error = (myProps?: IMsg, toastProps?: ToastOptions<unknown>): Id =>
    toast.error(<Msg {...myProps} />, { ...toastProps });
