import { adminApi } from '@/shared/api/adminApi'
import type {
  AdminModel,
  CreateAdminModelPayload,
  CreateAdminModelResponse,
} from '@/features/admin-catalog/makes/types'

type CreateAdminModelParams = {
  token: string
  payload: CreateAdminModelPayload
}

export async function createAdminModel({
  token,
  payload,
}: CreateAdminModelParams): Promise<AdminModel> {
  const response = await adminApi<CreateAdminModelResponse>({
    path: `/admin/car-models`,
    token,
    method: 'POST',
    body: payload,
    errorMessage: 'Failed to create model.',
  })
  return response.data
}
