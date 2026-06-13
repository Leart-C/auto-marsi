import type {
  AdminVehicleFeature,
  AdminVehicleFeaturesResponse,
} from '../types'

type InstallDefaultVehicleFeaturesParams = {
  token: string
}

export async function installDefaultVehicleFeatures({
  token,
}: InstallDefaultVehicleFeaturesParams): Promise<AdminVehicleFeature[]> {
  const apiUrl = import.meta.env.VITE_API_URL

  const response = await fetch(`${apiUrl}/admin/vehicle-features/defaults`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error('Failed to install default vehicle features.')
  }

  const data = (await response.json()) as AdminVehicleFeaturesResponse

  return data.data
}