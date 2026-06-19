import { useQuery } from '@tanstack/react-query'
import { getAdminListing } from '../api/getAdminListing'
import { useAdminToken } from '@/hooks/useAdminToken'

type UseAdminListingParams = {
  listingId: string
}

export function useAdminListing({ listingId }: UseAdminListingParams) {
  const { isAuthReady, getAdminToken } = useAdminToken()

  const listingQuery = useQuery({
    queryKey: ['admin', 'listings', listingId],
    enabled: isAuthReady && Boolean(listingId),
    queryFn: async () => {
      const token = await getAdminToken()

      return getAdminListing({
        token,
        listingId,
      })
    },
  })

  return {
    listing: listingQuery.data ?? null,
    listingQuery,
    errorMessage:
      listingQuery.error instanceof Error
        ? listingQuery.error.message
        : null,
  }
}
