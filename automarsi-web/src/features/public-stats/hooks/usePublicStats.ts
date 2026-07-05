import { useQuery } from '@tanstack/react-query'
import { getPublicStats } from '../api/getPublicStats'

export function usePublicStats() {
  const statsQuery = useQuery({
    queryKey: ['public', 'stats'],
    queryFn: getPublicStats,
    staleTime: 60_000,
  })

  return {
    stats: statsQuery.data?.data ?? null,
    statsQuery,
  }
}
