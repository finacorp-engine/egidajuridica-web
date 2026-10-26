const getCmsUrl = (): string => {
  const url =
    (typeof process !== 'undefined' ? process.env.CMS_URL : undefined) ||
    import.meta.env.CMS_URL ||
    'http://localhost:3000'
  return url.replace(/\/$/, '')
}

export const cmsFetch = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const base = getCmsUrl()
  const response = await fetch(`${base}${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...init?.headers,
    },
  })

  if (!response.ok) {
    throw new Error(`CMS request failed (${response.status}): ${path}`)
  }

  return response.json() as Promise<T>
}

export const buildQuery = (params: Record<string, string | number | boolean | undefined>) => {
  const search = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      search.append(key, String(value))
    }
  }

  const query = search.toString()
  return query ? `?${query}` : ''
}
