import type {
  AdminVehicleFeature,
  AdminVehicleFeaturesResponse,
} from '@/features/admin-catalog/features/types'

type GetCarModelFeatureSuggestionsParams = {
  token: string
  modelId: number
}

export async function getCarModelFeatureSuggestions({
  token,
  modelId,
}: GetCarModelFeatureSuggestionsParams): Promise<AdminVehicleFeature[]> {
  const apiUrl = import.meta.env.VITE_API_URL

  const response = await fetch(
    `${apiUrl}/admin/car-models/${modelId}/feature-suggestions`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error('Failed to load model feature suggestions.')
  }

  const data = (await response.json()) as AdminVehicleFeaturesResponse

  return data.data
}
