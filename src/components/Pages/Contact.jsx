import React from 'react'
import { Button } from '../routes/UiComponents'
import { useNavigate } from 'react-router-dom'

function Contact() {
  const navigate = useNavigate()
  const goToServices = () => {
    navigate('/services')
  }

  return (
    <div className="justify-content-center align-items-center mt-3 ">
      <h2>Contacto</h2>
      <p>Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos.</p>
      <Button text="Llamar a recepción" variant="success"> </Button>
      <Button text="Hacer un pedido" variant="warning" onClick={goToServices}>  </Button>
    </div>
  )
}

export default Contact