import type {
  AdminVehicleFeature,
  AdminVehicleFeatureResponse,
  UpdateAdminVehicleFeaturePayload,
} from '../types'

type UpdateAdminVehicleFeatureParams = {
  token: string
  featureId: number
  payload: UpdateAdminVehicleFeaturePayload
}

export async function updateAdminVehicleFeature({
  token,
  featureId,
  payload,
}: UpdateAdminVehicleFeatureParams): Promise<AdminVehicleFeature> {
  const apiUrl = import.meta.env.VITE_API_URL

  const response = await fetch(`${apiUrl}/admin/vehicle-features/${featureId}`, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Failed to update vehicle feature.')
  }

  const data = (await response.json()) as AdminVehicleFeatureResponse

  return data.data
}