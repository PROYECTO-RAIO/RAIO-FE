import React from 'react';
import './CardMensaje.css';

function CardMensaje({ mensajeOriginal }) {
  if (!mensajeOriginal) {
    return null;
  }

  return (
    <div className='card-container'>
      <p className='text'>
        {mensajeOriginal.cuerpoMensajeOriginal}
      </p>
    </div>
  );
}

export default CardMensaje;