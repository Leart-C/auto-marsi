export type ApiRequestOptions = {
  path: string
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'
  query?: Record<string, string | number | boolean | null | undefined>
  body?: unknown
  token?: string
  /** Fixed error text for endpoints that intentionally hide server details. */
  errorMessage?: string
  fallbackError?: string
  validationErrorsFirst?: boolean
  responseType?: 'json' | 'empty'
}

type RequestOptions = ApiRequestOptions & { baseUrl: string }

async function readError(
  response: Response,
  fallback: string,
  validationFirst: boolean,
) {
  const payload: unknown = await response.json().catch(() => null)
  if (!payload || typeof payload !== 'object') return fallback

  if (
    validationFirst &&
    'errors' in payload &&
    payload.errors &&
    typeof payload.errors === 'object'
  ) {
    const first = Object.values(payload.errors)
      .flat()
      .find((value) => typeof value === 'string')
    if (first) return first as string
  }
  return 'message' in payload && typeof payload.message === 'string'
    ? payload.message
    : fallback
}

/** The only HTTP transport. Feature API files own paths, payloads, and response types. */
export async function request<T = void>({
  baseUrl,
  path,
  method = 'GET',
  query,
  body,
  token,
  errorMessage,
  fallbackError = 'Request failed.',
  validationErrorsFirst = false,
  responseType = 'json',
}: RequestOptions): Promise<T> {
  const url = new URL(
    `${baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`,
  )
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== null && value !== undefined && value !== '')
      url.searchParams.set(key, String(value))
  }

  const isFormData = body instanceof FormData
  const hasBody = body !== undefined && body !== null
  const response = await fetch(url, {
    method,
    headers: {
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(hasBody && !isFormData ? { 'Content-Type': 'application/json' } : {}),
    },
    body: hasBody ? (isFormData ? body : JSON.stringify(body)) : undefined,
  })

  if (!response.ok) {
    throw new Error(
      errorMessage ??
        (await readError(response, fallbackError, validationErrorsFirst)),
    )
  }
  if (responseType === 'empty' || response.status === 204) return undefined as T
  return response.json() as Promise<T>
}
