import { queryPolicy } from '@/shared/config/queryPolicy'
import { createListingFilters, HOMEPAGE_LISTINGS_LIMIT } from '@/features/public-listings/constants'
import { useQuery } from '@tanstack/react-query'
import { getPublicListings } from '@/features/public-listings/api/getPublicListings'

const homepageListingFilters = createListingFilters({ per_page: HOMEPAGE_LISTINGS_LIMIT })

export function useFeaturedPublicListings() {
  const listingsQuery = useQuery({
    queryKey: ['public', 'homepage-listings'],
    queryFn: () => getPublicListings(homepageListingFilters),
    staleTime: queryPolicy.publicStaleTime,
  })

  return {
    listings: listingsQuery.data?.data ?? [],
    listingsQuery,
    errorMessage:
      listingsQuery.error instanceof Error ? listingsQuery.error.message : null,
  }
}
