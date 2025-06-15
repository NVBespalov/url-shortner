import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.tsx'
import {StrictMode} from "react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {CssBaseline} from "@mui/material";
import {store} from "./app/store/store.ts";

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <CssBaseline />
                <App />
            </BrowserRouter>
        </Provider>
    </StrictMode>
);

