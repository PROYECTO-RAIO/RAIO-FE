import './CardMensaje.css'
import { useState, useEffect } from 'react';
import { getMensajeOriginalById } from '../../service/ApiService'; 
import Button from "../Button/Button"

function CardMensaje() {
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    const fetchMensaje = async () => {
      try {
        const data = await getMensajeOriginalById(3); 
        setMensaje(data);
      } catch (error) {
        console.error("Error al cargar el mensaje original", error);
      }
    };

    fetchMensaje();
  }, []);

  return (
    <div className='card-container'>
      <p className='text'>
        {mensaje ? mensaje.cuerpoMensajeOriginal : "Cargando mensaje..."}
      </p>
      <Button
          type="button"
          className="custom-button"
          text="Desplegar"
          to="/"
        />
    </div>
  );
}

export default CardMensaje;
