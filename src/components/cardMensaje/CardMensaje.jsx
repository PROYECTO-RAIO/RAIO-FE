import './CardMensaje.css';
import { useState, useEffect } from 'react';
import { getAllMensajesOriginales } from '../../service/ApiService'; 
import Button from "../Button/Button";
import ReverbCard from '../ReverbCard/ReverbCard';
import { useNavigate, useLocation } from 'react-router-dom';

function CardMensaje() {
  const [mensajes, setMensajes] = useState([]);
  const [abierto, setAbierto] = useState(null);

  useEffect(() => {
    const fetchMensajes = async () => {
      try {
        const data = await getAllMensajesOriginales();
         if (data) {
           setMensajes(data);
         }
      } catch (error) {
        console.error("Error al cargar los mensajes originales", error);
      }
    };

    fetchMensajes();
  }, []);

  const toggleAcordeon = (id) => {
    setAbierto((prev) => (prev === id ? null : id));
  };

  return (
    <div className="lista-mensajes">
      {mensajes.map((mensaje) => (
        <div key={mensaje.id} className="card-container">
          <p className="text">{mensaje.cuerpoMensajeOriginal}</p>

          <Button
            type="button"
            text={abierto === mensaje.id ? "Ocultar" : "Desplegar"}
            className="acordeon-button"
            to={null}
            onClick={() => toggleAcordeon(mensaje.id)}
          />

          {abierto === mensaje.id && (
            <div className="acordeon-content">
              <ReverbCardWrapper id={mensaje.id} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// function ReverbCardWrapper({ id }) {
//   // Mock useParams para ReverbCard
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Empuja un estado temporal en la URL para que ReverbCard pueda usar useParams
//   useEffect(() => {
//     const oldPath = location.pathname;
//     const fakePath = `/mensaje/${id}`;
//     window.history.pushState({}, '', fakePath);

//     return () => {
//       // Restaurar el path anterior al cerrar el acordeón
//       window.history.pushState({}, '', oldPath);
//     };
//   }, [id]);

//   return <ReverbCard />;
// }

export default CardMensaje;
