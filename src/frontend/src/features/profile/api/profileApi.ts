import {authApi} from "../../../shared/api";

// Предположим, что профиль доступен по этому endpoint
export const fetchProfile = async () => {
    const response = await authApi.get('/auth/profile');
    return response.data;
};