import { buildQuery, cmsFetch } from './client'
import type {
  CmsNavigation,
  CmsPage,
  CmsSiteSettings,
  CmsTeamMember,
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
  } catch (error) {
    console.error('[CMS] Error al cargar la página:', slug, error)
    throw error
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
    // depth=1 para que cada `page` llegue como objeto con su slug (con depth=0 llega solo el ID y el enlace queda en '#')
    return await cmsFetch<CmsNavigation>('/api/globals/navigation?depth=1&populate[pages][slug]=true')
  } catch {
    return defaultNavigation
  }
}

export const getFounder = async (): Promise<CmsTeamMember | null> => {
  try {
    const query = buildQuery({
      'where[role][like]': 'Fundador',
      depth: 1,
      limit: 1,
    })

    const response = await cmsFetch<PayloadListResponse<CmsTeamMember>>(`/api/team-members${query}`)
    return response.docs[0] ?? null
  } catch {
    return null
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
