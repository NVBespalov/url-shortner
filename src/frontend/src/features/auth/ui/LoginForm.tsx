// features/auth/ui/LoginForm.tsx
import React, {useState} from 'react';
import {useLogin} from '../model/useLogin';
import {TextField, Button, Box, Typography, Alert} from '@mui/material';

export const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {loading, error, token, handleLogin} = useLogin();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await handleLogin(email, password);
    };

    return (
        <Box component="form" onSubmit={onSubmit} sx={{maxWidth: 300, margin: '0 auto'}}>
            <Typography variant="h5" component="h2" gutterBottom>
                Вход
            </Typography>
            <TextField
                type="email"
                label="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                fullWidth
                margin="normal"
            />
            <TextField
                type="password"
                label="Пароль"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                fullWidth
                margin="normal"
            />
            <Button
                type="submit"
                variant="contained"
                disabled={loading}
                fullWidth
                sx={{mt: 2}}
            >
                {loading ? 'Входим...' : 'Войти'}
            </Button>
            {error && <Alert severity="error" sx={{mt: 2}}>{error}</Alert>}
            {token && <Alert severity="success" sx={{mt: 2}}>Токен: {token}</Alert>}
        </Box>
    );
};