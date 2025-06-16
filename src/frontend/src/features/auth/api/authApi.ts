import { api } from '../../../shared/api';

export const login = async (data: { email: string; password: string }) => {
  return api.post(`/auth/login`, data);
};
