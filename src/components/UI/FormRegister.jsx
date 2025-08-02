import React, { useState, useEffect } from "react";
import FormInput from "./FormInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const FormRegister = () => {

    const [formData, setFormData] = useState({
        hotel_id: "",
        name: "",
        userName: "",
        email: "",
        password: "",
    });

    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get("http://localhost:3000/hotels");
                setHotels(response.data);
            } catch (error) {
                console.error("Error accediendo a hoteles", error);
            }
        };
        fetchHotels();
    }, []);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            hotel_id: formData.hotel_id,
            name: formData.name,
            userName: formData.userName,
            email: formData.email,
            password: formData.password,
        }
        try {
            await axios.post("http://localhost:3000/users", newUser);
            setFormData({
                hotel_id: "",
                name: "",
                userName: "",
                email: "",
                password: "",
            });

            toast.success("Usuario creado correctamente.");
            navigate("/login");


        } catch (error) {
            toast.error("No se ha creado el usuario.");
            console.error(error);
        }
    }


    const inputs = [
        {
            id: 1,
            name: "name",
            type: "text",
            placeholder: "Nombre",
            errorMessage: "El nombre debe tener al menos 3 caracteres.",
            label: "Nombre",
            pattern: ".{3,}",
            required: true
        },
        {
            id: 2,
            name: "userName",
            type: "text",
            placeholder: "Nombre de usuario",
            label: "Nombre de usuario",
            required: true
        },
        {
            id: 3,
            name: "email",
            type: "email",
            placeholder: "Correo electrónico",
            errorMessage: "El correo electrónico no es válido.",
            label: "Correo electrónico",
            required: true
        },
        {
            id: 4,
            name: "password",
            type: "password",
            placeholder: "Contraseña",
            errorMessage: "La contraseña debe tener al menos 6 caracteres.",
            label: "Contraseña",
            pattern: ".{6,}",
            required: true
        },
    ];

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <form onSubmit={handleSubmit} className="mt-5">

            {inputs.map((input) => (
                <FormInput key={input.id} value={formData[input.name]} handleOnChange={handleOnChange} {...input} />
            ))

            }

            <label className="form-label mt-2">¿En qué hotel te estás hospedando?</label>
            <select
                name="hotel_id"
                className="form-select"
                value={formData.hotel_id}
                onChange={handleOnChange}
                required
            >
                <option value="">Seleccioná un hotel</option>
                {hotels.map((hotel) => (
                    <option key={hotel._id} value={hotel._id}>
                        {hotel.name}
                    </option>
                ))}
            </select>

            <button type="submit" className="btn btn-primary mt-3">Crear usuario</button>

        </form>
    )
}




export default FormRegister;