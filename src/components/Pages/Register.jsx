import React from 'react'
import FormRegister from '../UI/FormRegister'

// Register trae el formRegister el cual hace una petición POST para crear un nuevo usuario

function Register() {
  return (
    <div>
        <h2>Crear nuevo usuario</h2>
        <FormRegister/>

    </div>
  )
}

export default Register