type DeleteAdminSiteMediaParams = {
  token: string
  siteMediaId: number
}

async function getErrorMessage(response: Response) {
  try {
    const payload = await response.json()

    if (typeof payload.message === 'string') {
      return payload.message
    }
  } catch {
    return 'Failed to delete site image.'
  }

  return 'Failed to delete site image.'
}

export async function deleteAdminSiteMedia({
  token,
  siteMediaId,
}: DeleteAdminSiteMediaParams) {
  const apiUrl = import.meta.env.VITE_API_URL

  const response = await fetch(`${apiUrl}/admin/site-media/${siteMediaId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error(await getErrorMessage(response))
  }
}
