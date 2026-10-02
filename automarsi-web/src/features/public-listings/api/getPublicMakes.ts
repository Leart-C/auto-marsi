import { publicApi } from '@/shared/api/publicApi'
import type { PublicMakesResponse } from '@/features/public-listings/types'

export function getPublicMakes() {
  return publicApi<PublicMakesResponse>({
    path: '/makes',
  })
}
