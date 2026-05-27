import { buildQuery, cmsFetch } from './client'
import type {
  CmsNavigation,
  CmsPage,
  CmsSiteSettings,
  PayloadListResponse,
} from './types'
import { site as fallbackSite } from '../../config/sites'

const defaultNavigation: CmsNavigation = {
  headerNavItems: [],
  footerNavItems: [],
  legalLinks: [],
  showWhatsappButton: true,
  showUpButton: true,
}

export const getPage = async (slug: string): Promise<CmsPage | null> => {
  try {
    const query = buildQuery({
      'where[slug][equals]': slug,
      depth: 2,
      limit: 1,
    })

    const response = await cmsFetch<PayloadListResponse<CmsPage>>(`/api/pages${query}`)
    return response.docs[0] ?? null
  } catch {
    return null
  }
}

export const getSiteSettings = async (): Promise<CmsSiteSettings> => {
  try {
    return await cmsFetch<CmsSiteSettings>('/api/globals/site-settings')
  } catch {
    return fallbackSite
  }
}

export const getNavigation = async (): Promise<CmsNavigation> => {
  try {
    return await cmsFetch<CmsNavigation>('/api/globals/navigation?depth=0')
  } catch {
    return defaultNavigation
  }
}

export const getPageContext = async (slug: string) => {
  const [page, siteSettings, navigation] = await Promise.all([
    getPage(slug),
    getSiteSettings(),
    getNavigation(),
  ])

  return { page, siteSettings, navigation }
}
