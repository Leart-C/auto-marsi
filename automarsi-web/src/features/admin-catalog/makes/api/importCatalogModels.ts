import type {
  AdminModel,
  ImportCatalogModelsPayload,
  ImportCatalogModelsResponse,
} from '../types'

type ImportCatalogModelsParams = {
  token: string
  payload: ImportCatalogModelsPayload
}

export async function importCatalogModels({
  token,
  payload,
}: ImportCatalogModelsParams): Promise<AdminModel[]> {
  const apiUrl = import.meta.env.VITE_API_URL

  const response = await fetch(`${apiUrl}/admin/catalog-import/models`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Failed to import models.')
  }

  const data = (await response.json()) as ImportCatalogModelsResponse

  return data.data
}