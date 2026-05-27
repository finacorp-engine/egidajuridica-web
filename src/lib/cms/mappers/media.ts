import type { CmsMedia, ImageWithAlt } from '../types'

export const getMediaBaseUrl = (): string => {
  const url = import.meta.env.CMS_URL
  if (!url) return ''
  return url.replace(/\/$/, '')
}

export const isMediaObject = (value: unknown): value is CmsMedia => {
  return typeof value === 'object' && value !== null && ('url' in value || 'sizes' in value)
}

export const resolveMediaUrl = (
  media?: CmsMedia | string | null,
  size: 'thumbnail' | 'card' | 'hero' = 'hero',
): string => {
  if (!media) return ''

  if (typeof media === 'string') {
    return `${getMediaBaseUrl()}/api/media/file/${media}`
  }

  const sizedUrl = media.sizes?.[size]?.url ?? media.url
  if (!sizedUrl) return ''

  if (sizedUrl.startsWith('http')) return sizedUrl
  return `${getMediaBaseUrl()}${sizedUrl}`
}

export const resolveImageWithAlt = (
  group?: ImageWithAlt | null,
  size: 'thumbnail' | 'card' | 'hero' = 'hero',
): { src: string; alt: string } => {
  const image = group?.image
  const alt =
    group?.alt ||
    (isMediaObject(image) ? image.alt : undefined) ||
    'Imagen de Egida Jurídica'

  return {
    src: resolveMediaUrl(image, size),
    alt,
  }
}
