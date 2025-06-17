import { Route, Routes } from 'react-router-dom'
import ReverbPage from './pages/ReverbPage'
import DiarioPage from './pages/diarioPage/DiarioPage'

function App() {

  return (
    <>
     <Routes>

      <Route path='/reverberacions' element={<ReverbPage/>} />  
      <Route path='/diari' element={<DiarioPage/>} /> 

     </Routes>
    </>
  )
}

export default App;
