import type {
  AdminVehicleFeature,
  AdminVehicleFeaturesResponse,
} from '../types'

type GetAdminVehicleFeaturesParams = {
  token: string
}

export async function getAdminVehicleFeatures({
  token,
}: GetAdminVehicleFeaturesParams): Promise<AdminVehicleFeature[]> {
  const apiUrl = import.meta.env.VITE_API_URL

  const response = await fetch(`${apiUrl}/admin/vehicle-features`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to load vehicle features.')
  }

  const data = (await response.json()) as AdminVehicleFeaturesResponse

  return data.data
}