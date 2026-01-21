import { FaStar } from "react-icons/fa";

export default function Reviews() {
  return (
    <section id="clients" className="best-trip">
      <h1 className="title">Explore nos engagements</h1>
      <p className="small desc">
        Nous nous engageons à utiliser des produits de qualité
      </p>

      <div className="box-list">
        <div className="box">
          <img
            src="/image/22.png"
            alt="Avis client Virginie"
          />
          <div className="description">
            <h2>
              Berentha a fait un super gâteau pour l&apos;anniversaire de mon fils
            </h2>
            <p className="rating">
              <FaStar /> 4.9
            </p>
            <div className="button-description">
              <span>
                de <strong>Virginie</strong>
              </span>
              <button type="button">Regardez ici</button>
            </div>
          </div>
        </div>

        <div className="box">
          <img
            src="/image/23.png"
            alt="Avis client Elodie"
          />
          <div className="description">
            <h2>
              J&apos;ai adoré le gâteau aux framboises et au chocolat blanc
            </h2>
            <p className="rating">
              <FaStar /> 4.8
            </p>
            <div className="button-description">
              <span>
                de <strong>Elodie</strong>
              </span>
              <button type="button">Regardez ici</button>
            </div>
          </div>
        </div>

        <div className="box">
          <img
            src="/image/24.png"
            alt="Avis client Narasihma Reddy"
          />
          <div className="description">
            <h2>
              Un gâteau de haute qualité et hyper beau ! Bravo Berentha
            </h2>
            <p className="rating">
              <FaStar /> 5.0
            </p>
            <div className="button-description">
              <span>
                de <strong>Narasihma Reddy</strong>
              </span>
              <button type="button">Regardez ici</button>
            </div>
          </div>
        </div>
      </div>

      <div className="view-all">
        <button className="btn" type="button">
          View All
        </button>
      </div>
    </section>
  );
}
