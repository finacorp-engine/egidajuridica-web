import { site as fallbackSite } from '../../../config/sites'
import type { CmsPage, CmsSeo, CmsSiteSettings } from '../types'

export type SeoProps = {
  title: string
  description: string
  keywords: string
  canonical: string
  type: string
  robots: string
  structuredData?: Record<string, unknown>
}

export const buildStructuredData = (
  seo: CmsSeo,
  site: CmsSiteSettings,
): Record<string, unknown> => ({
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: seo.title,
  url: seo.canonical || site.website,
  description: seo.description,
  isPartOf: {
    '@type': 'WebSite',
    name: site.name,
    url: site.website,
  },
})

export const mapSeo = (seo?: CmsSeo | null, siteSettings?: CmsSiteSettings | null): SeoProps => {
  const site = siteSettings || fallbackSite

  const mapped: SeoProps = {
    title: seo?.title || site.name || fallbackSite.name,
    description: seo?.description || site.description || fallbackSite.description,
    keywords: seo?.keywords || site.defaultKeywords || fallbackSite.defaultKeywords,
    canonical: seo?.canonical || site.website || fallbackSite.website,
    type: seo?.type || 'website',
    robots: seo?.robots || 'index, follow',
    structuredData: seo
      ? buildStructuredData(
          {
            title: seo.title,
            description: seo.description,
          },
          site,
        )
      : undefined,
  }

  return mapped
}

export const mapPageSeo = (page?: CmsPage | null, siteSettings?: CmsSiteSettings | null) =>
  mapSeo(page?.seo, siteSettings)
