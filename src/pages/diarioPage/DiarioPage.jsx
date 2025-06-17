import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import CardMensaje from "../../components/cardMensaje/CardMensaje";
import { getMensajeOriginalById } from '../../service/ApiService'; // Import the specific ID fetcher
import './DiarioPage.css';

function DiarioPage() {
    const [messageToDisplay, setMessageToDisplay] = useState(null); 
    const [loading, setLoading] = useState(true); 

   
    useEffect(() => {
        const fetchSingleMessage = async () => {
            try {
                
                const data = await getMensajeOriginalById(3); 
                setMessageToDisplay(data);
            } catch (error) {
                console.error("Error al cargar el mensaje original:", error);
            } finally {
                setLoading(false); 
            }
        };

        fetchSingleMessage();
    }, []); 

    return (
        <>
            <div className="title-container">
                <h1 className="title">DIARIO</h1>
            </div>

            {loading ? (
                <p>Cargando mensaje...</p> 
            ) : messageToDisplay ? (
                <CardMensaje mensajeOriginal={messageToDisplay} /> 
            ) : (
                <p>No se encontró el mensaje.</p> 
            )}
        </>
    );
}

export default DiarioPage;