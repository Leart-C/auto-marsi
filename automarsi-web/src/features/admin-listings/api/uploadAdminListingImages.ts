import { adminApi } from '@/shared/api/adminApi'
import type { AdminListingImage } from '@/features/admin-listings/types'

type AdminListingImageResponse = {
  data: AdminListingImage
}

type UploadAdminListingImagesParams = {
  token: string
  listingId: string
  files: File[]
}

export async function uploadAdminListingImages({
  token,
  listingId,
  files,
}: UploadAdminListingImagesParams): Promise<AdminListingImage[]> {
  const uploadedImages: AdminListingImage[] = []

  for (const file of files) {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('alt_text', file.name.replace(/\.[^/.]+$/, ''))

    try {
      const response = await adminApi<AdminListingImageResponse>({
        token,
        path: `/admin/listings/${listingId}/images`,
        method: 'POST',
        body: formData,
        fallbackError: 'Failed to upload listing image.',
        validationErrorsFirst: true,
      })
      uploadedImages.push(response.data)
    } catch (error) {
      throw new Error(
        `${file.name}: ${error instanceof Error ? error.message : 'Failed to upload listing image.'}`,
        { cause: error },
      )
    }
  }

  return uploadedImages
}
