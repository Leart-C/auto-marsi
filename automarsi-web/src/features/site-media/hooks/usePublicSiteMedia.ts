import { useQuery } from '@tanstack/react-query'
import { getPublicSiteMedia } from '@/features/site-media/api/getPublicSiteMedia'

export function usePublicSiteMedia(key: string) {
  return useQuery({
    queryKey: ['public', 'site-media', key],
    queryFn: () => getPublicSiteMedia(key),
  })
}
