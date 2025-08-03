import React, { useState, useEffect } from 'react'
import { Card } from '../../routes/UiComponents'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import axiosInstance from '../../../api/axiosInstance.js'

function Orders() {
    const [orders, setOrders] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token || !["superadmin", "admin", "staff"].includes(role)) {
            navigate("/");
            return;
        }


        fetchOrders(token, role);
    }, []);

    // Enpoint: GET ALL ORDERS

    const fetchOrders = async (token, role) => {
        try {
            const endpoint = role === "superadmin" ? "/orders/all" : "/orders";
            const res = await axiosInstance.get(`${endpoint}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setOrders(res.data);

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <h2>Pedidos y reservas</h2>
            <p>Estos son los pedidos y reservas que hicieron los huéspedes.</p>

            <div className="d-flex flex-wrap justify-content-center align-items-center mt-3">
                {orders.map((order) => (
                    <Card
                        key={order._id}
                        title={`${order.service_id?.title || "Servicio desconocido"} - ${order.hotel_id?.name || "Hotel desconocido"}`}
                        description={
                            <>
                                <p><strong>Estado:</strong> {order.status}</p>
                                <p><strong>Cliente: </strong>
                                    {order.user_id?.name
                                        ? `${order.user_id.name} (${order.user_id.email})`
                                        : " S/D"}
                                </p>

                                <p><strong>Nota:</strong> {order.note || "Sin nota"}</p>
                                <p><strong>Horario:</strong> {order.service_id?.availableHours}</p>
                                <p><strong>Ubicación:</strong> {order.hotel_id?.city}, {order.hotel_id?.country}</p>
                                <p><strong>Reservado: </strong>
                                    {order.createdAt
                                        ? new Date(order.createdAt).toLocaleDateString()
                                        : " S/D "}
                                </p>

                            </>
                        }
                        cta="Ver más"
                        onClick={() => toast.info("Funcionalidad en desarrollo")}
                    />
                ))}
            </div>

        </div>
    )
}

export default Orders