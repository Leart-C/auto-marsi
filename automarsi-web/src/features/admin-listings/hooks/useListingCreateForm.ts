import { invalidateInventory } from '@/features/admin-listings/utils/invalidateInventory'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useAdminToken } from '@/shared/hooks/useAdminToken'
import { createAdminListing } from '@/features/admin-listings/api/createAdminListing'
import {
  buildListingPayload,
  initialListingFormState,
} from '@/features/admin-listings/form/listingFormState'
import type { AdminListing } from '@/features/admin-listings/types'
import { useListingFormFields } from '@/features/admin-listings/hooks/useListingFormFields'

type UseListingCreateFormParams = {
  onCreated: (listing: AdminListing) => void
}

export function useListingCreateForm({
  onCreated,
}: UseListingCreateFormParams) {
  const queryClient = useQueryClient()
  const { getAdminToken } = useAdminToken()
  const fields = useListingFormFields(initialListingFormState, {
    autoGenerateTitle: true,
  })

  const createListingMutation = useMutation({
    mutationFn: async () => {
      const token = await getAdminToken()

      return createAdminListing({
        token,
        payload: buildListingPayload(fields.formState),
      })
    },
    onSuccess: async (createdListing) => {
      await invalidateInventory(queryClient)
      fields.resetForm(initialListingFormState)
      toast.success('Listing saved. Add its photos next.')
      onCreated(createdListing)
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : 'Failed to create listing.',
      )
    },
  })

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    await createListingMutation.mutateAsync()
  }

  const errorMessage =
    fields.optionsErrorMessage ??
    (createListingMutation.error instanceof Error
      ? createListingMutation.error.message
      : null)

  return {
    ...fields,
    isSubmitting: createListingMutation.isPending,
    errorMessage,
    submit,
  }
}
