import React from 'react'
import { useNavigate } from 'react-router-dom';

export const Cliente = ({handleEliminar,cliente}) => {
  const navigate =useNavigate();
  // console.log(cliente);
  const {nombre,empresa,email,telefono,notas,id}= cliente;
  return (
    <tr className='border-b hover:bg-gray-300'>
        <td className='p-3 uppercase'>{nombre}</td>
        <td className='p-3'>
            <p><span className='text-gray-800 uppercase font-bold'>Email: </span>{email}</p>
            <p><span className='text-gray-800 uppercase font-bold'>Tel: </span>{telefono}</p>
            
        </td>
        <td className='p-3'>{empresa}</td>
        <td className='p-3'>
            <button type='button' onClick={()=>navigate(`/clientes/${id}`)} className='bg-green-600 hover:bg-green-700  uppercase p-2 block w-full text-white text-xs font-bold mt-3 '>Ver</button>
            <button type='button' onClick={()=>navigate(`/clientes/editar/${id}`)} className='bg-blue-600 hover:bg-blue-700  uppercase p-2 block w-full text-white text-xs font-bold mt-3 '>Editar</button>
            <button type='button' onClick={()=> handleEliminar(id)} className='bg-red-600 hover:bg-red-700  uppercase p-2 block w-full text-white text-xs font-bold mt-3'>Eliminar</button>
        </td>
    </tr>
  )
}
