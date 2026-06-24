import { useQuery } from '@tanstack/react-query'
import { getPublicListings } from '../api/getPublicListings'

const homepageListingFilters = {
  page: 1,
  search: '',
  year: '',
  min_price: '',
  max_price: '',
  fuel_type: '',
  transmission: '',
  body_type: '',
  per_page: 3,
}

export function useFeaturedPublicListings() {
  const listingsQuery = useQuery({
    queryKey: ['public', 'homepage-listings'],
    queryFn: () => getPublicListings(homepageListingFilters),
  })

  return {
    listings: listingsQuery.data?.data ?? [],
    listingsQuery,
    errorMessage:
      listingsQuery.error instanceof Error ? listingsQuery.error.message : null,
  }
}
