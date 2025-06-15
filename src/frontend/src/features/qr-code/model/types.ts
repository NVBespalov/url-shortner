// src/features/qr-code/model/types.ts
export interface QRCodeState {
    qrCodeData: string | null;
    isLoading: boolean;
    error: string | null;
}