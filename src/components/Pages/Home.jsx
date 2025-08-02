import { useState, useEffect } from 'react'
import { Card, Hotel } from '../routes/UiComponents.js'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Home() {
    const [hotel, setHotel] = useState(null);
    const token = localStorage.getItem("token");
    const hotelId = localStorage.getItem("hotelId");

    const navigate = useNavigate()
    const goToServices = () => {
        navigate('/services')
    }

    const handleProfileClick = () => {
        const userId = localStorage.getItem("userId");
        console.log("userId", userId);
        if (token && userId) {
            navigate(`/profile/${userId}`);
        } else {
            navigate('/login');
        }

    }


    useEffect(() => {

        if (token && hotelId) {
            const fetchHotel = async () => {
                try {
                    const res = await axios.get(`http://localhost:3000/hotels/${hotelId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

                    setHotel(res.data);

                } catch (err) {
                    console.error(err)
                }
            }

            fetchHotel();
        }
    }, []);

    const hotelProps = token && hotel ?
        {
            hotel: hotel.name,
            description: hotel.description

        } : {
            hotel: "HotelApp",
            description: "Una aplicación para gestionar tu estadía en el hotel"
        };

    return (

        <div>

            {!token || hotel ? (
                <Hotel {...hotelProps} />
            ) : (
                <p>Cargando información del hotel...</p>
            )}

            <div className="d-flex flex-wrap justify-content-center align-items-center mt-3">

                <Card
                    title="Servicios"
                    description="Conocer todo lo que puedo hacer en mi estadía."
                    cta="Ver más"
                    onClick={goToServices}
                />

                <Card
                    title="Mi perfil"
                    description="Conocer los detalles de mi estadía."
                    cta={token ? "Ir al perfil" : "Login"}
                    onClick={handleProfileClick}
                />

            </div>

        </div>
    )
}

export default Home