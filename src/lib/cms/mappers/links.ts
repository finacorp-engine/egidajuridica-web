import { pathFromSlug } from '../../../config/routes'
import type { CmsLink, CmsNavItem, CmsPageRef, NavLink } from '../types'

export const resolvePageRef = (page?: CmsPageRef | string | null): string | undefined => {
  if (!page) return undefined
  if (typeof page === 'string') return undefined
  return pathFromSlug(page.slug)
}

export const resolveHref = (link?: CmsLink | null): string => {
  if (!link) return '#'

  const pagePath = resolvePageRef(link.page as CmsPageRef | string | null)
  if (pagePath) return pagePath

  return link.href || '#'
}

export const mapNavItem = (item: CmsNavItem): NavLink => {
  const href = item.externalUrl || resolvePageRef(item.page as CmsPageRef | string | null) || '#'
  const label = item.label || 'Enlace'

  return {
    label,
    href,
    ariaLabel: `Ir a ${label}`,
  }
}

export const mapNavItems = (items?: CmsNavItem[] | null): NavLink[] => {
  if (!items?.length) return []
  return items.map(mapNavItem)
}
