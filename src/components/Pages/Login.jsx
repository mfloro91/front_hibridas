import React from 'react'
import { Link } from 'react-router-dom'
import FormLogin from '../UI/FormLogin'

function Login() {
  return (
    <div>
        <h2>Iniciar sesión</h2>
        <FormLogin/>
        <Link to="/register"> Crear cuenta nueva </Link>
    </div>
  )
}

export default Login