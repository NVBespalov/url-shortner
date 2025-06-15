import React from 'react';
import {useSelector} from "react-redux";
import type {RootState} from "../../app/store.ts";

interface RequireAnonymousProps {
    children: React.ReactElement;
}

export const RequireAnonymous: React.FC<RequireAnonymousProps> = ({ children }) => {
    const token = useSelector((state: RootState) => state.auth.token);
    const isAuth = Boolean(token);

    if (isAuth) {
        window.location.href = '/';
        return null;
    }

    return children;
};