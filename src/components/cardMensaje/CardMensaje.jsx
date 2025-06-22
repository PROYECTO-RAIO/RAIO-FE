import "./CardMensaje.css";
import { useState, useEffect } from "react";
import { getAllMensajesOriginales } from "../../service/ApiService";
import Button from "../Button/Button";
import ReverbCard from "../ReverbCard/ReverbCard";

function CardMensaje() {
  const [mensajes, setMensajes] = useState([]);
  const [abierto, setAbierto] = useState(null);

  useEffect(() => {
    const fetchMensajes = async () => {
      try {
        const data = await getAllMensajesOriginales();
        console.log("Mensajes recibidos:", data);
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
    console.log("Mensajes para renderizar:", mensajes);
  };

  return (
    <div className="lista-mensajes">
      {mensajes.map((mensaje) => (
        <div key={mensaje.id} className="card-container">
          <p className="text">{mensaje.cuerpoMensajeOriginal}</p>
          <p className="text"> {mensaje.autorMensajeOriginal} </p>
          <p className="text"> {mensaje.asuntoMensajeOriginal} </p>

          <Button
            text={abierto === mensaje.id ? "Ocultar" : "Ver"}
            onClick={() => {
              console.log("Botón clickeado:", mensaje.id);
              toggleAcordeon(mensaje.id);
            }}
            className="custom-button"
          />

          {abierto === mensaje.id && (
            <div className="acordeon-content">
              <ReverbCard id={mensaje.id} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CardMensaje; 