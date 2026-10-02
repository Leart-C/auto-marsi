import { adminApi } from '@/shared/api/adminApi'
import type {
  AdminVehicleFeature,
  AdminVehicleFeatureResponse,
  UpdateAdminVehicleFeaturePayload,
} from '@/features/admin-catalog/features/types'

type UpdateAdminVehicleFeatureParams = {
  token: string
  featureId: number
  payload: UpdateAdminVehicleFeaturePayload
}

export async function updateAdminVehicleFeature({
  token,
  featureId,
  payload,
}: UpdateAdminVehicleFeatureParams): Promise<AdminVehicleFeature> {
  const response = await adminApi<AdminVehicleFeatureResponse>({
    path: `/admin/vehicle-features/${featureId}`,
    token,
    method: 'PATCH',
    body: payload,
    errorMessage: 'Failed to update vehicle feature.',
  })
  return response.data
}
