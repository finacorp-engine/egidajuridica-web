// ═══════════════════════════════════════════════════════
// EGIDA JURÍDICA — Configuración central del sitio
// ═══════════════════════════════════════════════════════

export const site = {
  // ── Identidad ──────────────────────────────────────────
  name: "Egida Jurídica",
  legalName: "Egida Jurídica",
  tagline: "Rigor jurídico, no ruido",
  description:
    "Firma legal especializada en derecho laboral, empresarial y civil. Más de 20 años de ejercicio profesional.",

  // ── Localización ───────────────────────────────────────
  locale: "es-PE",
  country: "PE",
  language: "es",
  timezone: "America/Lima",

  // ── Web ────────────────────────────────────────────────
  website: "https://egidajuridica.com",

  // ── Contacto ───────────────────────────────────────────
  email: "egidajuridica.developers@gmail.com",
  phone: "+51 964 943 865",
  address: "Torre Galena 234, Piso 10",

  // ── Redes sociales ─────────────────────────────────────
  whatsapp: "https://wa.me/51964943865",
  facebook: "https://www.facebook.com/profile.php?id=61577522193729",
  linkedin: "https://www.linkedin.com/company/egidajuridica",
  instagram: "https://www.instagram.com/egidajuridica",
  tiktok: "https://www.tiktok.com/@egida_juridica",
  youtube: "https://www.youtube.com/@egidajuridica",
  linktree: "https://linktr.ee/egidajuridica",

  // ── Reseñas y mapas ────────────────────────────────────
  googleReviews: "https://g.page/r/11397078401421640905/review",
  googleMaps:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.605820164797!2d-75.21800062385626!3d-12.070619642347499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910e964521648ed5%3A0xf32d0a3ca41a6238!2sEdificio%20Galena%20234!5e0!3m2!1ses!2spe!4v1772672651755!5m2!1ses!2spe",

  // ── SEO — Palabras clave ───────────────────────────────
  defaultKeywords:
    "abogados Perú, firma legal, derecho laboral, derecho empresarial, derecho civil, asesoramiento jurídico, abogados laboralistas, despidos, contratos laborales, reclamaciones laborales, conflictos mercantiles, responsabilidad civil, asesoría legal empresas, abogados especialistas, Egida Jurídica",
  comparisonKeywords:
    "mejor firma legal Perú, abogados especializados derecho laboral, despacho de abogados confiable, asesoría jurídica estratégica, abogados con experiencia, firma legal seria, abogados rigor jurídico",

  // ── Trayectoria ────────────────────────────────────────
  foundingYear: 2005,
  yearsOfExperience: "más de 20 años",

  // ── Horario de atención ────────────────────────────────
  openingHours: "Mo-Fr 09:00-18:00",
  openingHoursDisplay: "Lunes a Viernes, 9:00 – 18:00",

  // ── Especialidades ─────────────────────────────────────
  specialties: [
    {
      key: "laboral",
      name: "Derecho Laboral",
      shortDescription:
        "Conflictos laborales, despidos, contratos, reclamaciones y defensa de derechos laborales.",
    },
    {
      key: "empresarial",
      name: "Derecho Empresarial",
      shortDescription:
        "Asesoramiento jurídico para empresas y profesionales, gestión de riesgos legales y conflictos mercantiles.",
    },
    {
      key: "civil",
      name: "Derecho Civil",
      shortDescription:
        "Contratos, reclamaciones, responsabilidad civil y cuestiones patrimoniales y personales.",
    },
  ],

  // ── Valores de marca ───────────────────────────────────
  values: [
    "Rigor jurídico",
    "Estrategia legal",
    "Especialización",
    "Claridad",
    "Responsabilidad",
    "Confianza",
    "Compromiso",
  ],

  // ── Forma de trabajar ──────────────────────────────────
  methodology: [
    "Escuchamos y analizamos cada caso con detalle",
    "Estudiamos la situación jurídica real",
    "Definimos una estrategia legal concreta",
    "Mantenemos comunicación clara con el cliente",
    "Acompañamos durante todo el proceso",
  ],

  // ── Precio / rango (para Schema.org) ──────────────────
  priceRange: "$$",
} as const;
