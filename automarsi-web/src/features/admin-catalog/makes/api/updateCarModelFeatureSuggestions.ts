import type {
  AdminVehicleFeature,
  AdminVehicleFeaturesResponse,
} from '@/features/admin-catalog/features/types'

type UpdateCarModelFeatureSuggestionsParams = {
  token: string
  modelId: number
  featureIds: number[]
}

export async function updateCarModelFeatureSuggestions({
  token,
  modelId,
  featureIds,
}: UpdateCarModelFeatureSuggestionsParams): Promise<AdminVehicleFeature[]> {
  const apiUrl = import.meta.env.VITE_API_URL

  const response = await fetch(
    `${apiUrl}/admin/car-models/${modelId}/feature-suggestions`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        feature_ids: featureIds,
      }),
    }
  )

  if (!response.ok) {
    throw new Error('Failed to update model feature suggestions.')
  }

  const data = (await response.json()) as AdminVehicleFeaturesResponse

  return data.data
}
