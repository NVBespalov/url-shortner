import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type QRCodeState } from './types';

const initialState: QRCodeState = {
  qrCodeData: null,
  isLoading: false,
  error: null,
};

export const qrCodeSlice = createSlice({
  name: 'qrCode',
  initialState,
  reducers: {
    setQRCodeData: (state, action: PayloadAction<string>) => {
      state.qrCodeData = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    resetQRCode: (state) => {
      state.qrCodeData = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const { setQRCodeData, setLoading, setError, resetQRCode } = qrCodeSlice.actions;
export const qrCodeReducer = qrCodeSlice.reducer;
