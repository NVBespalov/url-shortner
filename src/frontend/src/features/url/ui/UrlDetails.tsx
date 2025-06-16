import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Paper,
  Button,
  CircularProgress,
} from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import type { Url } from '../model/types';
import { QRCodeDisplay } from '../../qr-code/ui/QRCodeDisplay';
import { loadUrlByShorCodeThunk, openShortUrl } from '../model/urlThunk';
import { useEffect } from 'react';
import { LinkAnalytics } from '../../features/link-analytics/ui/LinkAnalytics/LinkAnalytics';

export const UrlDetails = () => {
  const { shortCode } = useParams();
  const dispatch = useAppDispatch();
  const url = useAppSelector((state) =>
    state.urls.items.find((item: Url) => item.shortCode === shortCode),
  );
  const isLoading = useAppSelector((state) => state.urls.isLoading);
  const error = useAppSelector((state) => state.urls.error);

  useEffect(() => {
    if (shortCode && !url) {
      dispatch(loadUrlByShorCodeThunk(shortCode));
    }
  }, [shortCode, dispatch, url]);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!url) {
    return <Typography>Ссылка не найдена</Typography>;
  }

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h5" component="h2">
            Информация о ссылке
          </Typography>

          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="subtitle1" color="text.secondary">
              Короткая ссылка:
            </Typography>
            <Button
              onClick={() => openShortUrl(url.shortCode)}
              sx={{
                textTransform: 'none',
                textAlign: 'left',
                p: 0,
                minWidth: 'auto',
                color: 'primary.main',
                '&:hover': {
                  textDecoration: 'underline',
                  background: 'transparent',
                },
              }}
            >
              {url.shortCode}
            </Button>
          </Paper>

          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="subtitle1" color="text.secondary">
              Оригинальная ссылка:
            </Typography>
            <Typography variant="body1" sx={{ wordBreak: 'break-all' }}>
              {url.originalUrl}
            </Typography>
          </Paper>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <QRCodeDisplay shortCode={url.shortCode} />
          </Box>
          <LinkAnalytics sortCode={url.shortCode} />
          <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <Chip label={`Переходов: ${url.clicks?.length || 0}`} color="primary" />
            <Chip label={`Создано: ${new Date(url.createdAt).toLocaleDateString()}`} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
