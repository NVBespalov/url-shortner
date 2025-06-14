import { configureStore } from '@reduxjs/toolkit';
import { urlSlice } from '../entities/url/model';

export const store = configureStore({
    reducer: {
        url: urlSlice.reducer,
        // другие сущности и фичи, если появятся
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;