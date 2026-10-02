import { publicApi } from '@/shared/api/publicApi'
import type { PublicListingResponse } from '@/features/public-listings/types'

type GetPublicListingParams = {
  listingId: number
}

export function getPublicListing({ listingId }: GetPublicListingParams) {
  return publicApi<PublicListingResponse>({
    path: `/listings/${listingId}`,
  })
}
