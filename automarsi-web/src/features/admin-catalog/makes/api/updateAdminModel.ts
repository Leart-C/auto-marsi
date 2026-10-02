import { adminApi } from '@/shared/api/adminApi'
import type {
  AdminModel,
  CreateAdminModelResponse,
} from '@/features/admin-catalog/makes/types'

type UpdateAdminModelParams = {
  token: string
  modelId: number
  payload: {
    name: string
  }
}

export async function updateAdminModel({
  token,
  modelId,
  payload,
}: UpdateAdminModelParams): Promise<AdminModel> {
  const response = await adminApi<CreateAdminModelResponse>({
    path: `/admin/car-models/${modelId}`,
    token,
    method: 'PATCH',
    body: payload,
    errorMessage: 'Failed to update model.',
  })
  return response.data
}
