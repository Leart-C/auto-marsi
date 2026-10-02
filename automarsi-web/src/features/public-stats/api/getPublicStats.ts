import { publicApi } from '@/shared/api/publicApi'
import type { PublicStatsResponse } from '@/features/public-stats/types'

export function getPublicStats() {
  return publicApi<PublicStatsResponse>({
    path: '/stats',
  })
}
