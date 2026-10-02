import { adminApi } from '@/shared/api/adminApi'
type DeleteAdminSiteMediaParams = {
  token: string
  siteMediaId: number
}

export async function deleteAdminSiteMedia({
  token,
  siteMediaId,
}: DeleteAdminSiteMediaParams) {
  await adminApi({
    token,
    path: `/admin/site-media/${siteMediaId}`,
    method: 'DELETE',
    responseType: 'empty',
    fallbackError: 'Failed to delete site image.',
  })
}
