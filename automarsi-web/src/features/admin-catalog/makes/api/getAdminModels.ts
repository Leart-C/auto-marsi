import { adminApi } from '@/shared/api/adminApi'
import type {
  AdminModel,
  AdminModelsResponse,
} from '@/features/admin-catalog/makes/types'

type GetAdminModelsParams = {
  token: string
  makeId: number
}

export async function getAdminModels({
  token,
  makeId,
}: GetAdminModelsParams): Promise<AdminModel[]> {
  const response = await adminApi<AdminModelsResponse>({
    path: `/admin/car-models`,
    token,
    query: { make_id: makeId },
    errorMessage: 'Failed to load models.',
  })
  return response.data
}
