type AdminApiParams = {
  token: string
  path: string
  method?: 'GET' | 'PATCH' | 'POST' | 'PUT' | 'DELETE'
  query?: Record<string, string | number | null | undefined>
  body?: unknown
}

async function getErrorMessage(response: Response): Promise<string> {
  try {
    const payload = await response.json()

    if (typeof payload.message === 'string') {
      return payload.message
    }
  } catch {
    return 'Request failed.'
  }

  return 'Request failed.'
}

export async function adminApi<T>({
  token,
  path,
  method = 'GET',
  query,
  body,
}: AdminApiParams): Promise<T> {
  const apiUrl = import.meta.env.VITE_API_URL
  const url = new URL(`${apiUrl}${path}`)

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      url.searchParams.set(key, String(value))
    }
  })

  const response = await fetch(url.toString(), {
    method,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!response.ok) {
    throw new Error(await getErrorMessage(response))
  }

  return response.json()
}
