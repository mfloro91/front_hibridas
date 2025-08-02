import React, { useState, useEffect } from 'react'
import { Card, Button } from '../routes/UiComponents'
import imgSpa from '../../assets/spa.jpg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Services() {

    const [services, setServices] = useState([])
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const navigate = useNavigate();
    const goCreateService = () => {
        navigate('/services/createservice')
    }
    const goLogin = () => {
        navigate('/login')
    }

    // Enpoint: GET SERVICES ALL

    useEffect(() => {

        if (role === "superadmin") {
            fetchServicesAll(token);
        } else {
            fetchServices(token);
        }
    }, []);


    const fetchServicesAll = async (token) => {
        try {
            const res = await axios.get("http://localhost:3000/services/all", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setServices(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    const fetchServices = async (token) => {
        try {
            const res = await axios.get("http://localhost:3000/services", {
            headers: { Authorization: `Bearer ${token}` }
            });
            setServices(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container">
            <h2 className="mb-3">Servicios</h2>

            {["superadmin", "admin", "staff"].includes(role) && (
                <>
                    <Button text="Crear nuevo servicio" variant="success" onClick={goCreateService}> </Button>
                </>
            )}

            {!token ? (
                <>
                    <p>
                        Logueate para ver los servicios del hotel donde te hospedas.
                    </p>
                    <Button text="Iniciar sesión" variant="success" onClick={goLogin}>  </Button>
                </>

            ) : (

                <div className="d-flex flex-wrap justify-content-center align-items-center mt-3">

                    {services.map((service) => (
                        <Card
                            key={service._id}
                            title={service.title}
                            description={service.description}
                            cta="Ver más"
                            onClick={() => navigate(`/services/${service._id}`)}

                        >
                            <img src={imgSpa} alt="Imagen del servicio" style={{ width: "100%", borderRadius: "8px" }} />
                        </Card>


                    ))}

                </div>
            )}

        </div>
    )
}

export default Services