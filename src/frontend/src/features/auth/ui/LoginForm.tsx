import React, { useState } from 'react';
import { useLogin } from '../model/useLogin';
import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, token, handleLogin } = useLogin();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin(email, password);
  };

  return (
    <Box component="form" onSubmit={onSubmit} sx={{ maxWidth: 300, margin: '0 auto' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Вход
      </Typography>
      <TextField
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <TextField
        type="password"
        label="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" disabled={loading} fullWidth sx={{ mt: 2 }}>
        {loading ? 'Входим...' : 'Войти'}
      </Button>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      {token && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Токен: {token}
        </Alert>
      )}
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2">
          Нет аккаунта?{' '}
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Button
              onClick={() => navigate('/register')}
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
              Зарегистрируйтесь
            </Button>
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};
