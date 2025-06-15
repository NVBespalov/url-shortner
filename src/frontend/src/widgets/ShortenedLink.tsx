// src/widgets/ShortenedLink/ui/ShortenedLink.tsx
import {useEffect} from 'react';
import {Container, CircularProgress, Typography} from '@mui/material';
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {setError, setLoading} from "../features/url/model/urlSlice.ts";
import {qrCodeApi} from "../features/qr-code/api/qrCodeApi.ts";
import {setQRCodeData} from "../features/qr-code/model/qrCodeSlice.ts";
import {QRCodeDisplay} from "../features/qr-code/ui/QRCodeDisplay.tsx";


interface ShortenedLinkWidgetProps {
    shortCode: string;
    className?: string;
}

export const ShortenedLink = ({shortCode, className}: ShortenedLinkWidgetProps) => {
    const dispatch = useAppDispatch();
    const {qrCodeData, isLoading, error} = useAppSelector(state => state.qrCode);

    useEffect(() => {
        const loadQRCode = async () => {
            try {
                dispatch(setLoading(true));
                const data = await qrCodeApi.generateQRCode(shortCode);
                dispatch(setQRCodeData(data));
            } catch (err) {
                dispatch(setError('Не удалось загрузить QR-код'));
            }
        };

        if (shortCode) {
            void loadQRCode();
        }
    }, [dispatch, shortCode]);

    if (isLoading) {
        return (
            <Container sx={{display: 'flex', justifyContent: 'center', py: 4}}>
                <CircularProgress/>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Typography color="error">{error}</Typography>
            </Container>
        );
    }

    if (!qrCodeData) {
        return null;
    }

    return (
        <Container maxWidth="sm" sx={{py: 4}} className={className}>
            <QRCodeDisplay shortCode={shortCode}/>
        </Container>
    );
};