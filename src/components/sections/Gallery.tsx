import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Gallery() {
  return (
    <section id="qualite" className="destinations">
      <h1 className="title">Explorez nos gâteaux</h1>

      <div className="desc-button">
        <p className="small desc">
          Voici tous nos gateaux d&apos;une qualité et d&apos;une beauté incomparable
        </p>

        <div className="buttons">
          <button type="button" aria-label="Précédent">
            <FaChevronLeft />
          </button>
          <button type="button" className="second" aria-label="Suivant">
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="gallerie">
        <div className="image">
          <img
            src="/image/passion.jpg"
            alt="Gateau coco fruit de la passion"
            style={{ backgroundColor: "white" }}
          />
          <div className="description">
            <h1>Gateau coco fruit de la passion</h1>
            <p>Crème de noix de coco, coulis de fruit de la passion</p>
          </div>
        </div>

        <div className="image">
          <img
            src="/image/fram.jpg"
            alt="Gateau framboise chocolat blanc"
          />
          <div className="description">
            <h1>Gateau Framboise chocolat blanc</h1>
            <p>Crème de chocolat blanc, coulis de framboise</p>
          </div>
        </div>

        <div className="image">
          <img
            src="/image/vanille.jpg"
            alt="Gateau vanille"
          />
          <div className="description">
            <h1>Gateau Vanille</h1>
            <p>Crème de vanille, noix de pécan</p>
          </div>
        </div>

        <div className="image">
          <img
            src="/image/chocolat.jpg"
            alt="Gateau chocolat"
          />
          <div className="description">
            <h1>Gateau Chocolat</h1>
            <p>Ganache chocolat, crème de chocolat</p>
          </div>
        </div>
      </div>
    </section>
  );
}
