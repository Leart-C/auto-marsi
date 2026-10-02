import { adminApi } from '@/shared/api/adminApi'
import type {
  AdminVehicleFeature,
  AdminVehicleFeaturesResponse,
} from '@/features/admin-catalog/features/types'

type InstallDefaultVehicleFeaturesParams = {
  token: string
}

export async function installDefaultVehicleFeatures({
  token,
}: InstallDefaultVehicleFeaturesParams): Promise<AdminVehicleFeature[]> {
  const response = await adminApi<AdminVehicleFeaturesResponse>({
    path: `/admin/vehicle-features/defaults`,
    token,
    method: 'POST',
    errorMessage: 'Failed to install default vehicle features.',
  })
  return response.data
}
