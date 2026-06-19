import type { AdminListingImage } from '../types'

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
  const apiUrl = import.meta.env.VITE_API_URL

  const response = await fetch(`${apiUrl}/admin/listing-images/${imageId}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Failed to update listing image.')
  }

  const data = (await response.json()) as AdminListingImageResponse

  return data.data
}
