import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'
import { getAdminVehicleFeatures } from '@/features/admin-catalog/features/api/getAdminVehicleFeatures'
import { useAdminToken } from '@/hooks/useAdminToken'
import { getListingCarModels } from '../api/getListingCarModels'
import { getListingMakes } from '../api/getListingMakes'
import { updateAdminListing } from '../api/updateAdminListing'
import {
  buildListingPayload,
  listingToFormState,
  type ListingFormState,
} from '../form/listingFormState'
import type { AdminListing } from '../types'

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

  const [formState, setFormState] = useState<ListingFormState>(() =>
    listingToFormState(listing)
  )

  const selectedMakeId = Number(formState.makeId)

  const makesQuery = useQuery({
    queryKey: ['listing-form', 'makes'],
    queryFn: getListingMakes,
  })

  const carModelsQuery = useQuery({
    queryKey: ['listing-form', 'car-models', selectedMakeId],
    enabled: Boolean(selectedMakeId),
    queryFn: () => getListingCarModels(selectedMakeId),
  })

  const vehicleFeaturesQuery = useQuery({
    queryKey: ['admin', 'catalog', 'vehicle-features'],
    queryFn: async () => {
      const token = await getAdminToken()

      return getAdminVehicleFeatures({ token })
    },
  })

  const updateListingMutation = useMutation({
    mutationFn: async () => {
      const token = await getAdminToken()

      return updateAdminListing({
        token,
        listingId: String(listing.id),
        payload: buildListingPayload(formState),
      })
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['admin', 'listings', String(listing.id)],
        }),
        queryClient.invalidateQueries({
          queryKey: ['admin', 'listings'],
        }),
      ])

      toast.success('Listing updated successfully.')
      onUpdated()
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to update listing.'
      )
    },
  })

  function updateField(field: keyof ListingFormState, value: string) {
    setFormState((currentState) => ({
      ...currentState,
      [field]: value,
      ...(field === 'makeId' ? { carModelId: '' } : {}),
    }))
  }

  function toggleFeature(featureId: number) {
    const value = String(featureId)

    setFormState((currentState) => ({
      ...currentState,
      featureIds: currentState.featureIds.includes(value)
        ? currentState.featureIds.filter((id) => id !== value)
        : [...currentState.featureIds, value],
    }))
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    await updateListingMutation.mutateAsync()
  }

  const errorMessage =
    makesQuery.error instanceof Error
      ? makesQuery.error.message
      : carModelsQuery.error instanceof Error
        ? carModelsQuery.error.message
        : vehicleFeaturesQuery.error instanceof Error
          ? vehicleFeaturesQuery.error.message
          : updateListingMutation.error instanceof Error
            ? updateListingMutation.error.message
            : null

  return {
    formState,
    makes: makesQuery.data ?? [],
    carModels: carModelsQuery.data ?? [],
    vehicleFeatures: vehicleFeaturesQuery.data ?? [],
    isLoadingOptions:
      makesQuery.isLoading ||
      carModelsQuery.isLoading ||
      vehicleFeaturesQuery.isLoading,
    isSubmitting: updateListingMutation.isPending,
    errorMessage,
    updateField,
    toggleFeature,
    submit,
  }
}
