import React, { useState } from "react";
import FormInput from "./FormInput";

const FormService = ({ initialData, isEditing, handleSubmit }) => {

    const [formData, setFormData] = useState(initialData || {
        title: "",
        description: "",
        availableHours: "",
    });

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const inputs = [
        {
            id: 1,
            name: "title",
            type: "text",
            placeholder: "Título del servicio",
            errorMessage: "El título debe tener al menos 3 caracteres.",
            label: "Título",
            pattern: "^[A-Za-z]{3,}$",
            required: true
        },
        {
            id: 2,
            name: "description",
            type: "text",
            errorMessage: "La descripción debe tener al menos 3 caracteres.",
            placeholder: "Descripción del servicio",
            pattern: ".{3,}",
            label: "Descripción",
            required: true
        },
        {
            id: 3,
            name: "availableHours",
            type: "text",
            placeholder: "Horas disponibles (ej. 10:00 - 18:00)",
            label: "Horas disponibles",
            pattern: "^(?:[01][0-9]|2[0-3]):[0-5][0-9] - (?:[01][0-9]|2[0-3]):[0-5][0-9]$",
            errorMessage: "El formato debe ser 'HH:MM - HH:MM' (ej. 10:00 - 18:00).",
            required: true
        },
    ];


    return (

        <form onSubmit={(e) => handleSubmit(e, formData)} className="mt-5">

            {inputs.map((input) => (
                <FormInput key={input.id} value={formData[input.name]} handleOnChange={handleOnChange} {...input} />
            ))

            }

            <button type="submit" className="btn btn-primary mt-3">
                {isEditing ? "Editar servicio" : "Crear servicio"}
            </button>


        </form>

    )
}



export default FormService;