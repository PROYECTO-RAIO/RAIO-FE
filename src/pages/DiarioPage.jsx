import Button from "../components/Button/Button";
import filterIcon from "../assets/lupa.png";

function DiarioPage() {
  return (
    <section className="diario-page-main">
      <div className="diario-page-header">
        <img
          src={filterIcon}
          alt="Filtrar categorías"
          className="filter-icon"
        />
      </div>
      <h1 className="diario-page-title">DIARIO</h1>
      <div>
        <Button type="button" className="custom-button" text="Desplegar"></Button>
      </div>
    </section>
  );
}

export default DiarioPage;
