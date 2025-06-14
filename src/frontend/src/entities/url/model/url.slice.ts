import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { api } from '../../../shared/api';
import type {Url} from "../types";

export const fetchUrlsThunk = createAsyncThunk('url/fetchAll', async () => {
    const res = await api.get<Url[]>('/urls');
    return res.data;
});

export const createUrlThunk = createAsyncThunk('url/create', async (url: string) => {
    const res = await api.post<Url>('/urls', { originalUrl: url });
    return res.data;
});

export const deleteUrlThunk = createAsyncThunk('url/delete', async (id: string) => {
    await api.delete(`/urls/${id}`);
    return id;
});

interface UrlState {
    urls: Url[];
    loading: boolean;
}

const initialState: UrlState = {
    urls: [],
    loading: false,
};

export const urlSlice = createSlice({
    name: 'url',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUrlsThunk.fulfilled, (state, action: PayloadAction<Url[]>) => {
                state.urls = action.payload;
            })
            .addCase(createUrlThunk.fulfilled, (state, action: PayloadAction<Url>) => {
                state.urls.unshift(action.payload);
            })
            .addCase(deleteUrlThunk.fulfilled, (state, action: PayloadAction<string>) => {
                state.urls = state.urls.filter((url) => url.id !== action.payload);
            });
    },
});

export const selectUrls = (state: { url: UrlState }) => state.url.urls;