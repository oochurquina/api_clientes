import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Spinner } from '../../components/Spinner';

export const VerDetalle = () => {
  const {idClient} = useParams();
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true)
  useEffect(() => {
      // setCargando(!cargando)
      const getClient= async()=>{
        try {
          const url = `http://localhost:4000/clientes/${idClient}`
          const resp= await fetch(url);
          const result = await resp.json();
          setCliente(result)
        } catch (error) {
           console.log(error);  
        }
        setTimeout(() => {
          setCargando(!cargando);
        }, 500);
      }
      getClient();
  }, [])
  
  return (
    cargando?<Spinner/>:
    Object.keys(cliente).length===0? <p>No hay resultados...</p>:(
    <div>
      {cargando? 'Cargando...':(
        <>
            <h1 className='font-black text-4xl text-blue-900'>Ver Cliente: {cliente.nombre}</h1>
            <p className='mt-3'>Información del cliente.</p>

            <p className='text-4xl text-gray-800 mt-10'><span className='text-gray-700 uppercase font-bold'>Cliente: </span>{cliente.nombre}</p>
            <p className='text-2xl text-gray-800 mt-4'><span className='text-gray-700 uppercase font-bold'>Email: </span>{cliente.email}</p>
            <p className='text-2xl text-gray-800 mt-4'><span className='text-gray-700 uppercase font-bold'>Telefono: </span>{cliente.telefono}</p>
            <p className='text-2xl text-gray-800 mt-4'><span className='text-gray-700 uppercase font-bold'>Empresa: </span>{cliente.empresa}</p>
            <p className='text-2xl text-gray-800 mt-4'><span className='text-gray-700 uppercase font-bold'>Notas: </span>{cliente.notas}</p>
        </>
      )}

    </div>)
  )
}
