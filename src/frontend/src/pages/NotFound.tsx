import { Typography, Box } from '@mui/material';

export const NotFoundPage = () => (
  <Box
    minHeight="100vh"
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
  >
    <Typography variant="h3">404</Typography>
    <Typography>Страница не найдена</Typography>
  </Box>
);
