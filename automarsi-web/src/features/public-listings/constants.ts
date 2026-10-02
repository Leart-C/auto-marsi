import type { PublicListingFilters } from './types'

export const PUBLIC_LISTINGS_PAGE_SIZE = 9
export const HOMEPAGE_LISTINGS_LIMIT = 6

export function createListingFilters(
  overrides: Partial<PublicListingFilters> = {},
): PublicListingFilters {
  return {
    page: 1,
    make_id: '',
    car_model_id: '',
    search: '',
    year: '',
    min_price: '',
    max_price: '',
    fuel_type: '',
    transmission: '',
    body_type: '',
    ...overrides,
  }
}
