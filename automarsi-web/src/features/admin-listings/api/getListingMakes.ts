import { publicApi } from '@/shared/api/publicApi'
import type { ListingMakeOption } from '@/features/admin-listings/types'

type MakesResponse = {
  data: ListingMakeOption[]
}

export async function getListingMakes(): Promise<ListingMakeOption[]> {
  const response = await publicApi<MakesResponse>({
    path: `/makes`,
    errorMessage: 'Failed to load makes.',
  })
  return response.data
}
