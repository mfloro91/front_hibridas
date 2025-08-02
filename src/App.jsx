import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Nav from './components/UI/Nav.jsx'
import { Home, Contact, Login, NotFound, Profile, Register, Users, Orders, PanelAdmin } from './index.js';
import HotelRoutes from './components/routes/HotelRoutes.jsx';
import ServiceRoutes from './components/routes/ServicesRoutes.jsx';
import Footer from './components/UI/Footer.jsx';



function App() {


  return (
    <div className="app-container">



      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/paneladmin" element={<PanelAdmin />} />
          <Route path="/services/*" element={<ServiceRoutes />} />

          <Route path="/hotels/*" element={<HotelRoutes />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/users" element={<Users />} />

          <Route path="/orders" element={<Orders />} />

          <Route path="*" element={<NotFound />} />
        </Routes >
      </main>
      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />


    </div>

  )
}

export default App