import { Link } from "react-router-dom";
import filterIcon from "../../assets/lupa.png";
import "./DiarioPage.css";
import CardMensaje from "../../components/cardMensaje/CardMensaje";


function DiarioPage() {
  return (
    <section className="diario-page-main">
      <div className="diario-page-header">
        <Link to="/reverberacions">
          <img
            src={filterIcon}
            alt="Filtrar categorías"
            className="filter-icon"
          />
        </Link>
      </div>
      <h1 className="diario-page-title">DIARIO</h1>
      <CardMensaje/>

    </section>

    

  );
}

export default DiarioPage;
