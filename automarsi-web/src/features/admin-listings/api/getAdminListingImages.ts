import type { AdminListingImage } from '../types'

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
  const apiUrl = import.meta.env.VITE_API_URL

  const response = await fetch(
    `${apiUrl}/admin/listings/${listingId}/images`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error('Failed to load listing images.')
  }

  const data = (await response.json()) as AdminListingImagesResponse

  return data.data
}
