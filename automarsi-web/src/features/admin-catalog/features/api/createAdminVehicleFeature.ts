import type {
  AdminVehicleFeature,
  AdminVehicleFeatureResponse,
  CreateAdminVehicleFeaturePayload,
} from '../types'

type CreateAdminVehicleFeatureParams = {
  token: string
  payload: CreateAdminVehicleFeaturePayload
}

export async function createAdminVehicleFeature({
  token,
  payload,
}: CreateAdminVehicleFeatureParams): Promise<AdminVehicleFeature> {
  const apiUrl = import.meta.env.VITE_API_URL

  const response = await fetch(`${apiUrl}/admin/vehicle-features`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Failed to create vehicle feature.')
  }

  const data = (await response.json()) as AdminVehicleFeatureResponse

  return data.data
}