export type AdminVehicleFeature = {
  id: number
  name: string
  slug: string
  icon: string | null
}

export type AdminVehicleFeaturesResponse = {
  data: AdminVehicleFeature[]
}

export type AdminVehicleFeatureResponse = {
  data: AdminVehicleFeature
}

export type CreateAdminVehicleFeaturePayload = {
  name: string
  icon: string | null
}

export type UpdateAdminVehicleFeaturePayload = {
  name: string
  icon: string | null
}