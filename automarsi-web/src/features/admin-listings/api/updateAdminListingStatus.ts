export type AdminListingStatusAction = 'draft' | 'active' | 'sold' | 'archived'

type UpdateAdminListingStatusParams = {
  token: string
  listingId: number
  status: AdminListingStatusAction
}

export async function updateAdminListingStatus({
  token,
  listingId,
  status,
}: UpdateAdminListingStatusParams): Promise<void> {
  const apiUrl = import.meta.env.VITE_API_URL

  const response = await fetch(`${apiUrl}/admin/listings/${listingId}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  })

  if (!response.ok) {
    throw new Error('Failed to update listing status.')
  }
}
