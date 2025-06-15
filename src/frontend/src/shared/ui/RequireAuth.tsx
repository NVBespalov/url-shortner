import React from 'react';
import {useSelector} from 'react-redux';
import type {RootState} from "../../app/store/store";


interface RequireAuthProps {
    children: React.ReactElement;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
    const token = useSelector((state: RootState) => state.auth.token);
    const isAuth = Boolean(token);

    if (!isAuth) {
        window.location.href = '/login';
        return null;
    }

    return children;
};