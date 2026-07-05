import { publicApi } from '@/lib/publicApi'
import type { SiteMedia } from '../types'

type SiteMediaResponse = {
  data: SiteMedia[]
}

export function getPublicSiteMedia(key: string) {
  return publicApi<SiteMediaResponse>({
    path: `/site-media/${key}`,
  }).then((response) => response.data)
}
