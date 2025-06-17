import { Route, Routes } from "react-router-dom";
import ReverbPage from "./pages/ReverbPage/ReverbPage";
import ReverbCard from "./components/ReverbCard/ReverbCard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/mensaje-original/:id" element={<ReverbPage />} />
      </Routes>
    </>
  );
}

export default App;
