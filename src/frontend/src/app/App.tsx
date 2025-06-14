import './App.css'
import {createTheme, ThemeProvider} from "@mui/material";
import {AppRouter} from "./AppRouter.tsx";

const theme = createTheme({
    palette: {
        mode: 'light',
    },
});

export const App = () => (
    <ThemeProvider theme={theme}>
        <AppRouter />
    </ThemeProvider>
);


export default App
