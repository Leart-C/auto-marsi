import { adminApi } from '@/shared/api/adminApi'
import type { AdminListingsResponse } from '@/features/admin-listings/types'

type GetAdminListingsParams = {
  token: string
  page?: number
  perPage?: number
  search?: string
  status?: string
  condition?: string
  makeId?: string
  carModelId?: string
  isFeatured?: string
}

export async function getAdminListings({
  token,
  page = 1,
  perPage,
  search,
  status,
  condition,
  makeId,
  carModelId,
  isFeatured,
}: GetAdminListingsParams): Promise<AdminListingsResponse> {
  return adminApi<AdminListingsResponse>({
    token,
    path: '/admin/listings',
    query: {
      page,
      per_page: perPage,
      search,
      status,
      condition,
      make_id: makeId,
      car_model_id: carModelId,
      is_featured: isFeatured,
    },
    errorMessage: 'Failed to load admin listings.',
  })
}
