import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { Hotels, CreateHotel, HotelById, EditHotel} from '../../index.js';

function HotelRoutes() {
    const location = useLocation();

    return (
        <>
        {location.pathname === '/hotels' && <Hotels />}
            
            <Routes>
                <Route path="/" element={<Outlet />} />
                <Route path="createhotel" element={<CreateHotel />} />
                <Route path=":id" element={<HotelById />} />
                <Route path="edithotel/:id" element={<EditHotel />} />
            </Routes>
        </>
    );
}

export default HotelRoutes;