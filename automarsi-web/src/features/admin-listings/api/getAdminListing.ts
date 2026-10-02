import { adminApi } from '@/shared/api/adminApi'
import type {
  AdminListing,
  CreateAdminListingResponse,
} from '@/features/admin-listings/types'

type GetAdminListingParams = {
  token: string
  listingId: string
}

export async function getAdminListing({
  token,
  listingId,
}: GetAdminListingParams): Promise<AdminListing> {
  const response = await adminApi<CreateAdminListingResponse>({
    path: `/admin/listings/${listingId}`,
    token,
    errorMessage: 'Failed to load listing.',
  })
  return response.data
}
