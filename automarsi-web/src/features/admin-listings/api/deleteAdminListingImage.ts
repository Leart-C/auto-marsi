import { adminApi } from '@/shared/api/adminApi'
type DeleteAdminListingImageParams = {
  token: string
  imageId: number
}

export async function deleteAdminListingImage({
  token,
  imageId,
}: DeleteAdminListingImageParams): Promise<void> {
  await adminApi<void>({
    path: `/admin/listing-images/${imageId}`,
    token,
    method: 'DELETE',
    errorMessage: 'Failed to delete listing image.',
    responseType: 'empty',
  })
}
