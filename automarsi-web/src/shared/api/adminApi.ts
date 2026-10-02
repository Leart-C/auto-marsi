import { request, type ApiRequestOptions } from './client'

type AdminApiParams = ApiRequestOptions & { token: string }

export function adminApi<T = void>(options: AdminApiParams): Promise<T> {
  return request<T>({ ...options, baseUrl: import.meta.env.VITE_API_URL })
}
