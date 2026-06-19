import type { AdminListingImage } from '../types'

type AdminListingImageResponse = {
  data: AdminListingImage
}

type LaravelErrorResponse = {
  message?: string
  errors?: Record<string, string[]>
}

type UploadAdminListingImagesParams = {
  token: string
  listingId: string
  files: File[]
}

async function getErrorMessage(response: Response): Promise<string> {
  const data = (await response
    .json()
    .catch(() => null)) as LaravelErrorResponse | null

  const validationMessage = data?.errors
    ? Object.values(data.errors).flat()[0]
    : null

  return validationMessage ?? data?.message ?? 'Failed to upload listing image.'
}

export async function uploadAdminListingImages({
  token,
  listingId,
  files,
}: UploadAdminListingImagesParams): Promise<AdminListingImage[]> {
  const apiUrl = import.meta.env.VITE_API_URL
  const uploadedImages: AdminListingImage[] = []

  for (const file of files) {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('alt_text', file.name.replace(/\.[^/.]+$/, ''))

    const response = await fetch(
      `${apiUrl}/admin/listings/${listingId}/images`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    )

    if (!response.ok) {
      throw new Error(`${file.name}: ${await getErrorMessage(response)}`)
    }

    const data = (await response.json()) as AdminListingImageResponse
    uploadedImages.push(data.data)
  }

  return uploadedImages
}
