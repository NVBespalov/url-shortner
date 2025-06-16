import { Box, Card } from '@mui/material';
import { RegistrationForm } from '../features/auth/ui/RegisterForm';

export const RegistrationPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: 2,
      }}
    >
      <Card
        sx={{
          padding: 3,
          width: '100%',
          maxWidth: 400,
        }}
      >
        <RegistrationForm />
      </Card>
    </Box>
  );
};
