import { adminApi } from '@/shared/api/adminApi'
import type {
  AdminMake,
  CreateAdminMakePayload,
  CreateAdminMakeResponse,
} from '@/features/admin-catalog/makes/types'

type UpdateAdminMakeParams = {
  token: string
  makeId: number
  payload: CreateAdminMakePayload
}

export async function updateAdminMake({
  token,
  makeId,
  payload,
}: UpdateAdminMakeParams): Promise<AdminMake> {
  const response = await adminApi<CreateAdminMakeResponse>({
    path: `/admin/makes/${makeId}`,
    token,
    method: 'PATCH',
    body: payload,
    errorMessage: 'Failed to update make.',
  })
  return response.data
}
