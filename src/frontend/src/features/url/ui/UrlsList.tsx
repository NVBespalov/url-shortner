import {Alert, Box, Button, Chip, CircularProgress, IconButton, List, ListItem, Paper, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import type {Url} from "../model/types";
import {useEffect} from "react";
import {deleteUrlThunk, loadUserUrls, openShortUrl} from "../model/urlThunk";
import {useNavigate} from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';


export const UrlsList = () => {
    const dispatch = useAppDispatch();
    const urls: Url[] = useAppSelector(state => state.urls.items);
    const isLoading = useAppSelector(state => state.urls.isLoading);
    const error = useAppSelector(state => state.urls.error);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(loadUserUrls());
    }, [dispatch]);

    if (isLoading) {
        return <CircularProgress/>;
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    if (urls.length === 0) {
        return <Typography>У вас пока нет сокращённых ссылок</Typography>;
    }


    return (
        <Paper
            elevation={1}
            sx={{
                padding: 2,
                bgcolor: '#f5f5f5'
            }}

        >
            <List sx={{ gap: 2, display: 'flex', flexDirection: 'column' }}>
                {urls.map((url) => (
                    <ListItem
                        key={url.id}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'stretch',
                            padding: '16px',
                            bgcolor: 'white',
                            borderRadius: 1,
                            boxShadow: 1,

                        }}

                    >
                        <Box sx={{display: 'flex', justifyContent: 'space-between', width: '100%', mb: 1}}>
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
                                        background: 'transparent'
                                    }
                                }}
                            >
                                {url.shortCode}
                            </Button>

                            <Box>
                                <IconButton
                                    color="primary"
                                    onClick={() => navigate(`/${url.shortCode}`)}
                                >
                                    <InfoIcon/>
                                </IconButton>
                                <IconButton
                                    color="error"
                                    onClick={() => dispatch(deleteUrlThunk(url.id))}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </Box>
                        </Box>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{wordBreak: 'break-all'}}
                        >
                            {url.originalUrl}
                        </Typography>

                        <Box sx={{display: 'flex', gap: 1, mt: 1}}>
                            <Chip
                                size="small"
                                label={`Переходов: ${url.clicks?.length || 0}`}
                                color="primary"
                                variant="outlined"
                            />
                            <Chip
                                size="small"
                                label={`Создано: ${new Date(url.createdAt).toLocaleDateString()}`}
                                variant="outlined"
                            />
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Paper>

    );
};