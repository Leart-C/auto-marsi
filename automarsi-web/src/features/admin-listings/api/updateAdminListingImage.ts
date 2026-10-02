import { adminApi } from '@/shared/api/adminApi'
import type { AdminListingImage } from '@/features/admin-listings/types'

type AdminListingImageResponse = {
  data: AdminListingImage
}

export type UpdateAdminListingImagePayload = {
  alt_text: string | null
  sort_order: number
}

type UpdateAdminListingImageParams = {
  token: string
  imageId: number
  payload: UpdateAdminListingImagePayload
}

export async function updateAdminListingImage({
  token,
  imageId,
  payload,
}: UpdateAdminListingImageParams): Promise<AdminListingImage> {
  const response = await adminApi<AdminListingImageResponse>({
    path: `/admin/listing-images/${imageId}`,
    token,
    method: 'PATCH',
    body: payload,
    errorMessage: 'Failed to update listing image.',
  })
  return response.data
}
