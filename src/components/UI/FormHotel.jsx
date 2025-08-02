import React, { useState } from "react";
import FormInput from "./FormInput";

const FormHotel = ({ initialData, isEditing, handleSubmit }) => {

    const [formData, setFormData] = useState(initialData || {
        name: "",
        logo: "",
        description: "",
        languages: [],
        country: "",
        city: "",

    });

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
            name: "logo",
            type: "text",
            placeholder: "Logo",
            label: "Logo del hotel",
            required: false
        },
        {
            id: 3,
            name: "description",
            type: "text",
            placeholder: "Descripción del hotel",
            errorMessage: "La descripción debe tener al menos 3 caracteres.",
            pattern: ".{3,}",
            label: "Descripción",
            required: true
        },
        {
            id: 4,
            name: "languages",
            type: "text",
            placeholder: "Lenguajes (separados por comas)",
            errorMessage: "Debés escribir al menos un lenguaje.",
            label: "Lenguajes",
            required: true
        },
        {
            id: 5,
            name: "country",
            type: "text",
            placeholder: "País",
            errorMessage: "El país debe tener al menos 2 caracteres.",
            pattern: ".{2,}",
            label: "País",
            required: true
        },
        {
            id: 6,
            name: "city",
            type: "text",
            errorMessage: "La ciudad debe tener al menos 2 caracteres.",
            pattern: ".{2,}",
            placeholder: "Ciudad",
            label: "Ciudad",
            required: true
        }
    ];

    return (
        <form onSubmit={(e) => handleSubmit(e, formData)} className="mt-5">

            {inputs.map((input) => (
                <FormInput key={input.id} value={formData[input.name]} handleOnChange={handleOnChange} {...input} />
            ))

            }

            <button type="submit" className="btn btn-primary mt-3">
                {isEditing ? "Editar hotel" : "Crear hotel"}
            </button>


        </form>
    )
}




export default FormHotel;