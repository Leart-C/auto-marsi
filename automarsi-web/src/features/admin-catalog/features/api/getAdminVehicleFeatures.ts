import { adminApi } from '@/shared/api/adminApi'
import type {
  AdminVehicleFeature,
  AdminVehicleFeaturesResponse,
} from '@/features/admin-catalog/features/types'

type GetAdminVehicleFeaturesParams = {
  token: string
}

export async function getAdminVehicleFeatures({
  token,
}: GetAdminVehicleFeaturesParams): Promise<AdminVehicleFeature[]> {
  const response = await adminApi<AdminVehicleFeaturesResponse>({
    path: `/admin/vehicle-features`,
    token,
    errorMessage: 'Failed to load vehicle features.',
  })
  return response.data
}
