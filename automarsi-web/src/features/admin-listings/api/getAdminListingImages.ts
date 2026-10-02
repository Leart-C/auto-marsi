import { adminApi } from '@/shared/api/adminApi'
import type { AdminListingImage } from '@/features/admin-listings/types'

type AdminListingImagesResponse = {
  data: AdminListingImage[]
}

type GetAdminListingImagesParams = {
  token: string
  listingId: string
}

export async function getAdminListingImages({
  token,
  listingId,
}: GetAdminListingImagesParams): Promise<AdminListingImage[]> {
  const response = await adminApi<AdminListingImagesResponse>({
    path: `/admin/listings/${listingId}/images`,
    token,
    errorMessage: 'Failed to load listing images.',
  })
  return response.data
}
