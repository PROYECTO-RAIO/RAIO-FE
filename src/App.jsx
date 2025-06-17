import { Route, Routes } from "react-router-dom";
import ReverbPage from "./pages/ReverbPage";
import DiarioPage from "./pages/DiarioPage/DiarioPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DiarioPage />} />
        <Route path="/reverberacions" element={<ReverbPage />} />
      </Routes>
    </>
  );
}

export default App;
