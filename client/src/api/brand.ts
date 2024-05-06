import { axiosInstanceJfw } from "@/config/axios/axiosClient";
import { IBrandInfo, IGetListBrandsParams } from "@/models/interfaces";

const REST = "brands";

export const getListBrandsAPI = async (params?: IGetListBrandsParams): Promise<IBrandInfo[]> => {
    const url = `${REST}`;
    const response = await axiosInstanceJfw.get(url, {
        params,
    });

    return response.data;
};
