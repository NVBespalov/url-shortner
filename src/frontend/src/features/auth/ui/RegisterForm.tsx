import { useForm, Controller, type FieldValues } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    TextField,
    Button,
    Box,
    Typography,
    CircularProgress,
    Alert,
} from '@mui/material';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {registerUser} from "../model/registerUser";
import {registerSchema} from "../../../shared/validation/registerSchema";
import {useNavigate} from "react-router-dom";

export const RegistrationForm = () => {
    const dispatch = useAppDispatch();
    const { loading, error, data } = useAppSelector(
        (state) => state.registration,
    );
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
            confirmPassword: ''
        }
    });

    const onSubmit = (formData: FieldValues) => {
        debugger
        dispatch(registerUser({
            userData: formData,
            navigate
        }));
    };

    if (data) {
        return (
            <Alert severity="success">Регистрация прошла успешно!</Alert>
        )
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1, maxWidth: 400, mx: 'auto' }}
        >
            <Typography component="h1" variant="h5">
                Регистрация
            </Typography>
            <Controller
                name="name"
                control={control}
                render={({field}) => (
                    <TextField
                        {...field}
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Имя"
                        autoComplete="name"
                        placeholder="John Doe"
                        autoFocus
                        error={!!errors.name}
                        helperText={errors.name?.message as string}
                    />
                )}
            />
            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        autoComplete="email"
                        placeholder="email@email.com"
                        autoFocus
                        error={!!errors.email}
                        helperText={errors.email?.message as string}
                    />
                )}
            />
            <Controller
                name="password"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        placeholder="******"
                        autoComplete="new-password"
                        error={!!errors.password}
                        helperText={errors.password?.message as string}
                    />
                )}
            />
            <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Подтвердите пароль"
                        type="password"
                        id="confirmPassword"
                        placeholder="******"
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message as string}
                    />
                )}
            />
            {error && <Alert severity="error">{error as string}</Alert>}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
            >
                {loading ? <CircularProgress size={24} /> : 'Зарегистрироваться'}
            </Button>
            <Box sx={{mt: 2, textAlign: 'center'}}>
                <Typography variant="body2">
                    Уже есть аккаунт?{' '}
                    <Button
                        onClick={() => navigate('/login')}
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
                        Войти
                    </Button>
                </Typography>
            </Box>

        </Box>
    );
};