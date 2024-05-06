import { axiosInstanceBookingDoctor, axiosInstanceJfw } from '@/config/axios/axiosClient';
import {
    ISignInRequest,
    ISignInResponse,
    ISignUpRequest,
    IUpdateProfileRequest,
} from '@/models/interfaces';
import { IUser } from '@/models/interfaces/user';

const REST = '';

export const signInAPI = async (payload: ISignInRequest): Promise<ISignInResponse> => {
    const url = `${REST}/authenticate`;
    const body = {
        ...payload,
    };
    const response: ISignInResponse = await axiosInstanceBookingDoctor.post(url, body);

    return response;
};

export const signUpAPI = async (payload: ISignUpRequest) => {
    const url = `${REST}/sign-up`;
    const body = {
        ...payload,
    };
    const response = await axiosInstanceBookingDoctor.post(url, body);
    return response;
};

export const getUserInfoAPI = async (): Promise<IUser> => {
    const url = `${REST}/me`;

    const response: IUser = await axiosInstanceBookingDoctor.get(url);

    return response;
};

export const updateUserInfo = async (payload: IUpdateProfileRequest): Promise<IUser> => {
    const url = `${REST}/me/update`;
    const { id, ...rest } = payload;

    const response: IUser = await axiosInstanceBookingDoctor.put(url, rest, {
        params: {
            id,
        },
    });
    return response;
};
