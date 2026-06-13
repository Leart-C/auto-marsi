type DeleteAdminVehicleFeatureParams = {
  token: string
  featureId: number
}

type LaravelErrorResponse = {
  message?: string
  errors?: Record<string, string[]>
}

export async function deleteAdminVehicleFeature({
  token,
  featureId,
}: DeleteAdminVehicleFeatureParams): Promise<void> {
  const apiUrl = import.meta.env.VITE_API_URL

  const response = await fetch(`${apiUrl}/admin/vehicle-features/${featureId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as LaravelErrorResponse | null

    const firstValidationMessage = data?.errors
      ? Object.values(data.errors).flat()[0]
      : null

    throw new Error(
      firstValidationMessage ||
        data?.message ||
        'Failed to delete vehicle feature.'
    )
  }
}