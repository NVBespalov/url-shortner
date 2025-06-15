export interface Url {
    id: string;
    originalUrl: string;
    shortCode: string;
    createdAt: string;
    expiresAt: string;
    clicks: number;
    user: {
        id: string;
        name: string;
    }
}
