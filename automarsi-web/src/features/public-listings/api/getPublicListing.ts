import { publicApi } from '@/lib/publicApi'
import type { PublicListingResponse } from '../types'

type GetPublicListingParams = {
  listingId: number
}

export function getPublicListing({ listingId }: GetPublicListingParams) {
  return publicApi<PublicListingResponse>({
    path: `/listings/${listingId}`,
  })
}