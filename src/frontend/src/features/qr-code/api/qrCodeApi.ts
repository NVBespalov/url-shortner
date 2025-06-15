import {api} from "../../../shared/api";

export const qrCodeApi = {
    generateQRCode: async (url: string): Promise<string> => {
        const response = await api.get<{ qrcode: string }>('/qrcode/generate', {
            params: { url }
        });
        return response.data.qrcode;
    }
};