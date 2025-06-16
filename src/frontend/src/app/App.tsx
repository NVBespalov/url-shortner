import './App.css';
import { createTheme, ThemeProvider } from '@mui/material';
import { AppRouter } from './AppRouter';
import { useInitProfile } from '../features/profile/model/useInitProfile';
import { useLocation } from 'react-router-dom';
import { AppBar } from '../shared/ui/AppBar';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

export const App = () => {
  useInitProfile();
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <ThemeProvider theme={theme}>
      {!isAuthPage && <AppBar />}
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;
