import { useState } from 'react'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import { Layout } from './layout/Layout'
import { Editar } from './paginas/cliente/Editar'
import { Nuevo } from './paginas/cliente/Nuevo'
import { VerDetalle } from './paginas/cliente/VerDetalle'
import { Inicio } from './paginas/Inicio'

function App() {
  const [count, setCount] = useState(0)

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/clientes' element={<Layout/>}>
            <Route index element={<Inicio/>}/>
            <Route path='nuevo' element={<Nuevo/>}/>
            <Route path='editar/:idClient' element={<Editar/>}/>
            <Route path=':idClient' element={<VerDetalle/>}/>
        </Route>
      </Routes>   
    </BrowserRouter>
  )
}

export default App
