import { useQuery } from '@tanstack/react-query'
import { getRecentlySoldListings } from '../api/getRecentlySoldListings'

export function useRecentlySoldListings(limit = 6) {
  const recentlySoldQuery = useQuery({
    queryKey: ['public', 'recently-sold-listings', limit],
    queryFn: () => getRecentlySoldListings(limit),
    staleTime: 60_000,
  })

  return {
    listings: recentlySoldQuery.data?.data ?? [],
    recentlySoldQuery,
    errorMessage:
      recentlySoldQuery.error instanceof Error
        ? recentlySoldQuery.error.message
        : null,
  }
}
