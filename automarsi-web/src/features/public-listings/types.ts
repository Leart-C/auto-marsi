export type PublicListingMake = {
  id: number
  name: string
  slug?: string
  logo_url?: string | null
  models_count?: number
}

export type PublicListingCarModel = {
  id: number
  make_id?: number
  name: string
  slug?: string
}

export type PublicListingImage = {
  id: number
  image_url: string | null
  alt_text: string | null
  sort_order?: number
  is_primary?: boolean
}

export type PublicListingFeature = {
  id: number
  name: string
  slug: string
  icon?: string | null
}

export type PublicListing = {
  id: number
  make: PublicListingMake | null
  car_model: PublicListingCarModel | null
  title: string
  slug: string
  description: string | null
  year: number
  price: string
  currency: string
  kilometers: number | null
  fuel_type: string
  transmission: string
  body_type: string | null
  color: string | null
  engine_size: string | null
  horsepower: number | null
  vin: string | null
  registration_until: string | null
  condition: string
  status: string
  is_featured: boolean
  location: string | null
  published_at: string | null
  sold_at: string | null
  primary_image: PublicListingImage | null
  images: PublicListingImage[]
  features: PublicListingFeature[]
}

export type PublicListingFilters = {
  page: number
  make_id: string
  car_model_id: string
  search: string
  year: string
  min_price: string
  max_price: string
  fuel_type: string
  transmission: string
  body_type: string
  per_page?: number
}

export type PublicListingsResponse = {
  data: PublicListing[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

export type PublicListingResponse = {
  data: PublicListing
}
export type PublicMakesResponse = {
  data: PublicListingMake[]
}

export type PublicMakeModelsResponse = {
  data: PublicListingCarModel[]
}
