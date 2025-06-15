import {createAsyncThunk, createSlice,} from '@reduxjs/toolkit';
import {login} from '../api/authApi';

import {TOKEN_KEY} from "../../../shared/const/auth";
import {AUTH_ERROR_MESSAGE} from "./const";

import {loadProfile} from "../../profile/model/loadProfileThunks";

interface AuthState {
    token: string | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}


const initialState: AuthState = {
    token: localStorage.getItem(TOKEN_KEY),
    loading: false,
    error: null,
    isAuthenticated: !!localStorage.getItem(TOKEN_KEY),
};

export const loginThunk = createAsyncThunk<
    string,
    { email: string; password: string },
    { rejectValue: string }
>(
    'auth/loginAndLoadProfile',
    async ({email, password}, {dispatch, rejectWithValue}) => {
        try {
            const response = await login({email, password});
            const accessToken = response.data.access_token;
            dispatch(setToken({payload: accessToken}));
            localStorage.setItem(TOKEN_KEY, accessToken);
            await dispatch(loadProfile());
            return accessToken;
        } catch (e: any) {
            return rejectWithValue(e.response?.data?.message || AUTH_ERROR_MESSAGE);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem(TOKEN_KEY, action.payload);
        },
        logout(state) {
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem(TOKEN_KEY);
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loginThunk.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || AUTH_ERROR_MESSAGE;
            });
    }
});

export const {logout, setToken} = authSlice.actions;
export const authReducer = authSlice.reducer;