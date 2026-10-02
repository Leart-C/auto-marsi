import { adminApi } from '@/shared/api/adminApi'
import type { AdminListingImage } from '@/features/admin-listings/types'

type AdminListingImageResponse = {
  data: AdminListingImage
}

type SetPrimaryListingImageParams = {
  token: string
  imageId: number
}

export async function setPrimaryListingImage({
  token,
  imageId,
}: SetPrimaryListingImageParams): Promise<AdminListingImage> {
  const response = await adminApi<AdminListingImageResponse>({
    path: `/admin/listing-images/${imageId}/primary`,
    token,
    method: 'POST',
    errorMessage: 'Failed to set primary image.',
  })
  return response.data
}
