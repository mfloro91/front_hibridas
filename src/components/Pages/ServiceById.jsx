import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../routes/UiComponents'
import axios from 'axios'
import { toast } from 'react-toastify'

function ServiceById() {

    const { id } = useParams()
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const [showConfirm, setShowConfirm] = useState(false);

    const goToServices = () => {
        navigate('/services')
    }

    // Endpoint: get hotel by id
    useEffect(() => {
        if (!token) {
            navigate("/");
            return;
        }

        const fetchServiceById = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`http://localhost:3000/services/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setService(res.data);
                setLoading(false);

            } catch (err) {
                setError("No se pudo obtener el servicio.");
                setLoading(false);

            }
        };

        fetchServiceById();
    }, [id]);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;
    if (!service) return <p>No se encontró el servicio.</p>;

    //Endpoint: delete service by id
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:3000/services/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Servicio eliminado correctamente.");
            navigate('/services');
        } catch (err) {
            console.error(err);
            toast.error("Error al eliminar el servicio.");
        } finally {
            setShowConfirm(false);
        }
    }


    //Enpoint: reservar servicio
    const reservarServicio = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post('http://localhost:3000/orders', {
                service_id: service._id,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success("¡Servicio reservado con éxito!");
        } catch (err) {
            toast.error("No se pudo reservar el servicio");
        }
    };


    return (
        < div >
            <h2> {service.title} </h2>
            <p> {service.description} </p>
            <p> Horarios: {service.availableHours} </p>

            {service.hotel_id && (
                <div>
                    <p><strong>Hotel:</strong> {service.hotel_id.name}</p>
                    <p>{service.hotel_id.city}, {service.hotel_id.country}</p>
                </div>
            )}




            <Button text="Volver a servicios" variant="success" onClick={goToServices}>  </Button>

            {["superadmin", "admin", "staff"].includes(role) && (
                <>
                    <Button text="Editar servicio" variant="warning" onClick={() => navigate(`/services/editservice/${id}`)}> </Button>
                    <Button
                        text="Eliminar servicio"
                        variant="danger"
                        onClick={() => setShowConfirm(true)}
                    />
                </>
            )}

            {["user"].includes(role) && (
                <>
                    <Button text="Reservar" variant="primary" onClick={() => navigate(`/services/reserve/${service._id}`)}  />
                </>
            )}

            {showConfirm && (
                <div className="modal-overlay mt-5">
                    <div className="modal-box">
                        <h4>¿Estás seguro de que querés eliminar este servicio?</h4>
                        <div className="modal-actions">
                            <Button
                                text="Confirmar"
                                variant="primary"
                                onClick={handleDelete}
                            />
                            <Button
                                text="Cancelar"
                                variant="secondary"
                                onClick={() => setShowConfirm(false)}
                            />
                        </div>
                    </div>
                </div>
            )}

        </div >

    )
}

export default ServiceById