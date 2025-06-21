import { useEffect, useState } from "react";
import {
  getCategoriaById
} from "../../service/ApiService";
import { useParams } from "react-router-dom";

function CategoriaPage() {
  const { id } = useParams();
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const fetchCategoriaById = async () => {
      try {
        const data = await getCategoriaById(id);
        setCategorias(data);
        console.log(data);
      
      } catch (error) {
        console.error("Error al cargar las categorías", error);
      }
    };
    fetchCategoriaById();
  }, [id]);
  if (!categorias) return <p>No se encontró la categoria.</p>;

  return (
    <section>
      <h1>{categorias.tituloCategoria} </h1>

      <div>
        {categorias.mensajesReverberados?.length > 0 ? (
          categorias.mensajesReverberados.map((reverb) => (
            <div className="reverb-card" key={reverb.id}>
              <p> {reverb.asunto} </p>
              <p> {categorias.tituloCategoria} </p>
            </div>
          ))
        ) : (
          <p>No hay reverberaciones todavía.</p>
        )}
      </div>
    </section>
  );
}

export default CategoriaPage;
