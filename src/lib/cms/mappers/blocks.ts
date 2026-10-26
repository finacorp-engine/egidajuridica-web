import type {
  CmsBlock,
  CmsService,
  CmsSiteSettings,
  CmsTeamMember,
  CmsTestimonial,
  CmsMedia,
  ExpertiseBullet,
  FormFieldLabels,
  FounderHighlight,
  HeroButton,
  ServiceSlide,
  SpecialtyFeature,
  StoryItem,
  TeamMemberItem,
  TestimonialItem,
} from '../types'
import { resolveHref } from './links'
import { lexicalToHtml, lexicalToPlainText } from './lexical'
import { resolveImageWithAlt, resolveMediaUrl } from './media'

const asArray = <T,>(value: unknown): T[] => {
  if (!Array.isArray(value)) return []
  return value as T[]
}

export const mapHeroButtons = (buttons: unknown): HeroButton[] => {
  return asArray<{ text?: string; href?: string; page?: unknown }>(buttons)
    .filter((button) => button.text)
    .map((button) => ({
      text: button.text!,
      href: resolveHref({ text: button.text, href: button.href, page: button.page as never }),
    }))
}

export const mapServicesToSlides = (services: unknown): ServiceSlide[] => {
  return asArray<CmsService>(services).map((service, index) => ({
    id: String(index + 1).padStart(2, '0'),
    subtitle: service.subtitle || '',
    title: service.title || '',
    description: service.description || '',
    buttonText: service.cta?.text || 'VER SERVICIO',
    buttonHref: resolveHref(service.cta),
    image: resolveMediaUrl(service.image, 'hero'),
  }))
}

export const mapTeamMembers = (members: unknown): TeamMemberItem[] => {
  return asArray<CmsTeamMember>(members).map((member, index) => ({
    id: member.name || String(index),
    name: member.name || '',
    role: member.role || '',
    image: resolveMediaUrl(member.photo, 'card'),
  }))
}

export const mapTestimonialsToStories = (testimonials: unknown): StoryItem[] => {
  return asArray<CmsTestimonial>(testimonials).map((item) => ({
    rating: item.rating || 5,
    text: item.quote ? `"${item.quote}"` : '',
    author: item.author || '',
  }))
}

export const mapTestimonialsList = (testimonials: unknown): TestimonialItem[] => {
  return asArray<CmsTestimonial>(testimonials).map((item) => ({
    quote: item.quote ? `"${item.quote}"` : '',
    author: item.author || '',
  }))
}

export const mapServicesToFeatures = (services: unknown): SpecialtyFeature[] => {
  return asArray<CmsService>(services).map((service) => ({
    title: service.title || '',
    description: service.shortDescription || service.description || '',
    linkText: service.cta?.text || 'Contactar',
    linkHref: resolveHref(service.cta),
  }))
}

export const mapExpertiseBullets = (bullets: unknown): ExpertiseBullet[] => {
  return asArray<{ label?: string; text?: string }>(bullets).map((bullet) => ({
    label: bullet.label || '',
    text: bullet.text || '',
  }))
}

export const mapFormFieldLabels = (fieldLabels: unknown): FormFieldLabels => {
  if (!fieldLabels || typeof fieldLabels !== 'object') return {}
  const labels = fieldLabels as Record<string, string | undefined>
  return {
    firstName: labels.firstName,
    lastName: labels.lastName,
    email: labels.email,
    phone: labels.phone,
    comments: labels.comments,
  }
}

export const mapFounderHighlights = (highlights: unknown): FounderHighlight[] => {
  return asArray<{ value?: string; label?: string }>(highlights)
    .filter((item) => item.value)
    .map((item) => ({
      value: item.value!,
      label: item.label || '',
    }))
}

// Historia en un textarea: los párrafos se separan con una línea en blanco
export const splitParagraphs = (text: unknown): string[] => {
  if (typeof text !== 'string') return []
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
}

// Mismos valores por defecto que el bloque "founder" del CMS. Se usa en inicio
// mientras la página todavía no tenga ese bloque agregado desde el panel.
export const defaultFounderBlock: CmsBlock = {
  blockType: 'founder',
  backgroundText: 'Fundador',
  subtitle: 'Nuestro fundador',
  photoLabel: 'Fundador',
  story:
    'Rafael Martín Aguirre Gonzalo fundó Égida Jurídica con una convicción clara: la defensa legal debe ser cercana, transparente y estratégica. Con más de dos décadas de ejercicio profesional en derecho laboral y empresarial, decidió construir una firma donde cada cliente sea escuchado y cada caso se trabaje con rigor.\n\nHoy lidera un equipo de abogados especialistas que comparte esa misma visión: proteger los intereses de personas y empresas con soluciones jurídicas sólidas, explicadas sin tecnicismos y pensadas para cada situación.',
  quote: 'Defender a un cliente es asumir su causa como propia.',
  highlights: [
    { value: '+20', label: 'años de trayectoria' },
    { value: 'Laboral', label: 'y empresarial' },
  ],
  cta: { text: 'Conoce la firma', href: '/acerca' },
}

export const mapFounderBlock = (block: CmsBlock, fallbackMember?: CmsTeamMember | null) => {
  const member =
    block.member && typeof block.member === 'object'
      ? (block.member as CmsTeamMember)
      : fallbackMember
  const name = (block.nameOverride as string) || member?.name || ''
  const photo = (block.photoOverride as CmsMedia | string | null) || member?.photo
  const cta = block.cta as { text?: string } | undefined

  return {
    name,
    role: (block.roleOverride as string) || member?.role || '',
    imageSrc: resolveMediaUrl(photo, 'card'),
    imageAlt: `Fotografía de ${name}`,
    backgroundText: block.backgroundText as string,
    subtitle: block.subtitle as string,
    photoLabel: block.photoLabel as string,
    paragraphs: splitParagraphs(block.story),
    quote: block.quote as string,
    highlights: mapFounderHighlights(block.highlights),
    cta: cta?.text ? { text: cta.text, href: resolveHref(cta as never) } : undefined,
  }
}

export const getBlockProps = (
  block: CmsBlock,
  site: CmsSiteSettings,
  founderFallback?: CmsTeamMember | null,
) => {
  switch (block.blockType) {
    case 'heroHome': {
      const image = resolveImageWithAlt(block.imageWithAlt as never, 'hero')
      return {
        title: block.title as string,
        subtitle: block.subtitle as string,
        imageSrc: image.src,
        imageAlt: image.alt,
        primaryCta: block.primaryCta
          ? {
              text: (block.primaryCta as { text: string }).text,
              href: resolveHref(block.primaryCta as never),
            }
          : undefined,
        secondaryCta: block.secondaryCta
          ? {
              text: (block.secondaryCta as { text: string }).text,
              href: resolveHref(block.secondaryCta as never),
            }
          : undefined,
        showScrollIndicator: block.showScrollIndicator !== false,
      }
    }
    case 'hero': {
      const image = resolveImageWithAlt(block.imageWithAlt as never, 'hero')
      return {
        title: block.title as string,
        description: block.description as string,
        imageSrc: image.src,
        imageAlt: image.alt,
        buttons: mapHeroButtons(block.buttons),
        className: block.className as string,
      }
    }
    case 'about': {
      const image = resolveImageWithAlt(block.imageWithAlt as never, 'card')
      const titleHtml = lexicalToHtml(block.title as never)
      const titleText = lexicalToPlainText(block.title as never)
      return {
        backgroundText: block.backgroundText as string,
        subtitle: block.subtitle as string,
        title: titleHtml || titleText,
        description: block.description as string,
        linkText: block.linkText as string,
        linkHref: (block.linkHref as string) || '#',
        imageSrc: image.src,
        imageAlt: image.alt,
        reverseLayout: Boolean(block.reverseLayout),
      }
    }
    case 'phrase':
      return {
        backgroundText: block.backgroundText as string,
        description: block.description as string,
      }
    case 'specialties': {
      const image = resolveImageWithAlt(block.imageWithAlt as never, 'card')
      return {
        title: block.title as string,
        imageSrc: image.src,
        imageAlt: image.alt,
        features: mapServicesToFeatures(block.services),
      }
    }
    case 'expertise': {
      const image = resolveImageWithAlt(block.imageWithAlt as never, 'card')
      return {
        title: block.title as string,
        description: block.description as string,
        bullets: mapExpertiseBullets(block.bullets),
        imageSrc: image.src,
        imageAlt: image.alt,
        cta: block.cta
          ? {
              text: (block.cta as { text: string }).text,
              href: resolveHref(block.cta as never),
            }
          : undefined,
      }
    }
    case 'servicesCarousel':
      return {
        slides: mapServicesToSlides(block.services),
        introTitle: block.introTitle as string,
      }
    case 'founder':
      return mapFounderBlock(block, founderFallback)
    case 'teamCarousel':
      return {
        members: mapTeamMembers(block.members),
        introTitle: block.introTitle as string,
        introText: block.introText as string,
      }
    case 'successStoriesCarousel':
      return {
        stories: mapTestimonialsToStories(block.testimonials),
        title: block.title as string,
      }
    case 'testimonialsList':
      return {
        testimonialsData: mapTestimonialsList(block.testimonials),
      }
    case 'instagram':
      return {
        title: (block.title as string) || `Síguenos en @egidajuridica`,
        instagramUrl: site.instagram,
      }
    case 'contactForm':
      return {
        phone: site.phone,
        email: site.email,
        heading: block.heading as string,
        description: block.description as string,
        submitLabel: block.submitLabel as string,
        fieldLabels: mapFormFieldLabels(block.fieldLabels),
      }
    case 'mapSection':
      return {
        title: block.title as string,
        embedUrl: (block.embedUrl as string) || site.googleMapsEmbedUrl,
      }
    case 'legalContent':
      return {
        heading: block.heading as string,
        lastUpdated: block.lastUpdated as string,
        intro: block.intro as string,
        bodyHtml: lexicalToHtml(block.body as never),
      }
    default:
      return null
  }
}
