import { createAsyncThunk } from '@reduxjs/toolkit';
import {api} from "../../../shared/api";
import type {FieldValues} from "react-hook-form";
import type {RegistrationResponse} from "./types";
import type {NavigateFunction} from "react-router-dom";


export const registerUser = createAsyncThunk<
    RegistrationResponse,
    { userData: FieldValues; navigate: NavigateFunction },
    { rejectValue: string }
>('auth/register', async ({userData, navigate}, {rejectWithValue}) => {
    try {
        debugger
        const {confirmPassword, ...requestData} = userData;
        const response = await api.post('/auth/register', requestData);
        navigate('/login');
        return response.data;
    } catch (error: any) {
        if (error.response && error.response.data.message) {
            return rejectWithValue(error.response.data.message);
        }
        return rejectWithValue('Ошибка при регистрации');
    }
});