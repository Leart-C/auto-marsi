import { publicApi } from '@/shared/api/publicApi'
import type { SiteMedia } from '@/features/site-media/types'

type SiteMediaResponse = {
  data: SiteMedia[]
}

export function getPublicSiteMedia(key: string) {
  return publicApi<SiteMediaResponse>({
    path: `/site-media/${key}`,
  }).then((response) => response.data)
}
