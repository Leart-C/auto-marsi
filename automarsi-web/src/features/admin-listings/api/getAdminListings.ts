import type { AdminListingsResponse } from '../types'

type GetAdminListingsParams = {
  token: string
  page?: number
  perPage?: number
  search?: string
  status?: string
}

export async function getAdminListings({
  token,
  page = 1,
  perPage,
  search,
  status,
}: GetAdminListingsParams): Promise<AdminListingsResponse> {
  const apiUrl = import.meta.env.VITE_API_URL
  const queryParams = new URLSearchParams()

  queryParams.set('page', String(page))

  if (perPage) {
    queryParams.set('per_page', String(perPage))
  }

  if (search) {
    queryParams.set('search', search)
  }

  if (status) {
    queryParams.set('status', status)
  }

  const response = await fetch(
    `${apiUrl}/admin/listings?${queryParams.toString()}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error('Failed to load admin listings.')
  }

  return response.json()
}
