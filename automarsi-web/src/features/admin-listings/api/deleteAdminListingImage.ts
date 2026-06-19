type DeleteAdminListingImageParams = {
  token: string
  imageId: number
}

export async function deleteAdminListingImage({
  token,
  imageId,
}: DeleteAdminListingImageParams): Promise<void> {
  const apiUrl = import.meta.env.VITE_API_URL

  const response = await fetch(`${apiUrl}/admin/listing-images/${imageId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to delete listing image.')
  }
}
