import type {
  AdminListing,
  CreateAdminListingPayload,
  CreateAdminListingResponse,
} from '../types'

type CreateAdminListingParams = {
  token: string
  payload: CreateAdminListingPayload
}

export async function createAdminListing({
  token,
  payload,
}: CreateAdminListingParams): Promise<AdminListing> {
  const apiUrl = import.meta.env.VITE_API_URL

  const response = await fetch(`${apiUrl}/admin/listings`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Failed to create listing.')
  }

  const data = (await response.json()) as CreateAdminListingResponse

  return data.data
}
