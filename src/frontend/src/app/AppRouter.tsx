import {Route, Routes} from 'react-router-dom';
import {MainPage, NotFoundPage} from '../pages';
import {RequireAuth} from "../shared/ui/RequireAuth.tsx";
import {LoginPage} from "../pages/LoginPage.tsx";
import {RequireAnonymous} from "../shared/ui/RequireAnonymous.tsx";
import {RegistrationPage} from "../pages/RegisterPage.tsx";
import {UrlDetails} from "../features/url/ui/UrlDetails.tsx";

export const AppRouter = () => (
    <Routes>
        <Route path="/login" element={<RequireAnonymous><LoginPage/></RequireAnonymous>}/>
        <Route path="/register" element={<RequireAnonymous><RegistrationPage/></RequireAnonymous>}/>
        <Route path="/" element={<RequireAuth><MainPage/></RequireAuth>}/>
        <Route path="/:shortCode" element={<RequireAuth><UrlDetails/></RequireAuth>}/>
        <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
);
