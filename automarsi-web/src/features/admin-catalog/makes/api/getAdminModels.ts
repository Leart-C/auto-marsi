import type { AdminModel, AdminModelsResponse } from '../types'

type GetAdminModelsParams = {
  token: string
  makeId: number
}

export async function getAdminModels({
  token,
  makeId,
}: GetAdminModelsParams): Promise<AdminModel[]> {
  const apiUrl = import.meta.env.VITE_API_URL

  const queryParams = new URLSearchParams({
    make_id: String(makeId),
  })

  const response = await fetch(
    `${apiUrl}/admin/car-models?${queryParams.toString()}`,
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error('Failed to load models.')
  }

  const data = (await response.json()) as AdminModelsResponse

  return data.data
}