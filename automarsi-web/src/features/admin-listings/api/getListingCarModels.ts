import { publicApi } from '@/shared/api/publicApi'
import type { ListingCarModelOption } from '@/features/admin-listings/types'

type CarModelsResponse = {
  data: ListingCarModelOption[]
}

export async function getListingCarModels(
  makeId: number,
): Promise<ListingCarModelOption[]> {
  const response = await publicApi<CarModelsResponse>({
    path: `/makes/${makeId}/models`,
    errorMessage: 'Failed to load car models.',
  })
  return response.data
}
