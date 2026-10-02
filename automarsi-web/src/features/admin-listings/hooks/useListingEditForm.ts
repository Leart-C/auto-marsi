import { invalidateInventory } from '@/features/admin-listings/utils/invalidateInventory'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAdminToken } from '@/shared/hooks/useAdminToken'
import { updateAdminListing } from '@/features/admin-listings/api/updateAdminListing'
import {
  buildListingPayload,
  listingToFormState,
} from '@/features/admin-listings/form/listingFormState'
import type { AdminListing } from '@/features/admin-listings/types'
import { useListingFormFields } from '@/features/admin-listings/hooks/useListingFormFields'

type UseListingEditFormParams = {
  listing: AdminListing
  onUpdated: () => void
}

export function useListingEditForm({
  listing,
  onUpdated,
}: UseListingEditFormParams) {
  const queryClient = useQueryClient()
  const { getAdminToken } = useAdminToken()
  const fields = useListingFormFields(() => listingToFormState(listing))

  const updateListingMutation = useMutation({
    mutationFn: async () => {
      const token = await getAdminToken()

      return updateAdminListing({
        token,
        listingId: String(listing.id),
        payload: buildListingPayload(fields.formState),
      })
    },
    onSuccess: async () => {
      await invalidateInventory(queryClient)

      toast.success('Listing updated successfully.')
      onUpdated()
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : 'Failed to update listing.',
      )
    },
  })

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    await updateListingMutation.mutateAsync()
  }

  const errorMessage =
    fields.optionsErrorMessage ??
    (updateListingMutation.error instanceof Error
      ? updateListingMutation.error.message
      : null)

  return {
    ...fields,
    isSubmitting: updateListingMutation.isPending,
    errorMessage,
    submit,
  }
}
