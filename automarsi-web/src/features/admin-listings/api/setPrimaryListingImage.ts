import type { AdminListingImage } from '../types'

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
  const apiUrl = import.meta.env.VITE_API_URL

  const response = await fetch(
    `${apiUrl}/admin/listing-images/${imageId}/primary`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error('Failed to set primary image.')
  }

  const data = (await response.json()) as AdminListingImageResponse

  return data.data
}
