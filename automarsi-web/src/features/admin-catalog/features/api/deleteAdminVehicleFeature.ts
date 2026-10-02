import { adminApi } from '@/shared/api/adminApi'
type DeleteAdminVehicleFeatureParams = {
  token: string
  featureId: number
}

export async function deleteAdminVehicleFeature({
  token,
  featureId,
}: DeleteAdminVehicleFeatureParams): Promise<void> {
  await adminApi({
    token,
    path: `/admin/vehicle-features/${featureId}`,
    method: 'DELETE',
    responseType: 'empty',
    fallbackError: 'Failed to delete vehicle feature.',
    validationErrorsFirst: true,
  })
}
