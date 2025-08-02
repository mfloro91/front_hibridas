export {default as Home} from './components/Pages/Home.jsx';
export {default as Contact} from './components/Pages/Contact.jsx';

export {default as Login} from './components/Pages/Login.jsx';
export {default as Profile} from './components/Pages/Profile.jsx';
export {default as Register} from './components/Pages/Register.jsx';
export {default as Users} from './components/Pages/Admin/Users.jsx';

export {default as NotFound} from './components/Pages/NotFound.jsx';

// PANEL ADMIN - solo se habilita en el nav si tenes rol Admin, Superadmin o Staff

export {default as PanelAdmin} from './components/Pages/Admin/PanelAdmin.jsx';

//CRUD hoteles

export {default as Hotels} from './components/Pages/Admin/Hotels.jsx';
export {default as CreateHotel} from './components/Pages/Admin/CreateHotel.jsx';
export {default as HotelById} from './components/Pages/Admin/HotelById.jsx';
export {default as EditHotel} from './components/Pages/Admin/EditHotel.jsx';

//CRUD services

export {default as Services} from './components/Pages/Services.jsx';
export {default as CreateService} from './components/Pages/Admin/CreateService.jsx';
export {default as ServiceById} from './components/Pages/ServiceById.jsx';
export {default as EditService} from './components/Pages/Admin/EditService.jsx';

//CRUD orders
export {default as Orders} from './components/Pages/Admin/Orders.jsx';
export {default as ServiceReserve} from './components/Pages/ServiceReserve.jsx';