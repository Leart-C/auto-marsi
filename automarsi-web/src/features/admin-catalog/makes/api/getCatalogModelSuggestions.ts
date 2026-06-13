import type {
  CatalogModelSuggestion,
  CatalogModelSuggestionsResponse,
} from '../types'

type GetCatalogModelSuggestionsParams = {
  token: string
  make: string
}

export async function getCatalogModelSuggestions({
  token,
  make,
}: GetCatalogModelSuggestionsParams): Promise<CatalogModelSuggestion[]> {
  const apiUrl = import.meta.env.VITE_API_URL

  const queryParams = new URLSearchParams({
    make,
  })

  const response = await fetch(
    `${apiUrl}/admin/catalog-import/models?${queryParams.toString()}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error('Failed to load model suggestions.')
  }

  const data = (await response.json()) as CatalogModelSuggestionsResponse

  return data.data
}