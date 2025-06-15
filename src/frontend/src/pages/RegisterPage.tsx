
import { Container } from '@mui/material';
import {RegistrationForm} from "../features/auth/ui/RegisterForm.tsx";

export const RegistrationPage = () => {
    return (
        <Container component="main" maxWidth="xs">
            <RegistrationForm />
        </Container>
    );
};