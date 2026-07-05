import { useQuery } from '@tanstack/react-query'
import { getPublicSiteMedia } from '../api/getPublicSiteMedia'

export function usePublicSiteMedia(key: string) {
  return useQuery({
    queryKey: ['public', 'site-media', key],
    queryFn: () => getPublicSiteMedia(key),
  })
}
