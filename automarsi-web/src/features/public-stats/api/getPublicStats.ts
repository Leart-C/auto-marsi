import { publicApi } from '@/lib/publicApi'
import type { PublicStatsResponse } from '../types'

export function getPublicStats() {
  return publicApi<PublicStatsResponse>({
    path: '/stats',
  })
}
