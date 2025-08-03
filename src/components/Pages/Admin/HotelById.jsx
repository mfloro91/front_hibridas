import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../routes/UiComponents'
import axios from 'axios'
import { toast } from 'react-toastify'
import axiosInstance from '../../../api/axiosInstance.js'


function HotelById() {

    const { id } = useParams()
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);

    const goToHotels = () => {
        navigate('/hotels')
    }

    // Endpoint: get hotel by id
    useEffect(() => {

        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token || (role !== "superadmin" && role !== "admin")) {
            navigate("/");
            return;
        }

        const fetchHotelById = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axiosInstance.get(`/hotels/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setHotel(res.data);
                setLoading(false);

            } catch (err) {
                setError("No se pudo obtener el hotel.");
                setLoading(false);

            }
        };

        fetchHotelById();
    }, [id]);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;
    if (!hotel) return <p>No se encontró el hotel.</p>;

    //Endpoint: delete hotel by id
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            await axiosInstance.delete(`/hotels/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Hotel eliminado correctamente.");
            navigate('/hotels');
        } catch (err) {
            console.error(err);
            toast.error("Error al eliminar el hotel.");
        } finally {
            setShowConfirm(false);
        }

    }


return (
    <div>
        <h2> {hotel.name} </h2>
        <p> {hotel.description} </p>
        <p> Ciudad: {hotel.city} </p>
        <p> País: {hotel.country} </p>
        <ul>
            {hotel.languages.map((language, index) => (
                <li key={index}>{language}</li>
            ))}
        </ul>


        <Button text="Volver a hoteles" variant="success" onClick={goToHotels}>  </Button>
        <Button text="Editar hotel" variant="warning" onClick={() => navigate(`/hotels/edithotel/${id}`)}>  </Button>


        {localStorage.getItem("role") === "superadmin" && (
            <Button
                text="Eliminar hotel"
                variant="danger"
                onClick={() => setShowConfirm(true)}
            />
        )}

        {showConfirm && (
            <div className="modal-overlay mt-5">
                <div className="modal-box">
                    <h4>¿Estás seguro de que querés eliminar este hotel?</h4>
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



    </div>
)
}

export default HotelById