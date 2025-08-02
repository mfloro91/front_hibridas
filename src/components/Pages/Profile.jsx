import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { toast } from 'react-toastify';


const Profile = () => {
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");
  const hotelName = localStorage.getItem("hotelName");
  const userId = localStorage.getItem("userId");
  const hotelId = localStorage.getItem("hotelId");


  return (
    <div>
      <h3 className="mb-3">Perfil de Usuario</h3>
      <div className="card p-4 container">
        <button
          className="btn btn-light position-absolute top-0 end-0 m-3"
          onClick={() => toast.info("Funcionalidad en desarrollo")}
        >
          <i className="bi bi-pencil"></i>
        </button>

        <ul className="list-unstyled">
          <li><strong>Nombre:</strong> {name}</li>
          <li><strong>Rol:</strong> {role}</li>
          <li><strong>Hotel asignado:</strong> {hotelName} </li>
          <li><strong>ID de Usuario:</strong> {userId}</li>
        </ul>
      </div>
    </div>
  );
}

export default Profile