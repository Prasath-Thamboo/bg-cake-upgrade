export const site = {
  brand: "BG-Cake",
  tagline: "Gâteaux artisanaux premium",
  instagram: "https://www.instagram.com/bg_cakeandpapeterie/",
  mailto: "mailto:prasath1@hotmail.fr",

  nav: [
    { label: "Accueil", href: "#accueil" },
    { label: "Créations", href: "#creations" },
    { label: "Composer", href: "#composer" },
    { label: "Formules", href: "#formules" },
    { label: "Avis", href: "#avis" },
    { label: "Contact", href: "#contact" },
  ],

  hero: {
    title:
      "Des gâteaux élégants, pensés pour vos moments les plus importants.",
    text:
      "Pour un gâteau d'anniversaire qui fera sensation, faites confiance à BG-Cake. Créativité, précision et goût : chaque création est réalisée sur-mesure, avec un souci du détail qui transforme votre événement en souvenir inoubliable.",
    ctaPrimary: "Réserver",
    ctaSecondary: "Voir les créations",
    highlights: [
      { top: "4.9/5", bottom: "Avis clients" },
      { top: "48h", bottom: "Réponse rapide" },
      { top: "Sur-mesure", bottom: "Goûts & design" },
    ],
  },

  creations: {
    badge: "Créations signature",
    title: "Explorez nos gâteaux",
    desc:
      "Des saveurs équilibrées, des finitions soignées, et une esthétique premium pour sublimer vos événements.",
    items: [
      {
        img: "/image/passion.jpg",
        title: "Coco & fruit de la passion",
        desc: "Crème de coco • coulis passion • finition signature",
        tag: "Fruité",
      },
      {
        img: "/image/fram.jpg",
        title: "Framboise & chocolat blanc",
        desc: "Chocolat blanc • framboise • texture aérienne",
        tag: "Gourmand",
      },
      {
        img: "/image/vanille.jpg",
        title: "Vanille & pécan",
        desc: "Vanille • noix de pécan • équilibre délicat",
        tag: "Signature",
      },
      {
        img: "/image/chocolat.jpg",
        title: "Tout chocolat",
        desc: "Ganache • crème chocolat • intensité",
        tag: "Intense",
      },
    ],
  },

  pricing: {
    badge: "Formules",
    title: "Prix & formules",
    desc:
      "Des options claires, premium, et adaptables selon le nombre de parts, les goûts, et le design souhaité.",
    plans: [
      {
        name: "Essentiel",
        price: "à partir de 49€",
        note: "Idéal pour un anniversaire simple, élégant et délicieux.",
        features: [
          "Saveur au choix (signature)",
          "Décor premium minimal",
          "Conseil taille & parts",
          "Commande 5 jours à l’avance",
        ],
      },
      {
        name: "Signature",
        price: "à partir de 79€",
        note: "Le meilleur équilibre design + gourmandise.",
        featured: true,
        features: [
          "Saveur signature + options",
          "Décor premium personnalisé",
          "Palette couleur (événement)",
          "Support & conseils design",
          "Commande 7 jours à l’avance",
        ],
      },
      {
        name: "Prestige",
        price: "sur devis",
        note: "Mariages, événements, design avancé et finitions exceptionnelles.",
        features: [
          "Design sur-mesure avancé",
          "Dégustation (option)",
          "Éléments décor (selon thème)",
          "Accompagnement complet",
          "Planning événementiel",
        ],
      },
    ],
    disclaimer:
      "Les prix varient selon le nombre de parts, la complexité du décor et les options. Un devis précis est proposé rapidement.",
  },

  reviews: {
    badge: "Avis",
    title: "Ils nous font confiance",
    desc:
      "Notre priorité : un résultat beau, bon, et fidèle à votre événement.",
    items: [
      {
        img: "/image/22.png",
        text: "Berentha a fait un super gâteau pour l'anniversaire de mon fils.",
        rating: 4.9,
        author: "Virginie",
      },
      {
        img: "/image/23.png",
        text: "J'ai adoré le gâteau framboise et chocolat blanc. Magnifique !",
        rating: 4.8,
        author: "Elodie",
      },
      {
        img: "/image/24.png",
        text: "Un gâteau de haute qualité et hyper beau ! Bravo Berentha.",
        rating: 5.0,
        author: "Narasihma Reddy",
      },
    ],
  },

  contact: {
    badge: "Contact",
    title: "Parlons de votre gâteau",
    desc:
      "Dites-nous la date, le nombre de parts, les goûts et le style souhaité. Réponse rapide avec une proposition adaptée.",
    bullets: [
      "Réponse sous 24–48h",
      "Conseil taille & parts",
      "Design sur-mesure (option)",
    ],
    buttonPrimary: "Demander un devis par mail",
    buttonSecondary: "Voir Instagram",
  },

  footer: {
    rights: "All rights reserved",
    copyright: "© 2025 BG-Cake",
    termsLabel: "Règles d'utilisation",
    termsHref: "#",
  },
};
