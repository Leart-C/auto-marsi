import { adminApi } from '@/shared/api/adminApi'
import type {
  AdminMake,
  AdminMakesResponse,
} from '@/features/admin-catalog/makes/types'

type GetAdminMakesParams = {
  token: string
}

export async function getAdminMakes({
  token,
}: GetAdminMakesParams): Promise<AdminMake[]> {
  const response = await adminApi<AdminMakesResponse>({
    path: `/admin/makes`,
    token,
    errorMessage: 'Failed to load makes.',
  })
  return response.data
}
