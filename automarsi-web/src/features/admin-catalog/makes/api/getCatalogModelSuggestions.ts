import { adminApi } from '@/shared/api/adminApi'
import type {
  CatalogModelSuggestion,
  CatalogModelSuggestionsResponse,
} from '@/features/admin-catalog/makes/types'

type GetCatalogModelSuggestionsParams = {
  token: string
  make: string
}

export async function getCatalogModelSuggestions({
  token,
  make,
}: GetCatalogModelSuggestionsParams): Promise<CatalogModelSuggestion[]> {
  const response = await adminApi<CatalogModelSuggestionsResponse>({
    path: `/admin/catalog-import/models`,
    token,
    query: { make },
    errorMessage: 'Failed to load model suggestions.',
  })
  return response.data
}
