import { adminApi } from '@/shared/api/adminApi'
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
  const response = await adminApi<AdminVehicleFeaturesResponse>({
    path: `/admin/car-models/${modelId}/feature-suggestions`,
    token,
    errorMessage: 'Failed to load model feature suggestions.',
  })
  return response.data
}
