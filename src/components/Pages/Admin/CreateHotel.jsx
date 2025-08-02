import React from 'react'
import { useNavigate } from 'react-router-dom'
import FormHotel from '../../UI/FormHotel'
import { Button } from '../../routes/UiComponents'
import axios from 'axios'
import { toast } from 'react-toastify'

// CreateHotel trae el formHotel y una petición POST para crear un nuevo hotel

function CreateHotel() {

  const navigate = useNavigate()
  const goToHotels = () => {
    navigate('/hotels')
  }

  const handleCreate = async (e, formData) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const newHotel = {
        name: formData.name,
        logo: formData.logo,
        description: formData.description,
        languages: formData.languages.split(",").map(lang => lang.trim()),
        country: formData.country,
        city: formData.city,
      };

      const res = await axios.post("http://localhost:3000/hotels", newHotel, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log("Respuesta del servidor:", res);
      toast.success("Hotel creado correctamente.");
      navigate("/hotels");


    } catch (error) {
      console.error("Error al crear el hotel:", error.response?.data || error.message);
      toast.error("Hubo un error al crear el hotel. Revisa la consola.");
    }
  }

  return (
    <div>
      <h2>Crear un nuevo hotel</h2>
      <FormHotel handleSubmit={handleCreate} isEditing={false} />
      <Button text="Volver a hoteles" variant="success" onClick={goToHotels}>  </Button>

    </div>
  )
}

export default CreateHotel