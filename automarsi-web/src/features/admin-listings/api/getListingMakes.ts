import type { ListingMakeOption } from '../types'

type MakesResponse = {
  data: ListingMakeOption[]
}

export async function getListingMakes(): Promise<ListingMakeOption[]> {
  const apiUrl = import.meta.env.VITE_API_URL

  const response = await fetch(`${apiUrl}/makes`, {
    headers: {
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error('Failed to load makes.')
  }

  const data = (await response.json()) as MakesResponse

  return data.data
}
