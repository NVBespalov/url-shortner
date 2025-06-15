import {Container, Box, Card} from '@mui/material';
import {LoginForm} from "../features/auth/ui/LoginForm";

export const LoginPage = () => {
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    padding: 2
                }}
            >
                <Card sx={{
                    padding: 3,
                    width: '100%',
                    maxWidth: 400
                }}>
                    <LoginForm/>
                </Card>

            </Box>
        </Container>
    );
};
