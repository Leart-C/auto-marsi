import type { PaginationMeta } from './types'

export const ADMIN_PAGE_SIZE = 15

export const EMPTY_PAGINATION: PaginationMeta = {
  current_page: 1,
  last_page: 1,
  per_page: ADMIN_PAGE_SIZE,
  total: 0,
}
