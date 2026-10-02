import { invalidateInventory } from '@/features/admin-listings/utils/invalidateInventory'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAdminToken } from '@/shared/hooks/useAdminToken'
import {
  updateAdminListingStatus,
  type AdminListingStatusAction,
} from '@/features/admin-listings/api/updateAdminListingStatus'

type UseUpdateListingStatusParams = {
  listingId: string
}

export function useUpdateListingStatus({
  listingId,
}: UseUpdateListingStatusParams) {
  const queryClient = useQueryClient()
  const { getAdminToken } = useAdminToken()

  return useMutation({
    mutationFn: async (status: AdminListingStatusAction) => {
      const token = await getAdminToken()

      await updateAdminListingStatus({
        token,
        listingId: Number(listingId),
        status,
      })

      return status
    },
    onSuccess: async (status) => {
      await invalidateInventory(queryClient)

      toast.success(`Listing marked as ${status}.`)
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to update listing status.',
      )
    },
  })
}
