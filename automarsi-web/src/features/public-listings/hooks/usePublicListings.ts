import { queryPolicy } from '@/shared/config/queryPolicy'
import { useQuery } from '@tanstack/react-query'
import { getPublicListings } from '@/features/public-listings/api/getPublicListings'
import type { PublicListingFilters } from '@/features/public-listings/types'

type UsePublicListingsParams = {
  filters: PublicListingFilters
}

export function usePublicListings({ filters }: UsePublicListingsParams) {
  const listingsQuery = useQuery({
    queryKey: ['public', 'listings', filters],
    queryFn: () => getPublicListings(filters),
    staleTime: queryPolicy.publicStaleTime,
  })

  return {
    listings: listingsQuery.data?.data ?? [],
    meta: listingsQuery.data?.meta ?? null,
    listingsQuery,
    errorMessage:
      listingsQuery.error instanceof Error ? listingsQuery.error.message : null,
  }
}
