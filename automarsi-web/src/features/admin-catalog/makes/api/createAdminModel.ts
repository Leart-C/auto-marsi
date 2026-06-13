import type {
  AdminModel,
  CreateAdminModelPayload,
  CreateAdminModelResponse,
} from '../types'

type CreateAdminModelParams = {
  token: string
  payload: CreateAdminModelPayload
}

export async function createAdminModel({
  token,
  payload,
}: CreateAdminModelParams): Promise<AdminModel> {
  const apiUrl = import.meta.env.VITE_API_URL

  const response = await fetch(`${apiUrl}/admin/car-models`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Failed to create model.')
  }

  const data = (await response.json()) as CreateAdminModelResponse

  return data.data
}