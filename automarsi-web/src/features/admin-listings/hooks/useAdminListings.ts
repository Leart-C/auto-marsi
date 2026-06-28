import { useAuth } from '@clerk/clerk-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { deleteAdminListing } from '../api/deleteAdminListing'
import { getAdminListings } from '../api/getAdminListings'
import {
  updateAdminListingStatus,
  type AdminListingStatusAction,
} from '../api/updateAdminListingStatus'

export function useAdminListings() {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const queryClient = useQueryClient()

  async function getAuthToken() {
    const token = await getToken()

    if (!token) {
      throw new Error('Missing authentication token.')
    }

    return token
  }

  const listingsQuery = useQuery({
    queryKey: ['admin', 'listings'],
    enabled: isLoaded && isSignedIn,
    queryFn: async () => {
      const token = await getAuthToken()

      return getAdminListings({ token })
    },
  })

  const deleteListingMutation = useMutation({
    mutationFn: async (listingId: number) => {
      const token = await getAuthToken()

      return deleteAdminListing({
        token,
        listingId,
      })
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['admin', 'listings'],
      })

      toast.success('Listing deleted successfully.')
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : 'Failed to delete listing.',
      )
    },
  })

  const updateListingStatusMutation = useMutation({
    mutationFn: async ({
      listingId,
      status,
    }: {
      listingId: number
      status: AdminListingStatusAction
    }) => {
      const token = await getAuthToken()

      return updateAdminListingStatus({
        token,
        listingId,
        status,
      })
    },
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ['admin', 'listings'],
      })

      toast.success(`Listing marked as ${variables.status}.`)
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Failed to update listing status.',
      )
    },
  })

  async function updateListingStatus(
    listingId: number,
    status: AdminListingStatusAction,
  ) {
    await updateListingStatusMutation.mutateAsync({
      listingId,
      status,
    })
  }

  const listings = listingsQuery.data?.data ?? []
  const errorMessage =
    listingsQuery.error instanceof Error ? listingsQuery.error.message : null

  return {
    listings,
    listingsQuery,
    errorMessage,

    deleteListing: deleteListingMutation.mutateAsync,
    isDeletingListing: deleteListingMutation.isPending,

    updateListingStatus,
    isUpdatingListingStatus: updateListingStatusMutation.isPending,
  }
}
