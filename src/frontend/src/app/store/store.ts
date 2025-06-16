import { configureStore } from '@reduxjs/toolkit';
import { qrCodeReducer } from '../../features/qr-code/model/qrCodeSlice';
import { authReducer } from '../../features/auth/model/authSlice';
import { profileReducer } from '../../features/profile/model/profileSlice';
import { urlsReducer } from '../../features/url/model/urlSlice';
import { registrationReducer } from '../../features/auth/model/registrationSlice';
import { analyticsReducer } from '../../features/features/link-analytics/model/analyticsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    qrCode: qrCodeReducer,
    urls: urlsReducer,
    registration: registrationReducer,
    analytics: analyticsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
