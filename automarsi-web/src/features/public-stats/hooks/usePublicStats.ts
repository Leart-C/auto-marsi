import { queryPolicy } from '@/shared/config/queryPolicy'
import { useQuery } from '@tanstack/react-query'
import { getPublicStats } from '@/features/public-stats/api/getPublicStats'

export function usePublicStats() {
  const statsQuery = useQuery({
    queryKey: ['public', 'stats'],
    queryFn: getPublicStats,
    staleTime: queryPolicy.publicStaleTime,
  })

  return {
    stats: statsQuery.data?.data ?? null,
    statsQuery,
  }
}
