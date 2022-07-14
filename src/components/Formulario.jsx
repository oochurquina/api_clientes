import { Formik, Form, Field, ErrorMessage} from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Error } from './Error';
import { Spinner } from './Spinner';

export const Formulario = ({datoCliente,cargando}) => {
    const navigate = useNavigate();
    const cliente = {
        nombre  : datoCliente?.nombre ??"",
        empresa : datoCliente?.empresa ?? "",
        email   : datoCliente?.email ?? "",
        telefono: datoCliente?.telefono ?? "",
        notas   : datoCliente?.notas ?? ""
    }
    const nuevoClienteSchema= Yup.object().shape({
        nombre: Yup.string()
                    .min(3,'El nombre es muy corto.')
                    .max(20,'El nombre es muy largo.')
                   .required('El nombre del Cliente es Obligatorio'),
        empresa: Yup.string()

                    .required('La empresa es obligatoria.'),
        email: Yup.string()
                    .email('No corresponde a un formato de email')
                    .required('El email es obligatorio'),
        telefono: Yup.number()
                    .required('El telefono es obligatorio')
                    .positive('Número no valido')
                    .integer('Número no valido')
                    .typeError('El número no es valido'),
        notas: Yup.string() 
    })
    const handleSubmit = async (values) => {
        // return console.log(cliente);
        try {
            let resp;
            if (datoCliente.id){
                // 'editando...'
                const options={
                    method: 'PUT',
                    body: JSON.stringify(values),
                    headers:{
                        'Content-Type':'application/json'
                    }
                }
                const url = `http://localhost:4000/clientes/${datoCliente.id}`;
                resp= await fetch(url,options)


            } else {
                const options={
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers:{
                        'Content-Type':'application/json'
                    }
                }
                const url = 'http://localhost:4000/clientes';
                resp = await fetch(url, options);
            }
            const result = await resp.json();
            console.log(result);
            navigate('/clientes')

        } catch (error) {
            console.log(error);
        }

    }

    return (
    cargando?<Spinner/>: (
    <div className='bg-white mt-10 px-5 py-10 rounded shadow-md md:w-3/4 mx-auto'>
        <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{cliente?.nombre? 'Editar Cliente':'Agregar Cliente'}</h1>
        <Formik
            initialValues={cliente}
            enableReinitialize={true}
            onSubmit={ async (values,{resetForm})=>{
                await handleSubmit(values);
                resetForm();
                navigate('/clientes')
            }}
            validationSchema={nuevoClienteSchema}
        >
            {({errors,touched})=>{
            //  console.log(data);
            return (

            <Form className='mt-10'>
                <div className='mb-4 '>
                    <label className='text-gray-800' htmlFor="nombre">Nombre:</label>
                    <Field
                        id="nombre"
                        type='text'
                        name='nombre'
                        placeholder="Nombre del Cliente"
                        className='mt-2 p-3 block w-full bg-gray-50'

                    />
                    {errors.nombre && touched.nombre?(<Error>{errors.nombre}</Error>):null }
                </div>
                <div className='mb-4 '>
                    <label className='text-gray-800' htmlFor="empresa">Empresa:</label>
                    <Field
                        id="empresa"
                        type='text'
                        name="empresa"
                        placeholder="Empresa del cliente"
                        className='mt-2 p-3 block w-full bg-gray-50'
                    />
                    {errors.empresa && touched.empresa?(<Error>{errors.empresa}</Error>):null }
                </div>
                <div className='mb-4 '>
                    <label className='text-gray-800' htmlFor="email">E-mail:</label>
                    <Field
                        id="email"
                        type='email'
                        name="email"
                        placeholder="E-mail del cliente"
                        className='mt-2 p-3 block w-full bg-gray-50'
                        />
                        {errors.email && touched.email?(<Error>{errors.email}</Error>):null}
                </div>
                <div className='mb-4 '>
                    <label className='text-gray-800' htmlFor="telefono">Teléfono:</label>
                    <Field
                        id="telefono"
                        type='tel'
                        name="telefono"
                        placeholder="Teléfono del cliente"
                        className='mt-2 block w-full p-3 bg-gray-50'
                    />
                    {errors.telefono && touched.telefono?(<Error>{errors.telefono}</Error>):null}
                </div>
                <div className='mb-4 '>
                    <label className='text-gray-800' htmlFor="notas">Notas:</label>
                    <Field
                        as = 'textarea'
                        id="notas"
                        type='text'
                        name="notas"
                        placeholder="Notas del cliente"
                        className='mt-2 block w-full bg-gray-50 h-40'
                    />
                </div>
                <input type="submit" value={cliente?.nombre? 'Editar Cliente':'Agregar Cliente'} className=' cursor-pointer mt-5 w-full bg-blue-800 p-3 hover:bg-blue-900 text-white uppercase font-bold text-lg' />
            </Form>
            )}}
        </Formik>

    </div>
    )
  )
}

Formulario.defaultProps ={
    datoCliente:{},
    cargando: false
}
