import { useEffect, useState } from "react";
import { getCategoriaById } from "../../service/ApiService";
import renderAdjunto from "../../utils/RenderAdjunto";
import { useParams } from "react-router-dom";

function CategoriaReverbCard() {
  const { id } = useParams();
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoriaById = async () => {
      try {
        const data = await getCategoriaById(id);
        setCategorias(data);
        console.log(data);
      } catch (error) {
        console.error("Error al cargar las categorías", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoriaById();
  }, [id]);
  if (!categorias) return <p>No se encontró la categoria.</p>;
  if (loading) return <p>Cargando reverberaciones...</p>;

  return (
    <section>
      <h1 className="reverb-page-title">{categorias.tituloCategoria} </h1>

      <div className="reverb-card-container">
        {categorias.mensajesReverberados?.length > 0 ? (
          categorias.mensajesReverberados.map((reverb) => (
            <div className="reverb-card" key={reverb.id}>
              <p> Autor: {reverb.autor} </p>
              <p> Asunto: {reverb.asunto} </p>
              <p> {reverb.cuerpo} </p>
              <p> {renderAdjunto(reverb.adjunto)} </p>
            </div>
          ))
        ) : (
          <p>No hay reverberaciones todavía.</p>
        )}
      </div>
    </section>
  );
}

export default CategoriaReverbCard;
