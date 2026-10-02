import { invalidateInventory } from '@/features/admin-listings/utils/invalidateInventory'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAdminToken } from '@/shared/hooks/useAdminToken'
import { publishAdminListing } from '@/features/admin-listings/api/publishAdminListing'

type UsePublishListingParams = {
  listingId: string
}

export function usePublishListing({ listingId }: UsePublishListingParams) {
  const queryClient = useQueryClient()
  const { getAdminToken } = useAdminToken()

  return useMutation({
    mutationFn: async () => {
      const token = await getAdminToken()

      return publishAdminListing({
        token,
        listingId,
      })
    },
    onSuccess: async (listing) => {
      queryClient.setQueryData(['admin', 'listings', listingId], listing)

      await invalidateInventory(queryClient)

      toast.success('Listing published successfully.')
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : 'Failed to publish listing.',
      )
    },
  })
}
