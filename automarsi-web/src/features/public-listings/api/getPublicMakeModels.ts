import { publicApi } from '@/shared/api/publicApi'
import type { PublicMakeModelsResponse } from '@/features/public-listings/types'

export function getPublicMakeModels(makeId: string) {
  return publicApi<PublicMakeModelsResponse>({
    path: `/makes/${makeId}/models`,
  })
}
