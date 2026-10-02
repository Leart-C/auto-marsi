import { PUBLIC_LISTINGS_PAGE_SIZE } from '@/features/public-listings/constants'
import { publicApi } from '@/shared/api/publicApi'
import type {
  PublicListingFilters,
  PublicListingsResponse,
} from '@/features/public-listings/types'

export function getPublicListings(filters: PublicListingFilters) {
  return publicApi<PublicListingsResponse>({
    path: '/listings',
    query: {
      page: filters.page,
      make_id: filters.make_id,
      car_model_id: filters.car_model_id,
      search: filters.search,
      year: filters.year,
      min_price: filters.min_price,
      max_price: filters.max_price,
      fuel_type: filters.fuel_type,
      transmission: filters.transmission,
      body_type: filters.body_type,
      per_page: filters.per_page ?? PUBLIC_LISTINGS_PAGE_SIZE,
    },
  })
}
