import type { SiteMedia } from '../types'

type UpdateAdminSiteMediaParams = {
  token: string
  key: string
  image: File
  altText: string
}

type SiteMediaResponse = {
  data: SiteMedia
}

async function getErrorMessage(response: Response) {
  try {
    const payload = await response.json()

    if (typeof payload.message === 'string') {
      return payload.message
    }
  } catch {
    return 'Failed to update site image.'
  }

  return 'Failed to update site image.'
}

export async function updateAdminSiteMedia({
  token,
  key,
  image,
  altText,
}: UpdateAdminSiteMediaParams) {
  const apiUrl = import.meta.env.VITE_API_URL
  const formData = new FormData()

  formData.append('image', image)
  formData.append('alt_text', altText)

  const response = await fetch(`${apiUrl}/admin/site-media/${key}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  if (!response.ok) {
    throw new Error(await getErrorMessage(response))
  }

  const payload = (await response.json()) as SiteMediaResponse

  return payload.data
}
