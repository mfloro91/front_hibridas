import React from 'react'
import { Button, Card } from '../../routes/UiComponents.js'
import { useNavigate } from 'react-router-dom'

function PanelAdmin() {

    const navigate = useNavigate()
    const userRole = localStorage.getItem("role");
    const hotelId = localStorage.getItem("hotelId");

    const goToServices = () => {
        navigate('/services')
    }
    const goToOrders = () => {
        navigate('/orders')
    }

    const goToHotels = () => {
        if (userRole === "admin") {
            navigate(`/hotels/${hotelId}`);
        } else if (userRole === "superadmin") {
            navigate("/hotels");
        }
    };

    const goToUsers = () => {
        navigate('/users')
    }

    return (
        <div>
            <h2> Panel de administración </h2>


            <div className="d-flex flex-wrap justify-content-center align-items-center mt-5">

                <Card
                    title="Administrar hoteles"
                    description="Eliminar, editar o agregar hoteles."
                    cta="Empezar"
                    onClick={goToHotels}
                />

                {userRole === "superadmin" && (
                    <Card
                        title="Administrar usuarios"
                        description="Visualizar o editar los usuarios creados."
                        cta="Empezar"
                        onClick={goToUsers}
                    />
                )}


                <Card
                    title="Administrar órdenes"
                    description="Visualizar o editar órdenes creadas."
                    cta="Empezar"
                    onClick={goToOrders}
                />

                <Card
                    title="Administrar servicios"
                    description="Visualizar, agregar o editar servicios."
                    cta="Empezar"
                    onClick={goToServices}
                />

            </div>

        </div>
    )
}

export default PanelAdmin