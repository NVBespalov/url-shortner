import {authApi} from "../../../shared/api";
import type {Url} from "../model/types.ts";

export const fetchUserUrls = async () => {
    const response = await authApi.get<Url[]>('/url');
    return response.data;
};

