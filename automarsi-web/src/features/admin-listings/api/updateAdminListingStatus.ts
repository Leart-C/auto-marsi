import type { ListingStatus } from '@/features/admin-listings/constants'
import { adminApi } from '@/shared/api/adminApi'
export type AdminListingStatusAction = ListingStatus

type UpdateAdminListingStatusParams = {
  token: string
  listingId: number
  status: AdminListingStatusAction
}

export async function updateAdminListingStatus({
  token,
  listingId,
  status,
}: UpdateAdminListingStatusParams): Promise<void> {
  await adminApi<void>({
    path: `/admin/listings/${listingId}`,
    token,
    method: 'PATCH',
    body: { status },
    errorMessage: 'Failed to update listing status.',
    responseType: 'empty',
  })
}
