import { adminApi } from '@/shared/api/adminApi'
import type {
  AdminModel,
  ImportCatalogModelsPayload,
  ImportCatalogModelsResponse,
} from '@/features/admin-catalog/makes/types'

type ImportCatalogModelsParams = {
  token: string
  payload: ImportCatalogModelsPayload
}

export async function importCatalogModels({
  token,
  payload,
}: ImportCatalogModelsParams): Promise<AdminModel[]> {
  const response = await adminApi<ImportCatalogModelsResponse>({
    path: `/admin/catalog-import/models`,
    token,
    method: 'POST',
    body: payload,
    errorMessage: 'Failed to import models.',
  })
  return response.data
}
