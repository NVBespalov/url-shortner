import {createAsyncThunk} from '@reduxjs/toolkit';
import {clearProfile, setLoading, setProfile} from './profileSlice';
import {fetchProfile} from "../api/profileApi";
import {logout} from "../../auth/model/authSlice";

export const loadProfile = createAsyncThunk(
    'auth/loadProfile',
    async (_, { dispatch }) => {
        try {
            dispatch(setLoading(true))
            const profile = await fetchProfile();
            dispatch(setLoading(false));
            dispatch(setProfile(profile));
            return profile;
        } catch (error: any) {
            dispatch(setLoading(false));
            console.error('Failed to load profile:', error);
            if (error.response?.status === 401) {
                dispatch(logout());
                dispatch(clearProfile())
                window.location.href = '/login';
            }
            throw error;
        }
    }
);