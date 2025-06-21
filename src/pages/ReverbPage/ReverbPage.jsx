import { Link } from "react-router-dom";
import "./ReverbPage.css"
import filterIcon from "../../assets/lupa.png";
import ReverbCard from "../../components/ReverbCard/ReverbCard";

function ReverbPage() {
  return (
    <section className="reverb-page-main">
      <div className="reverb-page-header">
        <Link to={"/"} className="homepage-link">
          DIARIO
        </Link>
        <img
          src={filterIcon}
          alt="Filtrar categorías"
          className="filter-icon"
        />
      </div>
      < ReverbCard />
    </section>
  );
}

export default ReverbPage;
