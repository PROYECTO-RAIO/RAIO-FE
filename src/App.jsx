import { Route, Routes } from "react-router-dom";
import ReverbPage from "./pages/ReverbPage/ReverbPage"
import DiarioPage from "./pages/DiarioPage/DiarioPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DiarioPage />} />
        <Route path="/mensaje-original/:id" element={<ReverbPage />} />
        
      </Routes>
    </>
  );
}

export default App;
