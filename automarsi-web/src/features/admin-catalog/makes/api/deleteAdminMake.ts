import { adminApi } from '@/shared/api/adminApi'
type DeleteAdminMakeParams = {
  token: string
  makeId: number
}

export async function deleteAdminMake({
  token,
  makeId,
}: DeleteAdminMakeParams): Promise<void> {
  await adminApi<void>({
    path: `/admin/makes/${makeId}`,
    token,
    method: 'DELETE',
    errorMessage: 'Failed to delete make.',
    responseType: 'empty',
  })
}
