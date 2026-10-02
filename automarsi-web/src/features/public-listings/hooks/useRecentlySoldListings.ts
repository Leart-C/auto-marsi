import { queryPolicy } from '@/shared/config/queryPolicy'
import { useQuery } from '@tanstack/react-query'
import { getRecentlySoldListings } from '@/features/public-listings/api/getRecentlySoldListings'

export function useRecentlySoldListings(limit = 6) {
  const recentlySoldQuery = useQuery({
    queryKey: ['public', 'recently-sold-listings', limit],
    queryFn: () => getRecentlySoldListings(limit),
    staleTime: queryPolicy.publicStaleTime,
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
