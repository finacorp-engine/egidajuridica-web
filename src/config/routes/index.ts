export const routes = {
  home: "/",
  about: "/acerca",
  contact: "/contacto",
  services: "/servicios",
  testimonials: "/testimonios",
  terms: "/terminos",
  privacy: "/privacidad",
};

export const pathBySlug: Record<string, string> = {
  home: routes.home,
  acerca: routes.about,
  contacto: routes.contact,
  servicios: routes.services,
  testimonios: routes.testimonials,
  terminos: routes.terms,
  privacidad: routes.privacy,
  "404": "/404",
};

export const slugByPath: Record<string, string> = Object.fromEntries(
  Object.entries(pathBySlug).map(([slug, path]) => [path, slug]),
);

export const pathFromSlug = (slug?: string | null): string => {
  if (!slug) return routes.home;
  return pathBySlug[slug] ?? `/${slug}`;
};
