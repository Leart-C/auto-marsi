import { queryPolicy } from '@/shared/config/queryPolicy'
import { useQuery } from '@tanstack/react-query'
import { useAdminToken } from '@/shared/hooks/useAdminToken'
import { getAdminListings } from '@/features/admin-listings/api/getAdminListings'

export function useAdminListingOptions() {
  const { isAuthReady, getAdminToken } = useAdminToken()

  const listingsQuery = useQuery({
    queryKey: ['admin', 'listing-options'],
    enabled: isAuthReady,
    queryFn: async () => {
      const token = await getAdminToken()

      return getAdminListings({
        token,
        page: 1,
        perPage: 100,
      })
    },
    staleTime: queryPolicy.publicStaleTime,
  })

  return {
    listings: listingsQuery.data?.data ?? [],
    isLoading: listingsQuery.isLoading,
    errorMessage:
      listingsQuery.error instanceof Error
        ? listingsQuery.error.message
        : null,
  }
}
