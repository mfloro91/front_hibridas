import React from 'react'
import { useState } from 'react';
import './UI.css'; 

const FormInput = (props) => {
    const [focused, setFocused] = useState(false);
    const {label, errorMessage, handleOnChange, ...otrasProps} = props;

    const handleFocus = () => {
        setFocused(true);
    }

    return (
        <div className='formInput'>
            <label> {label} </label>
            <input {...otrasProps}  onChange={handleOnChange} onBlur={handleFocus} focused={focused.toString()} />
            <span> {errorMessage} </span>
        </div>
    )
}

export default FormInput