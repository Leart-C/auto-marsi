import { adminApi } from '@/shared/api/adminApi'
type DeleteAdminModelParams = {
  token: string
  modelId: number
}

export async function deleteAdminModel({
  token,
  modelId,
}: DeleteAdminModelParams): Promise<void> {
  await adminApi<void>({
    path: `/admin/car-models/${modelId}`,
    token,
    method: 'DELETE',
    errorMessage: 'Failed to delete model.',
    responseType: 'empty',
  })
}
