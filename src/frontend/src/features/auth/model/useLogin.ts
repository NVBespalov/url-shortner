// features/auth/model/useLogin.ts
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {TOKEN_KEY} from "../../../shared/const/auth.ts";
import {AUTH_ERROR_MESSAGE} from "./const.ts";
import {loginThunk} from "./authSlice.ts";
import {useAppDispatch} from "../../../app/hooks.ts";


export const useLogin = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const handleLogin = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const accessToken = await dispatch(loginThunk({email, password})).unwrap();
            localStorage.setItem(TOKEN_KEY, accessToken);
            setToken(accessToken);
            navigate('/');
        } catch (e: any) {
            setError(e.response?.data?.message || AUTH_ERROR_MESSAGE);
        } finally {
            setLoading(false);
        }
    };

    return {loading, error, token, handleLogin};
};