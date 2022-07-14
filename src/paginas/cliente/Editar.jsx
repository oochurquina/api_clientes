import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Formulario } from '../../components/Formulario'

export const Editar = () => {
  const {idClient}= useParams();
  const [cargando, setCargando] = useState(true);
  const [cliente, setCliente] = useState({});
  useEffect(() => {
    const getClient = async ()=>{
      try {
         const url = `http://localhost:4000/clientes/${idClient}`
         const resp = await fetch(url);
         const result = await resp.json();
         setCliente(result);
      } catch (error) {
        console.log(error);
      }
      setCargando(!cargando)
    }
    getClient();
  }, [])
return (
  <>
    <h1 className='font-black text-blue-900 text-4xl'>Editar Cliente</h1>
    <p className='mt-3'>Actualizar los datos del cliente.</p>
    {cliente?.nombre ? (

      <Formulario 
      datoCliente={cliente}
      cargando={cargando}
      />
    ): <p>No existe el ID del cliente.</p>}
  </>
  )
}
