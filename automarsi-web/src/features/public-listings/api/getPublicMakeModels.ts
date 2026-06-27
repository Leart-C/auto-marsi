import { publicApi } from '@/lib/publicApi'
import type { PublicMakeModelsResponse } from '../types'

export function getPublicMakeModels(makeId: string) {
  return publicApi<PublicMakeModelsResponse>({
    path: `/makes/${makeId}/models`,
  })
}
