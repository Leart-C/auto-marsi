import { publicApi } from '@/lib/publicApi'
import type { PublicListing } from '../types'

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
