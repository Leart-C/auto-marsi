import { request, type ApiRequestOptions } from './client'

type PublicApiParams = Omit<ApiRequestOptions, 'token' | 'method'> & {
  method?: 'GET' | 'POST'
}

export function publicApi<T = void>(options: PublicApiParams): Promise<T> {
  return request<T>({ ...options, baseUrl: import.meta.env.VITE_API_URL })
}
