import { Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { Services, CreateService, ServiceById, EditService, ServiceReserve} from '../../index.js';

function ServiceRoutes() {
    const location = useLocation();

    return (
        <>
        {location.pathname === '/services' && <Services />}
            
            <Routes>
                <Route path="/" element={<Outlet />} />
                <Route path="createservice" element={<CreateService />} />
                <Route path=":id" element={<ServiceById />} />
                <Route path="editservice/:id" element={<EditService />} />
                <Route path="reserve/:id" element={<ServiceReserve />} />

            </Routes>
        </>
    );
}

export default ServiceRoutes;