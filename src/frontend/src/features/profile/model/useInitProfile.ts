import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useEffect, useRef} from "react";
import {loadProfile} from "./loadProfileThunks";

export const useInitProfile = () => {
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.token);
    const profile = useAppSelector(state => state.auth.profile);
    const profileIsLoading = useAppSelector(state => state.profile.isLoading);
    const initRef = useRef(false);

    useEffect(() => {
        if (token && !profile && !profileIsLoading && !initRef.current) {
            initRef.current = true;
            dispatch(loadProfile());
        }

    }, [dispatch, token, profile, profileIsLoading]);
};
