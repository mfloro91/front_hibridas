// ServiceReserve.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import axiosInstance from '../../api/axiosInstance.js';

function ServiceReserve() {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [note, setNote] = useState("");
    const [date, setDate] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/");

        axiosInstance.get(`/services/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => setService(res.data))
            .catch(() => toast.error("No se pudo cargar el servicio"));
    }, [id]);

    const handleReserve = async () => {
        const token = localStorage.getItem("token");
        try {
            await axiosInstance.post(`/orders`, {
                service_id: service._id,
                note: `${note} — Día: ${date}`
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Reserva realizada exitosamente");
            navigate("/orders"); // o donde desees
        } catch {
            toast.error("Error al hacer la reserva");
        }
    };

    return (
        <div>
            <h2>Reservar: {service?.title}</h2>
            <p>{service?.description}</p>
            {service?.hotel_id && (
                <p><strong>Hotel:</strong> {service.hotel_id.name}</p>
            )}

            <p><strong>Horario disponible:</strong> {service?.availableHours}</p>

            <label>Nota:</label>
            <textarea value={note} onChange={e => setNote(e.target.value)} />

            <label>Día de reserva:</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />

            <button onClick={handleReserve}>Confirmar reserva</button>
        </div>
    );
}

export default ServiceReserve;