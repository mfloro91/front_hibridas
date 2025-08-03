import React, { useState, useEffect } from 'react'
import { Card } from '../../routes/UiComponents'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import axiosInstance from '../../../api/axiosInstance.js'

function Users() {
    const [users, setUsers] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token || role !== "superadmin") {
            navigate("/");
            return;
        }

        fetchUsers(token);
    }, []);


    // Endpoint: GET ALL USERS con autenticación
    const fetchUsers = async (token) => {
        try {
            const res = await axiosInstance.get(`/users`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setUsers(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // Función para actualizar el rol del usuario
    const updateUserRole = async (id, newRole) => {
        const token = localStorage.getItem("token");

        try {
            await axiosInstance.patch(`/users/${id}`, { role: newRole }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success("Rol actualizado correctamente");
            fetchUsers(token);

        } catch (error) {
            console.error("Error al actualizar el rol:", error.response?.data || error.message);
            toast.error("Hubo un error al actualizar el rol.");
        }
    };



    return (
        <div>
            <h2>Usuarios</h2>
            <p>Estos son los usuarios que tienen cuenta en la app.</p>

            <div className="d-flex flex-wrap justify-content-center align-items-center mt-3">
                {users.map((user) => (
                    <Card
                        key={user._id}
                        title={user.name}
                        description={user.email}
                        cta="Ver más"
                    >
                        <p>Rol:</p>

                        <select
                            value={user.role}
                            onChange={(e) => updateUserRole(user._id, e.target.value)}
                        >
                            <option value="user">Usuario</option>
                            <option value="staff">Staff</option>
                            <option value="admin">Admin</option>
                            <option value="superadmin">Superadmin</option>
                        </select>
                        </Card>
                ))}

            </div>

        </div>
    )
}

export default Users