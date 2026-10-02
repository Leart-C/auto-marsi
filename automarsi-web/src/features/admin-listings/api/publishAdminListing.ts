import { adminApi } from '@/shared/api/adminApi'
import type {
  AdminListing,
  CreateAdminListingResponse,
} from '@/features/admin-listings/types'

type PublishAdminListingParams = {
  token: string
  listingId: string
}

export async function publishAdminListing({
  token,
  listingId,
}: PublishAdminListingParams): Promise<AdminListing> {
  const response = await adminApi<CreateAdminListingResponse>({
    path: `/admin/listings/${listingId}`,
    token,
    method: 'PATCH',
    body: { status: 'active', published_at: new Date().toISOString() },
    errorMessage: 'Failed to publish listing.',
  })
  return response.data
}
