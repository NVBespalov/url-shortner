export interface UrClick {
    id: string;
    createdAt: string;
    ip: string;
    userAgent?: string;
}

export interface Url {
    id: string;
    originalUrl: string;
    shortCode: string;
    createdAt: string;
    expiresAt: string;
    clicks: UrClick[];
    user: {
        id: string;
        name: string;
    }
}
