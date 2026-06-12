import type { ListingCarModelOption } from '../types'

type CarModelsResponse = {
  data: ListingCarModelOption[]
}

export async function getListingCarModels(
  makeId: number
): Promise<ListingCarModelOption[]> {
  const apiUrl = import.meta.env.VITE_API_URL

  const response = await fetch(`${apiUrl}/makes/${makeId}/models`, {
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to load car models.')
  }

  const data = (await response.json()) as CarModelsResponse

  return data.data
}
