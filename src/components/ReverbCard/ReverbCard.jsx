import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMensajeOriginalById } from "../../service/apiService";

function ReverbCard() {
  const {id} = useParams();
const [mensajeOriginal, setMensajeOriginal] = useState(null);
const [loading, setLoading] = useState(true);
//const [attachment, setAttachment] = useState("");

useEffect(() => {
  const fetchReverberacionesMensaje = async () => {
    try {
      const data = await getMensajeOriginalById(id);
      setMensajeOriginal(data);
      console.log(data)
      //setAttachment(data);
    } catch (error) {
      console.error("Error al cargar el mensaje original:", error);
    } finally {
      setLoading(false);
    }
  };


  fetchReverberacionesMensaje();
}, [id]);
  //aqui solo llamar el cuerpo y el archivo adjunto?
  if (loading) return <p>Cargando mensaje...</p>;
  if (!mensajeOriginal) return <p>No se encontró el mensaje.</p>;

  return (
    <div className="p-4">
      <h2>{mensajeOriginal.asuntoMensajeOriginal}</h2>
      <p>
        <strong>Autor:</strong> {mensajeOriginal.autorMensajeOriginal}
      </p>
      <p>{mensajeOriginal.cuerpoMensajeOriginal}</p>
      {mensajeOriginal.adjuntoMensajeOriginal && (
        <p>
          <a
            href={mensajeOriginal.adjuntoMensajeOriginal}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver adjunto
          </a>
        </p>
      )}

      <hr />

      <h3>Reverberaciones:</h3>
      {mensajeOriginal.mensajesReverberados?.length > 0 ? (
        mensajeOriginal.mensajesReverberados.map((reverb) => (
          <div
            key={reverb.id}
            style={{
              marginBottom: "1em",
              paddingLeft: "1em",
              borderLeft: "2px solid #ccc",
            }}
          >
            <p>
              <strong>{reverb.autor}</strong> dijo:
            </p>
            <p>{reverb.cuerpo}</p>
            {reverb.adjunto && (
              <p>
                <a
                  href={reverb.adjunto}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver adjunto
                </a>
              </p>
            )}
          </div>
        ))
      ) : (
        <p>No hay reverberaciones todavía.</p>
      )}
    </div>
  );
}

export default ReverbCard;
