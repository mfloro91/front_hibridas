import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import FormService from "../../UI/FormService";
import { toast } from 'react-toastify';
import axiosInstance from "../../../api/axiosInstance.js";

function EditService() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Endpoint: get service by id
  useEffect(() => {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || (role !== "superadmin" && role !== "admin" && role !== "staff")) {
      navigate("/");
      return;
    }

    const fetchService = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axiosInstance.get(`/services/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setService(res.data);
        setLoading(false);
      } catch (err) {
        setError("No se pudieron obtener los datos del servicio.");
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  //Endpoint: update service by id
  const handleUpdate = async (e, updatedData) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.put(`/services/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("Servicio actualizado correctamente.");
      navigate('/services/' + id);

    } catch (err) {
      toast.error("Hubo un error al actualizar el servicio.");
      console.error(err);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return <FormService initialData={service} isEditing={true} handleSubmit={handleUpdate} />;
}

export default EditService;