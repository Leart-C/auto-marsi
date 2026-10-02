import { EMPTY_PAGINATION, ADMIN_PAGE_SIZE } from '@/shared/api/pagination'
import { queryPolicy } from '@/shared/config/queryPolicy'
import { invalidateInventory } from '@/features/admin-listings/utils/invalidateInventory'
import { useAuth } from '@clerk/clerk-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { deleteAdminListing } from '@/features/admin-listings/api/deleteAdminListing'
import { getAdminListings } from '@/features/admin-listings/api/getAdminListings'
import {
  updateAdminListingStatus,
  type AdminListingStatusAction,
} from '@/features/admin-listings/api/updateAdminListingStatus'

type UseAdminListingsFilters = {
  search?: string
  status?: string
  condition?: string
  makeId?: string
  carModelId?: string
  isFeatured?: string
  page?: number
  perPage?: number
}

export function useAdminListings({
  search = '',
  status = '',
  condition = '',
  makeId = '',
  carModelId = '',
  isFeatured = '',
  page = 1,
  perPage = ADMIN_PAGE_SIZE,
}: UseAdminListingsFilters = {}) {
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
    queryKey: [
      'admin',
      'listings',
      {
        search,
        status,
        condition,
        makeId,
        carModelId,
        isFeatured,
        page,
        perPage,
      },
    ],
    enabled: isLoaded && isSignedIn,
    staleTime: queryPolicy.inventoryStaleTime,
    queryFn: async () => {
      const token = await getAuthToken()

      return getAdminListings({
        token,
        search,
        status,
        condition,
        makeId,
        carModelId,
        isFeatured,
        page,
        perPage,
      })
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
      await invalidateInventory(queryClient)

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
      await invalidateInventory(queryClient)

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
  const meta = listingsQuery.data?.meta ?? EMPTY_PAGINATION
  const errorMessage =
    listingsQuery.error instanceof Error ? listingsQuery.error.message : null

  return {
    listings,
    meta,
    listingsQuery,
    errorMessage,

    deleteListing: deleteListingMutation.mutateAsync,
    isDeletingListing: deleteListingMutation.isPending,

    updateListingStatus,
    isUpdatingListingStatus: updateListingStatusMutation.isPending,
  }
}
