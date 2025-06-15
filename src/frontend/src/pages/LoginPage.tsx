
import {Container, Box} from '@mui/material';
import {LoginForm} from "../features/auth/ui/LoginForm.tsx";

export const LoginPage = () => {
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <LoginForm/>
            </Box>
        </Container>
    );
};
