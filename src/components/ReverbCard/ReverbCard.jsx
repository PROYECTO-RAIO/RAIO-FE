import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMensajeOriginalById, getCategoriaById } from "../../service/ApiService";
import renderAdjunto from "../../utils/RenderAdjunto";
import "../ReverbCard/ReverbCard.css";

function ReverbCard({ id: propId }) {
  const params = useParams();
  const id = propId || params.id;

  const [mensajeOriginal, setMensajeOriginal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categorias, setCategorias] = useState({});

  useEffect(() => {
    const fetchReverberacionesMensaje = async () => {
      if (!id) {
        console.warn("No se proporcionó un ID válido a ReverbCard");
        return;
      }

      try {
        const data = await getMensajeOriginalById(id);
        setMensajeOriginal(data);
      } catch (error) {
        console.error("Error al cargar el mensaje original:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReverberacionesMensaje();
  }, [id]);

    useEffect(() => {
    const fetchCategorias = async () => {
      if (!mensajeOriginal?.mensajesReverberados) return;

      const uniqueCategoriaIds = [
        ...new Set(
          mensajeOriginal.mensajesReverberados
            .map((reverb) => reverb.categoria)
            .filter((id) => id != null && !categorias[id])
        ),
      ];

      await Promise.all(
        uniqueCategoriaIds.map(async (catId) => {
          try {
            const catData = await getCategoriaById(catId);
            setCategorias((prev) => ({ ...prev, [catId]: catData }));
          } catch (e) {
            console.error(`Error al cargar categoría con ID ${catId}`, e);
          }
        })
      );
    };

    fetchCategorias();
  }, [mensajeOriginal, categorias]);

  if (loading) return <p>Cargando mensaje...</p>;
  if (!mensajeOriginal) return <p>No se encontró el mensaje.</p>;

  return (
    <section>
      <div className="reverb-card-container">
        {mensajeOriginal.mensajesReverberados?.length > 0 ? (
          mensajeOriginal.mensajesReverberados.map((reverb) => {
            const categoria = categorias[reverb.categoria];
            return (
              <div className="reverb-card" key={reverb.id}>
                <p>{reverb.asunto}</p>
                <p>{reverb.autor}</p>
                <p className="reverb-card-body">{reverb.cuerpo}</p>
                <div className="reverb-card-attachment">
                  {renderAdjunto(reverb.adjunto)}
                </div>
                
                  {categoria ? (
                  <Link to={`/categorias/${categoria.id}`}>
                    {categoria.tituloCategoria}
                  </Link>
                  ) : (
                    <span>Sin enlace</span>
                  )}
                </div>
            );
          })
        ) : (
          <p>No hay reverberaciones todavía.</p>
        )}
      </div>
    </section>
  );
}

export default ReverbCard;
