import { adminApi } from '@/shared/api/adminApi'
import type {
  AdminListing,
  CreateAdminListingPayload,
  CreateAdminListingResponse,
} from '@/features/admin-listings/types'

type CreateAdminListingParams = {
  token: string
  payload: CreateAdminListingPayload
}

export async function createAdminListing({
  token,
  payload,
}: CreateAdminListingParams): Promise<AdminListing> {
  const response = await adminApi<CreateAdminListingResponse>({
    path: `/admin/listings`,
    token,
    method: 'POST',
    body: payload,
    errorMessage: 'Failed to create listing.',
  })
  return response.data
}
