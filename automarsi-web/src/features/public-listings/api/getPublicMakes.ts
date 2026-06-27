import { publicApi } from '@/lib/publicApi'
import type { PublicMakesResponse } from '../types'

export function getPublicMakes() {
  return publicApi<PublicMakesResponse>({
    path: '/makes',
  })
}
