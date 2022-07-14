import React, {useState, useEffect } from 'react'
import { Cliente } from '../components/Cliente'

export const Inicio = () => {
  const [clientes, setClientes] = useState([])
  useEffect(() => {
    const getClient=async()=>{
      try {
        const url = 'http://localhost:4000/clientes'
        const resp = await fetch(url);
        const result = await resp.json();
        setClientes(result);
        
      } catch (error) {
        console.log(error);
      }
    }
    getClient();
    console.log(clientes);
  }, [])
  const handleEliminar = async (id) => {
    const confirmar = confirm('¿Deseas Eliminar este cliente?')
    if (confirmar){
      try {
         const url = `http://localhost:4000/clientes/${id}`;
         const respuesta = await fetch(url,{
          method: 'DELETE'
         })
         await respuesta.json();
         const arrayClientes = clientes.filter(cliente=>cliente.id!==id);
         setClientes(arrayClientes);

      } catch (error) {
         console.log(error);
      }
    }
    console.log('Eliminando...', id)
  }
  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
      <p className='mt-3'>Administra tus clientes.</p>
      <table className='w-full mt-5 table-auto shadow bg-white'>
         <thead className='bg-blue-800 text-white'>
            <tr>
              <th className='p-2'>Nombre</th>
              <th className='p-2'>Contacto</th>
              <th className='p-2'>Empresa</th>
              <th className='p-2'>Acciones</th>
            </tr>
         </thead>
         <tbody>
            {
              clientes.map(cliente=>(
                <Cliente 
                  handleEliminar={handleEliminar}
                  key={cliente.id} cliente={cliente}/>
              ))
            }
         </tbody>
      </table>
    </>
  )
}
