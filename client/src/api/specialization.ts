// export const getListSpecializationAPI = async () => {
//     const response = await fetch('http://localhost:8082/specialization/all');
//     return response.json();
// };

import { axiosInstanceBookingDoctor } from '@/config/axios/axiosClient';
import {
    IGetListSpecializationParams,
    IGetListSpecializationResponse,
    ISpecialization,
} from '@/models/interfaces';

const REST = 'specialization';

export const getListSpecializationAPI = async (
    payload: IGetListSpecializationParams
): Promise<ISpecialization[]> => {
    const url = `${REST}/all`;
    const body = {
        // ...payload,
    };
    const response: ISpecialization[] = await axiosInstanceBookingDoctor.get(url);

    return response;
};
