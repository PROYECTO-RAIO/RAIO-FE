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
  <>
    <div key={mensaje.id} className="card-container">
      <p className="timestamp"> {mensaje.timestamp} </p>
      <p className="text" > ASUNTO: {mensaje.asuntoMensajeOriginal} </p>
      <p className="text" > DE: {mensaje.autorMensajeOriginal} </p>
      <p className="text-body">{mensaje.cuerpoMensajeOriginal}</p>
      
      


      <Button
        text={abierto === mensaje.id ? "Ocultar" : "Reverb"}
        onClick={() => toggleAcordeon(mensaje.id)}
        className="custom-button"
        count={mensaje.mensajesReverberados.length}
      />
    </div>

    {abierto === mensaje.id && (
      <div className="acordeon-content">
        <ReverbCard id={mensaje.id} />
      </div>
    )}
  </>
  ))}
    </div>
  );
}

export default CardMensaje; 