import {authApi} from "../../../../shared/api";

export const fetchStatistic = async (shortCode: string) => {
    const response =  await authApi.get(`/analytics/${shortCode}`);
    return response.data;
};