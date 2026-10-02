import { adminApi } from '@/shared/api/adminApi'
import type { SiteMedia } from '@/features/site-media/types'

type SiteMediaResponse = {
  data: SiteMedia[]
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
