import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import FormService from '../../UI/FormService'
import { Button } from '../../routes/UiComponents'
import axios from 'axios'
import { toast } from 'react-toastify'


// CreateService trae el formService y una petición POST para crear un nuevo servicio

function CreateService() {

  const navigate = useNavigate()
  const goToServices = () => {
    navigate('/services')
  }

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!token || !["superadmin", "admin", "staff"].includes(role)) {
      navigate("/");
    }
  }, []);

  const handleCreate = async (e, formData) => {
    e.preventDefault();
    try {
      const newService = {
        title: formData.title,
        description: formData.description,
        availableHours: formData.availableHours,
      };

      const res = await axios.post("http://localhost:3000/services", newService, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log("Respuesta del servidor:", res);
      toast.success("Servicio creado correctamente.");
      navigate("/services");


    } catch (error) {
      console.error("Error al crear el servicio:", error.response?.data || error.message);
      toast.error("Hubo un error al crear el servicio. Revisa la consola.");
    }
  }

  return (
    <div>

      <h2>Crear un nuevo servicio</h2>
      <FormService handleSubmit={handleCreate} isEditing={false} />
      <Button text="Volver a servicios" variant="success" onClick={goToServices}>  </Button>

    </div>
  )
}

export default CreateService