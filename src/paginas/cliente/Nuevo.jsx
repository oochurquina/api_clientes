import React from 'react'
import { Formulario } from '../../components/Formulario'

export const Nuevo = () => {
  return (
    <>
      <h1 className='font-black text-blue-900 text-4xl'>Nuevo Cliente</h1>
      <p className='mt-3'>Completa los siguientes campos para registrar un cliente.</p>
      <Formulario />
    </>
  )
}
