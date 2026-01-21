import Image from "next/image";
import { FaPhone } from "react-icons/fa";

export default function Header() {
  return (
    <header>
      <div className="logo-div">
        <p className="logo">
          <a href="#">
            <Image
              src="/image/logo.png"
              alt="logo"
              width={100}
              height={100}
            />
          </a>
        </p>
      </div>

      <ul>
        <li><a href="#accueil">Accueil</a></li>
        <li><a href="#apropos">A propos</a></li>
        <li><a href="#qualite">Qualité</a></li>
        <li><a href="#clients">Clients</a></li>
      </ul>

      <button className="btn">
        <FaPhone style={{ paddingRight: 5 }} />
        <span>Réserver</span>
      </button>

      <input type="checkbox" id="menumb" />
      <label htmlFor="menumb" className="menu-icon">
        &#9776;
      </label>

      <ul className="menumb">
        <li><a href="#accueil">Accueil</a></li>
        <li><a href="#apropos">A propos</a></li>
        <li><a href="#qualite">Qualité</a></li>
        <li><a href="#clients">Clients</a></li>
        <label htmlFor="menumb">&#10006;</label>
      </ul>
    </header>
  );
}
