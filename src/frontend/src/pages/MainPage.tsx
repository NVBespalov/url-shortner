import { Container, Box } from '@mui/material';
import { ShortenUrlWidget, UrlsListWidget } from '../widgets';

export const MainPage = () => (
  <Container maxWidth="md">
    <Box mt={4}>
      <ShortenUrlWidget />
    </Box>
    <Box mt={4}>
      <UrlsListWidget />
    </Box>
  </Container>
);
