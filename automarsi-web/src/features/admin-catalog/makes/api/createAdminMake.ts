import { adminApi } from '@/shared/api/adminApi'
import type {
  AdminMake,
  CreateAdminMakePayload,
  CreateAdminMakeResponse,
} from '@/features/admin-catalog/makes/types'

type CreateAdminMakeParams = {
  token: string
  payload: CreateAdminMakePayload
}

export async function createAdminMake({
  token,
  payload,
}: CreateAdminMakeParams): Promise<AdminMake> {
  const response = await adminApi<CreateAdminMakeResponse>({
    path: `/admin/makes`,
    token,
    method: 'POST',
    body: payload,
    errorMessage: 'Failed to create make.',
  })
  return response.data
}
