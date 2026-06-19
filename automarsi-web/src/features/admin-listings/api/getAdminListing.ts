import type { AdminListing, CreateAdminListingResponse } from '../types'

type GetAdminListingParams = {
  token: string
  listingId: string
}

export async function getAdminListing({
  token,
  listingId,
}: GetAdminListingParams): Promise<AdminListing> {
  const apiUrl = import.meta.env.VITE_API_URL

  const response = await fetch(`${apiUrl}/admin/listings/${listingId}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to load listing.')
  }

  const data = (await response.json()) as CreateAdminListingResponse

  return data.data
}
