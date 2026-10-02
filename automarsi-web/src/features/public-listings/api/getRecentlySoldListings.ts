import { publicApi } from '@/shared/api/publicApi'
import type { PublicListing } from '@/features/public-listings/types'

export type RecentlySoldListingsResponse = {
  data: PublicListing[]
}

export function getRecentlySoldListings(limit = 6) {
  return publicApi<RecentlySoldListingsResponse>({
    path: '/listings/recently-sold',
    query: {
      limit,
    },
  })
}
