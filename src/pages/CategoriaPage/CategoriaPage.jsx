import CategoriaReverbCard from "../../components/ReverbCard/CategoriaReverbCard";
import filterIcon from "../../assets/lupa.png";
import { Link } from "react-router-dom";
import "./CategoriaPage.css";


function CategoriaPage() {
  return (
    <section>
      <div className="categoria-page-header">
        <Link to={"/"} className="homepage-link">
          DIARIO
        </Link>
        <img
          src={filterIcon}
          alt="Filtrar categorías"
          className="filter-icon"
        />
      </div>
      <div className="categoria-page-section">
        <CategoriaReverbCard />
      </div>
    </section>
  );
}

export default CategoriaPage;
