import { AppBar as MuiAppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {logout} from "../../features/auth/model/authSlice.ts";


export const AppBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <MuiAppBar position="static">
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div">
                        URL Сократитель
                    </Typography>
                </Box>
                <Button color="inherit" onClick={handleLogout}>
                    Выйти
                </Button>
            </Toolbar>
        </MuiAppBar>
    );
};