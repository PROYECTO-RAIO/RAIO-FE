import { Route, Routes } from 'react-router-dom'
import ReverbPage from "./pages/ReverbPage/ReverbPage";
import DiarioPage from "./pages/DiarioPage/DiarioPage";
import CategoriaPage from './pages/CategoriaPage/CategoriaPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DiarioPage />} />
        <Route path="/mensaje-original/:id" element={<ReverbPage />} />
        <Route  path="/categorias/:id" element={<CategoriaPage/>} />
      </Routes>
    </>
  );
}

export default App;
