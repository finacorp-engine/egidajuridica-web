export type MediaSize = 'thumbnail' | 'card' | 'hero'

export type CmsMedia = {
  url?: string | null
  alt?: string | null
  sizes?: Partial<
    Record<
      MediaSize,
      {
        url?: string | null
      }
    >
  >
}

export type ImageWithAlt = {
  image?: CmsMedia | string | null
  alt?: string | null
}

export type CmsPageRef = {
  slug?: string | null
}

export type CmsLink = {
  text?: string | null
  href?: string | null
  page?: CmsPageRef | string | null
}

export type LexicalNode = {
  type: string
  tag?: string
  text?: string
  children?: LexicalNode[]
}

export type LexicalContent = {
  root?: {
    children?: LexicalNode[]
  }
}

export type CmsService = {
  title?: string | null
  subtitle?: string | null
  description?: string | null
  shortDescription?: string | null
  image?: CmsMedia | string | null
  cta?: CmsLink | null
}

export type CmsTeamMember = {
  name?: string | null
  role?: string | null
  photo?: CmsMedia | string | null
}

export type CmsTestimonial = {
  quote?: string | null
  author?: string | null
  rating?: number | null
}

export type CmsBlock = {
  blockType: string
  id?: string
  [key: string]: unknown
}

export type CmsSeo = {
  title: string
  description: string
  keywords?: string | null
  canonical?: string | null
  robots?: string | null
  type?: string | null
}

export type CmsPage = {
  id?: string
  title?: string
  slug?: string
  pageType?: string
  layout?: CmsBlock[]
  seo?: CmsSeo
}

export type CmsNavItem = {
  label?: string | null
  page?: CmsPageRef | string | null
  externalUrl?: string | null
}

export type CmsNavigation = {
  headerNavItems?: CmsNavItem[] | null
  footerNavItems?: CmsNavItem[] | null
  legalLinks?: CmsNavItem[] | null
  showWhatsappButton?: boolean | null
  showUpButton?: boolean | null
}

export type CmsSiteSettings = {
  name?: string
  legalName?: string
  tagline?: string
  description?: string
  website?: string
  email?: string
  phone?: string
  address?: string
  whatsapp?: string
  facebook?: string
  linkedin?: string
  instagram?: string
  tiktok?: string
  youtube?: string
  linktree?: string
  googleReviews?: string
  googleMapsEmbedUrl?: string
  openingHours?: string
  openingHoursDisplay?: string
  defaultKeywords?: string
  foundingYear?: number
  yearsOfExperience?: string
  priceRange?: string
  values?: Array<{ value?: string | null }>
  methodology?: Array<{ step?: string | null }>
}

export type PayloadListResponse<T> = {
  docs: T[]
  totalDocs: number
}

export type NavLink = {
  label: string
  href: string
  ariaLabel?: string
}

export type ServiceSlide = {
  id: string
  subtitle: string
  title: string
  description: string
  buttonText: string
  buttonHref: string
  image: string
}

export type FounderHighlight = {
  value: string
  label: string
}

export type TeamMemberItem = {
  id: string
  name: string
  role: string
  image: string
}

export type StoryItem = {
  rating: number
  text: string
  author: string
}

export type TestimonialItem = {
  quote: string
  author: string
}

export type SpecialtyFeature = {
  title: string
  description: string
  linkText: string
  linkHref: string
}

export type HeroButton = {
  text: string
  href: string
}

export type ExpertiseBullet = {
  label: string
  text: string
}

export type FormFieldLabels = {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  comments?: string
}
