import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMensajeOriginalById } from "../../service/apiService";
import renderAdjunto from "../../service/RenderAdjunto";
import "../ReverbCard/ReverbCard.css";

function ReverbCard() {
  const { id } = useParams();
  const [mensajeOriginal, setMensajeOriginal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReverberacionesMensaje = async () => {
      try {
        const data = await getMensajeOriginalById(id);
        setMensajeOriginal(data);
        console.log(data);
      } catch (error) {
        console.error("Error al cargar el mensaje original:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReverberacionesMensaje();
  }, [id]);
  if (loading) return <p>Cargando mensaje...</p>;
  if (!mensajeOriginal) return <p>No se encontró el mensaje.</p>;

  return (
    <section>
      <h1 className="reverb-page-title">
        {mensajeOriginal.asuntoMensajeOriginal}{" "}
      </h1>
      <div className="reverb-card-container">
        {mensajeOriginal.mensajesReverberados?.length > 0 ? (
          mensajeOriginal.mensajesReverberados.map((reverb) => (
            <div className="reverb-card" key={reverb.id}>
              <p> {reverb.asunto} </p>
              <p> {reverb.autor} </p>
              <p className="reverb-card-body">{reverb.cuerpo}</p>
              <div className="reverb-card-attachment">
                {renderAdjunto(reverb.adjunto)}
              </div>
              <Link to={"/categorias"}>
                <p> {reverb.categoria} </p>
              </Link>
            </div>
          ))
        ) : (
          <p>No hay reverberaciones todavía.</p>
        )}
      </div>
    </section>
  );
}

export default ReverbCard;
