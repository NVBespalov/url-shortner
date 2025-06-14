import {Routes, Route} from 'react-router-dom';
import {NotFoundPage, MainPage} from '../pages';

export const AppRouter = () => (
    <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
);
