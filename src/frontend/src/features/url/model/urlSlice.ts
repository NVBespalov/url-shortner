import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {Url} from "./types.ts";
import {loadUrlByShorCodeThunk} from "./urlThunk.ts";



interface UrlsState {
    items: Url[];
    isLoading: boolean;
    error: string | null;
}

const initialState: UrlsState = {
    items: [],
    isLoading: false,
    error: null,
};

const urlsSlice = createSlice({
    name: 'urls',
    initialState,
    reducers: {
        setUrls: (state, action: PayloadAction<Url[]>) => {
            state.items = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadUrlByShorCodeThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loadUrlByShorCodeThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                if (!state.items.find(item => item.shortCode === action.payload.shortCode)) {
                    state.items.push(action.payload);
                }
            })
            .addCase(loadUrlByShorCodeThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Произошла ошибка при загрузке ссылки';
            });

    }
});

export const { setUrls, setLoading, setError } = urlsSlice.actions;
export const urlsReducer = urlsSlice.reducer;