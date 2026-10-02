import { adminApi } from '@/shared/api/adminApi'
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
  const response = await adminApi<AdminVehicleFeaturesResponse>({
    path: `/admin/car-models/${modelId}/feature-suggestions`,
    token,
    method: 'PUT',
    body: { feature_ids: featureIds },
    errorMessage: 'Failed to update model feature suggestions.',
  })
  return response.data
}
