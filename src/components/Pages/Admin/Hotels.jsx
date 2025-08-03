import React, { useState, useEffect } from 'react'
import { Card, Button } from '../../routes/UiComponents'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import axiosInstance from '../../../api/axiosInstance.js'

function Hotels() {

    const [hotels, setHotels] = useState([])

    const location = useLocation();
    const searchText = location.state?.searchText || "";

    const navigate = useNavigate()
    const goCreateHotel = () => {
        navigate('/hotels/createhotel')
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");

        if (!token || role !== "superadmin") {
            navigate("/");
            return;
        }

        console.log("Texto recibido:", searchText);

        if (searchText !== "") {
            fetchFilteredHotels(token, searchText);
        } else {
            fetchHotels(token); //
        }

    }, [searchText]);

    // Enpoint: GET HOTELS ALL
    const fetchHotels = async (token) => {
        try {
            const res = await axiosInstance.get(`/hotels`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setHotels(res.data);

        } catch (err) {
            console.error(err)
        }
    }

    //Enpoint: GET HOTELS/SEARCH

    const fetchFilteredHotels = async (token, text) => {
        try {
            const res = await axiosInstance.get(`/hotels/search`, {
                params: { search: text },
                headers: { Authorization: `Bearer ${token}` }
            });
            setHotels(res.data);
        } catch (err) {
            console.error("Error al buscar hoteles:", err);
        }
    };


    return (
        <div>
            <h2>Hoteles</h2>
            <p>Estos son algunos de los hoteles que están usando nuestra app.</p>


            {searchText !== "" && (
                <div className="my-3">
                    <p>Mostrando resultados para: <strong>{searchText}</strong></p>
                    <Button
                        text="Ver todos los hoteles"
                        variant="primary"
                        onClick={() => navigate('/hotels')}
                    />
                </div>
            )}

            <Button text="Crear nuevo hotel" variant="success" onClick={goCreateHotel}> </Button>



            <div className="d-flex flex-wrap justify-content-center align-items-center mt-3">
                {hotels.map((hotel) => (
                    <Card
                        key={hotel._id}
                        title={hotel.name}
                        description={`${hotel.city}, ${hotel.country}`}
                        cta="Ver más"
                        onClick={() => navigate(`/hotels/${hotel._id}`)}
                    />
                ))}

            </div>

        </div>
    )
}

export default Hotels