import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {fetchAnalyticsThunk} from "./analyticThunk";


interface AnalyticsState {
    data: {
        clicks: number;
        lastVisitors: string[];
    };
    isLoading: boolean;
    error: string | null;
}

const initialState: AnalyticsState = {
    data: {
        clicks: 0,
        lastVisitors: []
    },
    isLoading: false,
    error: null
};

export const analyticsSlice = createSlice({
    name: 'analytics',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        setAnalyticsData: (state, action: PayloadAction<AnalyticsState['data']>) => {
            state.data = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnalyticsThunk.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAnalyticsThunk.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchAnalyticsThunk.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'An error occurred';
            });
    }
});

export const {setLoading, setError, setAnalyticsData} = analyticsSlice.actions;
export const analyticsReducer = analyticsSlice.reducer;