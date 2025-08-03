import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import FormHotel from "../../UI/FormHotel";
import { toast } from 'react-toastify';
import axiosInstance from "../../../api/axiosInstance.js";


function EditHotel() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //Endpoint: get hotel by id
    useEffect(() => {

        const fetchHotel = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axiosInstance.get(`/hotels/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setHotel(res.data);
                setLoading(false);
            } catch (err) {
                setError("No se pudo obtener los datos del hotel.");
                setLoading(false);
            }
        };
        fetchHotel();
    }, [id]);

    //Endpoint: update hotel by id
    const handleUpdate = async (e, updatedData) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const res= await axiosInstance.put(`/hotels/${id}`, updatedData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success("Hotel actualizado correctamente");
            navigate('/hotels/' + id); 
            
        } catch (err) {
            toast.error("Error al actualizar el hotel");
            console.error(err);
        }
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return <FormHotel initialData={hotel}  isEditing={true} handleSubmit={handleUpdate} />;
}

export default EditHotel;