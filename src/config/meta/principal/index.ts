import { site } from "../../sites";

export const principalMeta = {
  title: `${site.name} — Firma legal especializada en derecho laboral, empresarial y civil`,
  description: `${site.name} es una firma legal con ${site.yearsOfExperience} de experiencia, especializada en derecho laboral, empresarial y civil. Asesoramiento riguroso, estrategia legal clara y soluciones adaptadas a cada caso.`,
  keywords: site.defaultKeywords,
  canonical: site.website,
  type: "website",
  robots: "index, follow",

  structuredData: {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: site.name,
    url: site.website,
    description: site.description,
    image: `${site.website}/og-image.png`,
    inLanguage: site.language,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressCountry: site.country,
    },
    sameAs: [site.facebook, site.linkedin, site.instagram, site.tiktok, site.youtube],
    areaServed: {
      "@type": "Country",
      name: "Perú",
    },
    priceRange: site.priceRange,
    openingHours: site.openingHours,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios jurídicos",
      itemListElement: site.specialties.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
        },
      })),
    },
  },
};
