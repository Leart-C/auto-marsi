type DeleteAdminListingParams = {
  token: string
  listingId: number
}

export async function deleteAdminListing({
  token,
  listingId,
}: DeleteAdminListingParams): Promise<void> {
  const apiUrl = import.meta.env.VITE_API_URL

  const response = await fetch(`${apiUrl}/admin/listings/${listingId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to delete listing.')
  }
}
