import type { QueryClient } from '@tanstack/react-query'

export function invalidateInventory(queryClient: QueryClient) {
  return queryClient.invalidateQueries({
    predicate: ({ queryKey }) =>
      queryKey[0] === 'public' ||
      (queryKey[0] === 'admin' &&
        ['listings', 'overview'].includes(String(queryKey[1]))),
  })
}
