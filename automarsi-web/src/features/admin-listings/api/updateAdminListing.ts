import { adminApi } from '@/shared/api/adminApi'
import type {
  AdminListing,
  CreateAdminListingPayload,
  CreateAdminListingResponse,
} from '@/features/admin-listings/types'

type UpdateAdminListingParams = {
  token: string
  listingId: string
  payload: CreateAdminListingPayload
}

export async function updateAdminListing({
  token,
  listingId,
  payload,
}: UpdateAdminListingParams): Promise<AdminListing> {
  const response = await adminApi<CreateAdminListingResponse>({
    path: `/admin/listings/${listingId}`,
    token,
    method: 'PATCH',
    body: payload,
    errorMessage: 'Failed to update listing.',
  })
  return response.data
}
