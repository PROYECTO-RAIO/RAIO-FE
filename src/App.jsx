import { Route, Routes } from 'react-router-dom'
import ReverbPage from './pages/ReverbPage'

function App() {

  return (
    <>
     <Routes>

      <Route path='/reverberacions' element={<ReverbPage/>} />  


     </Routes>
    </>
  )
}

export default App
