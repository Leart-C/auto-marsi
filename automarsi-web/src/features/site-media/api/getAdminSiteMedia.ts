import { adminApi } from '@/lib/adminApi'
import type { SiteMedia } from '../types'

type SiteMediaResponse = {
  data: SiteMedia
}

export function getAdminSiteMedia({
  token,
  key,
}: {
  token: string
  key: string
}) {
  return adminApi<SiteMediaResponse>({
    token,
    path: `/admin/site-media/${key}`,
  }).then((response) => response.data)
}
