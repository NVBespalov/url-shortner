import {configureStore} from '@reduxjs/toolkit';
import {qrCodeReducer} from "../../features/qr-code/model/qrCodeSlice.ts";
import {authReducer} from "../../features/auth/model/authSlice.ts";
import {profileReducer} from "../../features/profile/model/profileSlice.ts";
import {urlsReducer} from "../../features/url/model/urlSlice.ts";
import {registrationReducer} from "../../features/auth/model/registrationSlice.ts";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        qrCode: qrCodeReducer,
        urls: urlsReducer,
        registration: registrationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;