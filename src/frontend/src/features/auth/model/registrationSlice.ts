import { createSlice } from '@reduxjs/toolkit';
import type {RegistrationState} from "./types.ts";
import {registerUser} from "./registerUser.ts";


const initialState: RegistrationState = {
    loading: false,
    error: null,
    data: null,
};

const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const registrationReducer = registrationSlice.reducer;
