import { adminApi } from '@/shared/api/adminApi'
import type {
  AdminVehicleFeature,
  AdminVehicleFeatureResponse,
  CreateAdminVehicleFeaturePayload,
} from '@/features/admin-catalog/features/types'

type CreateAdminVehicleFeatureParams = {
  token: string
  payload: CreateAdminVehicleFeaturePayload
}

export async function createAdminVehicleFeature({
  token,
  payload,
}: CreateAdminVehicleFeatureParams): Promise<AdminVehicleFeature> {
  const response = await adminApi<AdminVehicleFeatureResponse>({
    path: `/admin/vehicle-features`,
    token,
    method: 'POST',
    body: payload,
    errorMessage: 'Failed to create vehicle feature.',
  })
  return response.data
}
