import { memo } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import {getRedirectUrl} from "../../../shared/utils/url";

interface QRCodeDisplayProps {
    shortCode: string;
    className?: string;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(2)
}));

export const QRCodeDisplay = memo<QRCodeDisplayProps>(({ shortCode, className }) => {
    return (
        <StyledPaper elevation={3} className={className}>
            <Typography variant="h6">QR-код для вашей ссылки</Typography>
            <Box sx={{ bgcolor: 'white', p: 2, borderRadius: 1 }}>
                <QRCodeSVG
                    value={getRedirectUrl(shortCode)}
                    size={200}
                    level={'H'}
                    marginSize={10}
                />
            </Box>
        </StyledPaper>
    );
});

QRCodeDisplay.displayName = 'QRCodeDisplay';