import { adminApi } from '@/shared/api/adminApi'
type DeleteAdminListingParams = {
  token: string
  listingId: number
}

export async function deleteAdminListing({
  token,
  listingId,
}: DeleteAdminListingParams): Promise<void> {
  await adminApi<void>({
    path: `/admin/listings/${listingId}`,
    token,
    method: 'DELETE',
    errorMessage: 'Failed to delete listing.',
    responseType: 'empty',
  })
}
