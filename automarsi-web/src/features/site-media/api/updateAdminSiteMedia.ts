import { adminApi } from '@/shared/api/adminApi'
import type { SiteMedia } from '@/features/site-media/types'

type UpdateAdminSiteMediaParams = {
  token: string
  key: string
  image: File
  altText: string
}

type SiteMediaResponse = {
  data: SiteMedia
}

export async function updateAdminSiteMedia({
  token,
  key,
  image,
  altText,
}: UpdateAdminSiteMediaParams) {
  const formData = new FormData()
  formData.append('image', image)
  formData.append('alt_text', altText)
  const response = await adminApi<SiteMediaResponse>({
    token,
    path: `/admin/site-media/${key}`,
    method: 'POST',
    body: formData,
    fallbackError: 'Failed to update site image.',
  })
  return response.data
}
