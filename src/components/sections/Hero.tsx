import Image from "next/image";
import { FaPlay } from "react-icons/fa";

export default function Hero() {
  return (
    <section id="accueil" className="home-section">
      {/* Background pattern */}
      <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="lightgray"
              strokeWidth="1"
            />
          </pattern>
          <pattern
            id="diagonal-lines"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 0 0 L 10 10"
              fill="none"
              stroke="lightgray"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect width="100%" height="100%" fill="url(#diagonal-lines)" />
      </svg>

      {/* Images */}
      <div className="left">
        <Image
          className="left-image1"
          src="/image/Cake.jpg"
          alt="Gâteau principal"
          width={450}
          height={500}
          priority
        />
        <Image
          className="left-image2"
          src="/image/Cake2.jpg"
          alt="Gâteau secondaire"
          width={350}
          height={350}
        />
      </div>

      {/* Text / CTA */}
      <div className="right">
        <div>
          <h1>Votre super gâteau idéal pour vos événements</h1>

          <p>
            Pour un gâteau d&apos;anniversaire qui fera sensation, faites confiance à
            BG-cake. Avec son talent, sa créativité et son souci du détail,
            Berentha transformera votre événement en un moment inoubliable.
            Contactez Berentha dès aujourd&apos;hui pour discuter de votre prochain
            projet pâtissier et laissez-vous surprendre par des créations qui
            dépassent vos attentes.
          </p>

          <a
            href="https://www.instagram.com/bg_cakeandpapeterie/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="buttons">
              <button className="btn" type="button">
                <span>Réserver ici</span>
              </button>

              <button className="see-video" type="button">
                <div className="video-bg">
                  <div className="play-btn">
                    <FaPlay />
                  </div>
                </div>
                <span>Regarder nos publications sur Instagram</span>
              </button>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
