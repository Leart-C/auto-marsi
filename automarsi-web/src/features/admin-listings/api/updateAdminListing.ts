import type {
  AdminListing,
  CreateAdminListingPayload,
  CreateAdminListingResponse,
} from '../types'

type UpdateAdminListingParams = {
  token: string
  listingId: string
  payload: CreateAdminListingPayload
}

export async function updateAdminListing({
  token,
  listingId,
  payload,
}: UpdateAdminListingParams): Promise<AdminListing> {
  const apiUrl = import.meta.env.VITE_API_URL

  const response = await fetch(`${apiUrl}/admin/listings/${listingId}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Failed to update listing.')
  }

  const data = (await response.json()) as CreateAdminListingResponse

  return data.data
}